<template>
<div class="block-topright">
    <div class="highlights">
        <div class="title">Today's Highlights</div>
        <div class="highlights-wrapper">
            <div class="card">
                <div class="card-title">Wind</div>
                <div class="card-pic">
                    <img src="../../images/weather/equalizer.png">
                </div>
                <div class="card-info">
                    <div class="left-side">{{ props.wind_speed }} m/s</div>
                    <div class="right-side">{{ props.wind_deg }} deg</div>
                </div>
            </div>

            <div class="card">
                <div class="card-title">Pressure</div>
                <div class="card-pic">
                    <img src="../../images/weather/barometer.png">
                </div>
                <div class="card-info card-info--center">
                    {{ pressure }} mm
                </div>
            </div>

            <div class="card">
                <div class="card-title">Sunrise and sunset</div>
                <div class="card-pic">
                    <img src="../../images/weather/sun-moving.png">
                </div>
                <div class="card-info card-info--last">
                    <div class="left-side">
                        <img src="../../images/weather/sun.png">
                        <div class="info">Sunrise</div>
                        <div class="time">{{sunrise}}</div>
                    </div>
                    <div class="right-side">
                        <img src="../../images/weather/sun.png">
                        <div class="info">Sunset</div>
                        <div class="time">{{sunset}}</div>
                    </div>
                </div>
            </div>
            <div class="card-small">
                <div class="card-small-title">Wind gusts</div>
                <div class="card-small-info">
                    <div class="left-side">
                        <span>{{ props.wind_gust }}</span><span>m/s</span>
                    </div>
                    <div class="right-side">
                        <img src="../../images/weather/gusts.png">
                        <div>Learn <a href="https://www.windy.com/articles/weather-phenomena-what-s-the-difference-between-sustained-winds-and-wind-gusts-10390?satellite,7.787,115.115,5" target="_blank">more</a> about gusts</div>
                    </div>
                </div>
            </div>

            <div class="card-small">
                <div class="card-small-title">Feels like</div>
                <div class="card-small-info">
                    <div class="left-side">
                        <span>{{Math.round(props.temp_feel)}}</span><span>°C</span>
                    </div>
                    <div class="right-side">
                        <img src="../../images/weather/humidity.png">
                        <div>How hot or cold it really feels</div>
                    </div>
                </div>
            </div>

            <div class="card-small">
                <div class="card-small-title">Cloudiness</div>
                <div class="card-small-info">
                    <div class="left-side">
                        <span>{{props.cloudness}}</span><span>%</span>
                    </div>
                    <div class="right-side">
                        <img src="../../images/weather/cloud.png">
                        <div>The sky fraction obscured by clouds</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import {
    getPressureMm,
    sunsetSunrise
} from '../../helpers'
const props = defineProps < IWeather > ();

let sunset = sunsetSunrise(props.sunset);
let sunrise = sunsetSunrise(props.sunrise);
let pressure = getPressureMm(props.pressure);

interface IWeather {
    wind_deg ? : number,
        wind_speed ? : number,
        wind_gust ? : number,
        pressure ? : number,
        sunrise: number,
        sunset: number,
        temp_feel: number,
        cloudness: number,
}
</script>

<style lang="scss" scoped>
@import 'Styles/_var.scss';

.block-topright {
    width: 70%;
    @include tablet {
        width: 100%;
    }

    .highlights {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 28px 16px 16px;
        background: url('../../images/weather/gradient-4.png');
        background-size: cover;
        border-radius: $borderRadius;
        color: $colorWhite;

        .title {
            color: $colorWhite;
            font-size: 16px;
        }

        .highlights-wrapper {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            @include mobile {
                grid-template-columns: 1fr;
            }
        }

        .card-small {
            display: flex;
            flex-direction: column;
            gap: 5px;

            &-title {
                font-size: 13px;
            }

            &-info {
                display: flex;
                justify-content: space-between;
                align-items: center;

                @include smdekstop {
                    flex-direction: column;
                    align-items: unset;
                    gap: 5px;
                }

                img {
                    width: 20px;
                    height: 20px;
                }
            }

            .right-side {
                width: 55%;
                font-size: 10px;

                @include smdekstop {
                    font-size: 8px;
                    width: 100%;
                }

                line-height: 1.2;
                color: rgba(255, 255, 255, 0.6);

                a {
                    padding-bottom: 1px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
                    ;
                }
            }

            .left-side {
                display: flex;
                align-items: flex-end;
                gap: 5px;

                span:first-child {
                    font-size: 20px;
                }

                span:last-child {
                    font-size: 11px;
                    line-height: 1.2;
                    color: rgba(255, 255, 255, 0.6);
                }
            }
        }

        .card {
            display: flex;
            flex-direction: column;
            gap: 15px;
            min-height: 230px;
            padding: 16px;
            background: url('../../images/weather/gradient-2.png') no-repeat 50% 50%;
            background-size: cover;
            border-radius: 8px;

            &-pic {
                display: flex;
                justify-content: center;

                img {
                    width: 80%;
                    height: 90px;
                    min-width: 130px;
                    max-width: 150px;
                }

            }

            &-info {
                display: flex;
                justify-content: space-between;

                &--center {
                    justify-content: center;
                }

                &--last {
                    div {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                        gap: 5px;
                    }

                    .info {
                        font-size: 12px;
                        color: $colorBrightSun;
                    }

                    .time {
                        font-size: 13px;
                        font-weight: 700;
                    }

                    .right-side {
                        align-items: flex-end;
                    }
                }

                img {
                    width: 20px;
                    height: 20px;
                }

                .right-side {
                    img {
                        -moz-transform: scale(-1, 1);
                        -o-transform: scale(-1, 1);
                        -webkit-transform: scale(-1, 1);
                        transform: scale(-1, 1);
                    }
                }
            }
        }

        .card-small {
            padding: 12px 16px;
            background: url('../../images/weather/gradient-2.png') no-repeat 50% 50%;
            background-size: cover;
            border-radius: 8px;
        }
    }

}
</style>
