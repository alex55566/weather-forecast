<template>
<div class="section-bottom">
    <div class="block-bottom">
        <div class="block-wrapper">
            <div>
                <img v-if="props.img === 'compass'" src="../../images/weather/compass.png">
                <img v-if="props.img === 'humidity-bot'" src="../../images/weather/humidity-bot.png">
            </div>
            <div class="prop-wrapper">
                <div class="prop-wrapper__top">
                    <div class="prop" v-if="props.img === 'compass'">Longitude: {{ props.prop.lon }}</div>
                    <div class="prop" v-if="props.img === 'humidity-bot'">Humidity: {{ props.prop }}%</div>
                    <div class="text">{{ props.text_top }}</div>
                </div>
                <div class="prop-wrapper__bottom">
                    <div class="prop" v-if="props.img === 'compass'">Latitude: {{ props.prop.lat }}</div>
                    <div class="text">{{ props.text_bottom }}</div>
                </div>
            </div>
        </div>
    </div>
    <div></div>
</div>
</template>

<script setup lang="ts">
const props = defineProps < IWeather > ();

interface IWeather {
    prop: object | number,
        text_top: string,
        text_bottom: string,
        img: string
}
</script>

<style lang="scss" scoped>
@import 'Styles/_var.scss';

.section-bottom {
    width: 50%;
    @include tablet {
        width: 100%;
    }

    .block-bottom {
        height: 100%;
        padding: 28px 16px 16px;
        background: url('../../images/weather/gradient-1.png') no-repeat 0% 0%;
        background-size: cover;
        border-radius: $borderRadius
    }

    .block-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
        color: $colorWhite;
        @include mobile {
            flex-direction: column;
        }

        .prop-wrapper {
            display: flex;
            flex-direction: column;
            gap: 10px;
            @include tablet {
                max-width: 650px;
            }
            .prop {
                font-size: 15px;
                font-weight: 700;
            }

            .text {
                font-size: 13px;
                color: rgba(255, 255, 255, 0.75);
            }

            .prop-wrapper__top, .prop-wrapper__bottom {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
        }

        img {
            width: 75px;
            height: 70px;
        }

    }
}
</style>
