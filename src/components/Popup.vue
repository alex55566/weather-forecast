<template>
    <div v-if="store.state.isShowPopup" class="popup">
        <div class="popup-wrapper">
            <div class="popup-overley"></div>
            <div class="popup-content">
                <div class="popup-subscribe">
                    <h3>Enter your location, please!</h3>
                    <input @keyup.enter="loadWeather" @input="hideAlert" v-model="inputLocation" placeholder="Your town or city..." />
                    <Transition>
                        <div class="empty-error" v-if="isEmpty">Input must contain more than 2 letters</div>
                    </Transition>
                    <button @click="loadWeather">Show me the weather</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useStore } from '../store/store'
import { addLocation } from '../helpers/index'

const store = useStore()

let inputLocation = ref('')

function loadWeather() {
    addLocation(inputLocation.value)
    if (store.state.isShowPopup && inputLocation.value.length > 2) {
        store.commit('changePopup')
    }

    else {
        store.commit('changeEmpty', true)
    }
}

function hideAlert() {
    store.commit('changeEmpty', false)
}

const isEmpty: ComputedRef<boolean> = computed(() => store.state.isEmpty)


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
.popup {
    inset: 0;
    position: fixed;
    z-index: 1001;

    &-wrapper {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: center;
        position: relative;
        width: 100%;
    }

    &-overley {
        background-color: rgba(0, 0, 0, .8);
        inset: 0;
        position: absolute
    }

    &-content {
        padding: 20px 35px;
        position: relative;
        z-index: 1002;
        background: linear-gradient(150.16deg, $colorOnahau, $colorJordyBlue);
        border-radius: 30px;
    }

    &-subscribe {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 35px;

        h3 {
            color: $colorWhite;
        }

        input {
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
            outline:none;
        }

        button {
            background-color: $colorBtn;
            border-radius: $borderRadius;
            color: $colorWhite;
            cursor: pointer;
            padding: 5px 10px;
            border: 1px solid transparent;
            font-weight: 600;
        }

        .empty-error {
            position: absolute;
            color: $colorRed;
            top: 115px;
            transition: opacity .5s;
        }
    }
}
</style>
