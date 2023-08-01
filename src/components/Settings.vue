<template>
    <transition>
    <div v-if="!popup" class="settings-wrapper">
        <div class="settings-inner">
            <button @click="editLocation" class="button">
                <svg class="logo-block" style="width: 28px; height: 28px;">
                    <use xlink:href="../images/sprite.svg#settings"></use>
                </svg>
            </button>
            <transition>
            <div v-if="showSettings" class="locations-wrapper">
                <div class="addlocation-wrapper">
                    <h5>You can drag and drop in this block</h5>
                    <h5>For change location click 'change location', then change location in input and press enter</h5>
                    <div class="addlocation-wrapper__inner" v-for="location in locations" :key="location.id">
                        <Location :location="location"/>
                    </div>
                    <h4>Add Location</h4>
                    <div class="addlocation-wrapper__enter">
                    <input v-model="inputLocation" placeholder="Your town or city...">
                    <button @click="loadWeather">Add location</button>
                    </div>
                </div>
            </div>
            </transition>
        </div>
    </div>
    </transition>
   
</template>

<script lang="ts">
import Location from 'Components/Location.vue'
    export default {
        name: 'Settings',
        components: {
            Location
        }
    }
</script>

<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useStore } from '../store/store'
import { addLocation } from '../helpers/index'
import {ILocations} from '../interface/index'
const store = useStore();

let inputLocation = ref();

let showSettings = ref(false)

function loadWeather() {
    addLocation(inputLocation.value)
    inputLocation.value = ''
}


function editLocation() {
    showSettings.value = !showSettings.value
}

const locations: ComputedRef<Array<ILocations>> = computed(() => store.getters.sortedLocations)

const popup: ComputedRef<boolean> = computed(() => store.state.showPopup)

</script>

<style lang="scss" scoped>

@import 'Styles/_var.scss';

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.settings {
    &-wrapper {
        display: flex;
        justify-content: flex-end;
    }
    &-inner {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 30px;
            .button {
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 100px;
            padding: 5px 20px;
            background-color: $colorBtn;
            border: 1px solid transparent;
            border-radius: $borderRadius;
            cursor: pointer;
        }
    }

}

h5 {
    max-width: 400px;
}
.addlocation-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    &__enter {
        display: flex;
        gap: 10px;
        justify-content: space-between;
        width: 100%;
            @media (max-width: 510px) {
            flex-direction: column;
        }
    }
    &__inner {
        display: flex;
        justify-content: space-between;
    }
    input {
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        border: 1px solid $colorBtn
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $colorBtn;
        border-radius: $borderRadius;
        cursor: pointer;
        padding: 5px 10px;
        border: 1px solid transparent;
    }
}

.locations-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

h4 {
    margin: unset;
}

</style>