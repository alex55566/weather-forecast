<template>
    <div class="location-wrapper"
        @dragstart="(e) => dragStartHandler(e, location)" 
        @dragleave="(e) => dragEndHandler(e)" 
        @dragend="(e) => dragEndHandler(e)" 
        @dragover="(e) => dragOverHandler(e)" 
        @drop="(e) => dropHandler(e,location)" 
        draggable="true">
        <button @click="changeLocation(location.location.name)">Change location</button>
        <input v-if="showChangeLocations" @keyup.enter="changeWeather(location.id)" v-model="currentLocation"/>
        <span v-if="!showChangeLocations">{{ location.location.name }}</span>
        <button @click="deleteWeather(location.id)">Delete</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../store/store'
import { ILocations} from '../interface/index'
const store = useStore();

defineProps<{location: ILocations;}>();

// const props = defineProps<ILocation>();

let currentLocation = ref();
let showChangeLocations = ref(false)

function changeWeather(currentId: string) {
    if (currentLocation.value.length !== 0) {
        store.dispatch('changeLocation', {value: currentLocation.value, id: currentId})
        currentLocation.value = ''
        showChangeLocations.value = false
    }
}

function deleteWeather(currentId: string) {
   store.commit('deleteLocation', currentId) 
}


function changeLocation(value: string) {
    showChangeLocations.value = !showChangeLocations.value
    currentLocation.value = value
}

function dragStartHandler(e: Event , location: ILocations) {
    store.commit('dragStartHandler', location) 
}

function dropHandler(e: Event, location: ILocations) {
    e.preventDefault();
    store.commit('dropHandler', {event: e, loc: location}) 
    if (e.target instanceof HTMLElement) {
        e.target.style.background = 'transparent'
    }
}

function dragEndHandler(e: Event) {
    if (e.target instanceof HTMLElement) {
        e.target.style.background = 'transparent'
    }

}

function dragOverHandler(e: Event ) {
    e.preventDefault();
    if (e.target instanceof HTMLElement) {
        e.target.style.background = 'lightgray'
    }

}

</script>

<style lang="scss" scoped>

@import 'Styles/_var.scss';
.location-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    border: 2px solid $colorBtn;
    border-radius: $borderRadius;
    @include mobile {
        flex-direction: column;
    }
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 20px;
        background: linear-gradient(150.16deg, $colorOnahau, $colorJordyBlue) !important;
        color: $colorWhite;
        font-weight: 600;
        border: 1px solid transparent;
        border-radius: 20px;
        cursor: pointer;
        max-width: 120px;
    }

    input {
        border-radius: 5px;
        padding: 5px 10px;
        border: 1px solid $colorBtn;
        max-width: 140px;
        outline: none
    }

    span {
        font-weight: 600;
    }
}

</style>
