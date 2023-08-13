<template>
<div class="container">
    <div v-if="isError && !isShowPopup">
        <Error/>
    </div>
    <div v-if="isLoading" class="loading">
        <Loader/>
    </div>
    <div class="block">
        <Popup />
        <div class="inner-block">
            <BlockWeather/>
            <Settings/>
        </div>
    </div>
 
</div>
</template>

<script setup lang="ts">
import Loader from 'Components/Loader.vue'
import Popup from 'Components/Popup.vue'
import Settings from 'Components/Settings.vue'
import BlockWeather from 'Components/BlockWeathers.vue'
import Error from 'Components/Error.vue'
import { onMounted, ref, computed, ComputedRef, onUnmounted } from 'vue';
import { useStore } from './store/store'
const store = useStore()

const checkStorage = ref(sessionStorage.getItem('locations')!)

const isError: ComputedRef<Boolean> = computed(() => store.state.isError)
const isLoading: ComputedRef<Boolean> = computed(() => store.state.isLoad)
const isShowPopup: ComputedRef<Boolean> = computed(() => store.state.isShowPopup)


onMounted(function ()  {
    if(checkStorage.value) {
        store.commit('loadSession')
    }
})



</script>

<style lang="scss" scoped>
@import 'Styles/_var.scss';

.container {
    display: flex;
    justify-content: center;
    height: 100%;
    position: relative;
     .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        top: 50%;
        position: absolute;
        left: 50%;
        text-align: center;
        z-index: 5;
        transform: translate(-50%, -50%);
   
    }
    .loading {
        max-width: 200px;
        color: green;
    }
}

.block {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 1200px;
    width: 100%;
    min-height: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-left: 50px;
    padding-right: 50px;
    @include smtablet {
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 15px;
        padding-right: 15px;
    }
}

.inner-block {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    gap: 50px;
 
}

.error {
    transition: opacity .5 ease-in-out;
    font-weight: 600;
    font-size: 18px;
}

</style>
