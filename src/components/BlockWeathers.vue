<template>
    <div class="weathers-wrapper">
        <div class="block-weather" v-for="location in locations" :key="location.id">
            <Weather :location="location.location"/>
        </div> 
    </div>
</template>

<script lang="ts">
import Weather from 'Components/Weather.vue'
    export default {
        name: 'BlockWeather',
        components: {
            Weather
        }
    }
</script>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useStore } from '../store/store'
import {ILocations} from '../interface/index'
const store = useStore();


const locations: ComputedRef<Array<ILocations>> = computed(() => store.getters.sortedLocations)

</script>

<style lang="scss" scoped>

@import 'Styles/_var.scss';
.weathers-wrapper {
    display: grid;
    grid-template-columns: repeat(2,1fr) ;
    gap: 30px;
    @media (max-width: 1024px) {
        display: flex;
        flex-direction: column;
    }
}

.block-weather {
    padding: 20px;
    border: 2px solid $colorBtn;
    border-radius: $borderRadius;
}
</style>