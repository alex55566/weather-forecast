<template>
<div class="sections">
    <SectionLeft 
        :img="props.location.weather[0].icon" 
        :temp="props.location.main.temp" 
        :weather="props.location.weather[0].main" 
        :desc_weather="props.location.weather[0].description" 
        :town="props.location.name" :country="props.location.sys.country " 
    />
    <SectionRight 
        :wind_deg="props.location.wind.deg"
        :wind_speed="props.location.wind.speed"
        :wind_gust="props.location.wind.gust"
        :pressure="props.location.main.pressure"
        :sunset="props.location.sys.sunset"
        :sunrise="props.location.sys.sunrise"
        :temp_feel="props.location.main.feels_like"
        :cloudness="props.location.clouds.all"
    />
</div>
<div class="sections sections-bottom">
    <SectionBottom 
    :prop="props.location.coord" 
    text_top="Longitude measures distance east or west of the prime meridian." 
    text_bottom="Latitude lines start at the equator (0 degrees latitude) and run east and west, parallel to the equator." 
    img="compass"/>
    <SectionBottom 
    :prop="props.location.main.humidity" 
    text_top="Humidity is the concentration of water vapor present in the air. Water vapor, the gaseous state of water, is generally invisible to the human eye." 
    text_bottom="The same amount of water vapor results in higher relative humidity in cool air than warm air." 
    img="humidity-bot"/>
</div>
</template>

<script setup lang="ts">
import SectionLeft from './blocks/SectionLeft.vue'
import SectionRight from './blocks/SectionRight.vue'
import SectionBottom from './blocks/SectionBottom.vue'

const props = defineProps < IWeather > ();


interface IWeather {
    location: IWeatherInner
}

interface IMain {
    temp: number
    feels_like: number,
    humidity: number,
    pressure: number,
}

interface ISys {
    country: string,
    sunset: number,
    sunrise: number,
}

interface IWind {
    deg: number,
    speed: number,
    gust: number,
}

interface IClouds {
    all: number,
}

interface IWeatherInner {
    name: string,
    weather: object,
    main: IMain,
    sys: ISys,
    visibility: number,
    wind: IWind,
    clouds: IClouds,
    coord: object
}
</script>

<style lang="scss" scoped>

@import 'Styles/_var.scss';

.sections {
    display: flex;
    gap: 20px;
    width: 100%;
    @include tablet {
        flex-direction: column;
        gap: 20px;
    }
}
h3 {
    margin: unset;
}

</style>
