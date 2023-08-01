<template>
    <div class="info-weather">
        <div class="info-weather__row"><h3>{{ props.location.name }}</h3><h3>{{ props.location.sys.country }}</h3></div>
        <component :is="comparArr[props.location.weather[0].icon]" />
        <div class="info-weather__row"><span>{{ props.location.weather[0].main }}</span><span>{{ props.location.weather[0].description }}</span></div>
        <div class="info-weather__row"><span>Temperature</span><span>{{ props.location.main.temp}}</span></div>
        <div class="info-weather__row"><span>Feels Like</span><span>{{ props.location.main.feels_like}}</span></div>
        <div class="info-weather__row"><span>Humidity</span><span>{{ props.location.main.humidity}}%</span></div>
        <div class="info-weather__row"><span>Sunset</span><span>{{ sunset }}</span></div>
        <div class="info-weather__row"><span>Sunrise</span><span>{{ sunrise }}</span></div>
        <div class="info-weather__row"><span>Visibility</span><span>{{ props.location.visibility /1000 + 'km'}}</span></div>
        <div class="info-weather__row"><span>Wind deg</span><span>{{ props.location.wind.deg}}</span></div>
    </div>
</template>

<script lang="ts">
    export default {
        
    }
</script>

<script setup lang="ts">
import { shallowRef } from 'vue';
import BrokenClouds from './img/BrokenClouds.vue';
import ClearSky from './img/ClearSky.vue';
import FewClouds from './img/FewClouds.vue';
import Mist from './img/Mist.vue';
import Rain from './img/Rain.vue';
import ScatteredClouds from './img/ScatteredClouds.vue';
import ShowerRain from './img/ShowerRain.vue';
import Snow from './img/Snow.vue';
import Thunderstorm from './img/Thunderstorm.vue';

import BrokenCloudsNight from './img/BrokenCloudsNight.vue';
import ClearSkyNight from './img/ClearSkyNight.vue';
import FewCloudsNight from './img/FewCloudsNight.vue';
import MistNight from './img/MistNight.vue';
import RainNight from './img/RainNight.vue';
import ScatteredCloudsNight from './img/ScatteredCloudsNight.vue';
import ShowerRainNight from './img/ShowerRainNight.vue';
import SnowNight from './img/SnowNight.vue';
import ThunderstormNight from './img/ThunderstormNight.vue';

import { currentTime, sunsetSunrise } from '../helpers/index'

const props = defineProps<IWeather>();

currentTime()
let sunset = sunsetSunrise(props.location.sys.sunset);
let sunrise = sunsetSunrise(props.location.sys.sunrise);


let comparArr = shallowRef( {
                '01d': ClearSky,
                '02d': FewClouds,
                '03d': ScatteredClouds,
                '04d': BrokenClouds,
                '09d': ShowerRain,
                '10d': Rain,
                '11d': Thunderstorm,
                '13d': Snow,
                '50d': Mist,

                '01n': ClearSkyNight,
                '02n': FewCloudsNight,
                '03n': ScatteredCloudsNight,
                '04n': BrokenCloudsNight,
                '09n': ShowerRainNight,
                '10n': RainNight,
                '11n': ThunderstormNight,
                '13n': SnowNight,
                '50n': MistNight,
            })



interface IWeather {
    location: IWeatherInner
}

interface IMain {
    temp: number
    feels_like: number,
    humidity: number
}

interface ISys {
    country: string,
    sunset: number,
    sunrise: number,
}

interface IWind {
    deg: number,
}

interface IWeatherInner {
    name: string,
    weather: object,
    main: IMain,
    sys: ISys,
    visibility: number,
    wind: IWind,
}
</script>

<style lang="scss" scoped>
h3 {
    margin: unset;
}

.info-weather {
    display: flex;
    flex-direction: column;
    gap: 15px;
    &__row {
        display: flex;
        gap: 20px;
        span:first-child {
            font-weight: 600;
        }
    }
}

</style>