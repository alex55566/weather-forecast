<template>
    <div>llll</div>
    <div class="container">
        <div v-if="isError">
            <Error/>
        </div>
        <div class="loading" v-if="isLoading">Loading...</div>
        <div class="block">
            <Popup />
            <div class="inner-block">
                <BlockWeather/>
                <Settings/>
            </div>
        </div>
    </div>
    </template>
    
    <script lang="ts">
    import Popup from 'Components/Popup.ce.vue'
    import Settings from 'Components/Settings.vue'
    import BlockWeather from 'Components/BlockWeathers.vue'
    import Error from 'Components/Error.vue'
    export default {
        name: 'App',
        components: {
            Popup,
            Settings,
            BlockWeather,
            Error
        }
    }
    </script>
    
    <script setup lang="ts">
    import { onMounted, ref, computed, ComputedRef } from 'vue';
    import {store} from './store/store';
    const state = store.state;
    
    const checkStorage = ref(sessionStorage.getItem('locations')!)
    
    const isError: ComputedRef<Boolean> = computed(() => state.isError)
    const isLoading: ComputedRef<Boolean> = computed(() => state.isLoader)
    
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
            top: 0;
            bottom: 0;
            margin: auto;
            position: absolute;
            left: 0;
            right: 0;
            padding: 20px;
            text-align: center;
            z-index: 5;
            background-color: rgba(129, 187, 189, 0.8);
            border-radius: $borderRadius;
       
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
        padding-left: 50px;
        padding-right: 50px;
    }
    
    .inner-block {
        display: flex;
        justify-content: space-between;
        @media (max-width: 1120px) {
            flex-direction: column-reverse;
            align-items: center;
            gap: 50px;
        }
    }
    
    .error {
        font-weight: 600;
        font-size: 18px;
    }
    
    </style>
    