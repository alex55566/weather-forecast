<template>
    <div v-if="store.state.showPopup" class="popup">
        <div class="popup-wrapper">
            <div class="popup-overley"></div>
            <div class="popup-content">
                <div class="popup-subscribe">
                    <h3>Enter your location, please!</h3>
                    <input v-model="inputLocation" placeholder="Your town or city..." />
                    <button @click="loadWeather">Show me the weather</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    name: 'Popup',
}
</script>
<script setup lang="ts">
import { ref, Ref} from 'vue';
import { useStore } from '../store/store'
import { addLocation } from '../helpers/index'
const store = useStore()


let inputLocation = ref('')

function loadWeather() {
    addLocation(inputLocation.value)
    if (store.state.showPopup) {
        store.commit('changePopup')
    }
}

</script>

<style lang="scss" scoped>

@import 'Styles/_var.scss';
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
        padding: 20px;
        position: relative;
        z-index: 1002;
        background-color: #cae2ff;
        border-radius: 30px;
    }

    &-subscribe {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 25px;

        input {
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
        }

        button {
            background-color: $colorBtn;
            border-radius: $borderRadius;
            color: #fff;
            cursor: pointer;
            padding: 5px 10px;
            border: 1px solid transparent;
        }
    }
}
</style>
