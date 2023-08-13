<template>
    <div class="weathers-wrapper">
        <div class="block-weather" v-for="location in locations" :key="location.id">
            <Weather :location="location.location"/>
        </div> 
    </div>
</template>

<script setup lang="ts">
import Weather from 'Components/Weather.vue'
import { computed, ComputedRef } from 'vue';
import { useStore } from '../store/store'
import {ILocations} from '../interface/index'
const store = useStore();


const locations: ComputedRef<Array<ILocations>> = computed(() => store.getters.sortedLocations)

</script>

<style lang="scss" scoped>

@import 'Styles/_var.scss';
.weathers-wrapper {
    display: flex;
    flex-direction: column;
    gap: 50px;
}

.block-weather {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background: $colorWoodSmoke;
    border-radius: $borderRadius;
}
</style>