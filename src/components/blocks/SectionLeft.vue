<template>
<div class="block-topleft">
    <div class="info">
        <component :is="comparArr[props.img]" />
        <div class="temp">
            {{ Math.round(props.temp) }} °C
        </div>
        <div class="weather">
            <div class="weather-left">
                <img src="../../images/weather/weather.png">
                <span>{{ props.weather}}</span> 
            </div>
            <div class="weather-right">
                {{ props.desc_weather }}
            </div>
        </div>
        <div class="location">
            <img src="../../images/weather/location.png">
            <span>{{ props.town }}, {{ props.country }}</span>
        </div>
        <div class="date">
            <img src="../../images/weather/calendar.png">
            <span>{{ new Date().toLocaleString('en-En', {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'}) }}</span>
        </div>
    </div>
</div>
</template>


<script setup lang="ts">
import {
    shallowRef
} from 'vue';
import BrokenClouds from '../img/BrokenClouds.vue';
import ClearSky from '../img/ClearSky.vue';
import FewClouds from '../img/FewClouds.vue';
import Mist from '../img/Mist.vue';
import Rain from '../img/Rain.vue';
import ScatteredClouds from '../img/ScatteredClouds.vue';
import ShowerRain from '../img/ShowerRain.vue';
import Snow from '../img/Snow.vue';
import Thunderstorm from '../img/Thunderstorm.vue';

import BrokenCloudsNight from '../img/BrokenCloudsNight.vue';
import ClearSkyNight from '../img/ClearSkyNight.vue';
import FewCloudsNight from '../img/FewCloudsNight.vue';
import MistNight from '../img/MistNight.vue';
import RainNight from '../img/RainNight.vue';
import ScatteredCloudsNight from '../img/ScatteredCloudsNight.vue';
import ShowerRainNight from '../img/ShowerRainNight.vue';
import SnowNight from '../img/SnowNight.vue';
import ThunderstormNight from '../img/ThunderstormNight.vue';

const props = defineProps < IWeather > ();

interface IWeather {
    img: string,
    temp: number,
    weather: string,
    desc_weather: string,
    town: string,
    country: string,
}

let comparArr = shallowRef({
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
</script>

<style lang="scss" scoped>
@import 'Styles/_var.scss';

.block-topleft {
    width: 30%;
    @include tablet {
        width: 100%;
    }
    img {
        width: 20px;
        height: 20px;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 20px;
        height: 100%;
        padding: 16px;
        background: url('../../images/weather/gradient-1.png');
        background-size: cover;
        border-radius: $borderRadius;
    }

    .temp {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 32px;
        font-weight: 600;
        color: $colorWhite;
    }

    .weather {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: $colorWhite;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.4);
        &-left {
            display: flex;
            align-items: center;
            gap: 5px;
        }
    }

    .location, .date {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
        color: $colorWhite;
    }

    .date {
        padding-left: 3px;
        img {
        width: 15px;
        height: 15px;
    }
    }
}
</style>
