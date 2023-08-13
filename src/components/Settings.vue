<template>
    <transition>
    <div v-if="!popup" class="settings-wrapper">
        <div class="settings-inner">
            <button @click="editLocation" class="button">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2994 10.4527L19.2267 10.7677C19.3846 10.7935 19.5003 10.9298 19.5 11.0896V12.883C19.5 13.0412 19.3865 13.1768 19.2303 13.2042L17.3004 13.543C17.1885 13.9298 17.0349 14.3022 16.8415 14.6543L17.9823 16.2382C18.0759 16.3679 18.0612 16.5463 17.9483 16.6595L16.6804 17.9283C16.5682 18.0401 16.3921 18.0561 16.2623 17.9645L14.6627 16.8424C14.3099 17.0387 13.9352 17.1952 13.5442 17.3103L13.2034 19.231C13.176 19.3865 13.0406 19.5 12.8825 19.5H11.0888C10.9294 19.5 10.7934 19.3849 10.7676 19.228L10.4493 17.3168C10.059 17.204 9.6823 17.0485 9.32585 16.8525L7.73767 17.9648C7.60821 18.0558 7.43178 18.0401 7.31992 17.9283L6.05198 16.6595C5.93947 16.5463 5.9248 16.3686 6.01741 16.2391L7.13958 14.6697C6.94163 14.3116 6.78444 13.9337 6.67062 13.5414L4.76905 13.2042C4.61349 13.1765 4.5 13.0412 4.5 12.883V11.0896C4.5 10.9304 4.61544 10.7941 4.77263 10.768L6.67421 10.4514C6.78868 10.0582 6.94586 9.68022 7.14316 9.32315L6.0347 7.73739C5.94371 7.60793 5.95937 7.43185 6.07122 7.32L7.33883 6.0525C7.452 5.94 7.62908 5.925 7.7592 6.01793L9.33433 7.14293C9.68817 6.94924 10.0639 6.795 10.4552 6.6825L10.767 4.77359C10.7927 4.61576 10.929 4.5 11.0888 4.5H12.8825C13.041 4.5 13.1763 4.61413 13.2037 4.77L13.5399 6.68935C13.929 6.8025 14.304 6.95837 14.6591 7.15467L16.2385 6.01957C16.3683 5.92598 16.5464 5.94065 16.6595 6.05348L17.9278 7.32098C18.0397 7.43315 18.0553 7.60957 17.9643 7.73902L16.8392 9.34239C17.0323 9.69424 17.1865 10.066 17.2994 10.4527ZM9.71725 12C9.71725 13.2607 10.7393 14.2826 12.0001 14.2826C13.2608 14.2826 14.2829 13.2607 14.2829 12C14.2829 10.7394 13.2608 9.71742 12.0001 9.71742C10.7393 9.71742 9.71725 10.7394 9.71725 12Z" stroke="#000000"/>
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
                    <input  @keyup.enter="loadWeather" v-model="inputLocation" placeholder="Your town or city...">
                    <button @click="loadWeather">Add location</button>
                    </div>
                </div>
            </div>
            </transition>
        </div>
    </div>
    </transition>
   
</template>

<script setup lang="ts">
import Location from 'Components/Location.vue'
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

const popup: ComputedRef<boolean> = computed(() => store.state.isShowPopup)

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
            background: linear-gradient(150.16deg, $colorOnahau, $colorJordyBlue);
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
            @include mobile {
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
        border: 1px solid $colorBtn;
        outline: none;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(150.16deg, $colorOnahau, $colorJordyBlue);
        color: $colorWhite;
        font-weight: 600;
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