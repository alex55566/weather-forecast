<template>
    <div :class="[{'show': isShow},'error']">
        Something went wrong....try later or enter correct name
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, ComputedRef } from 'vue';
import { useStore } from '../store/store'
const store = useStore()


let isShow = ref(true)
onMounted(function ()  {
    setTimeout(() => changeState(), 2500);
})

function changeState() {
    isShow.value = false
    store.commit('changeError')
}
</script>

<style lang="scss" scoped>
@import 'Styles/_var.scss';
    .error {
        display: none;
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
        background: linear-gradient(150.16deg, $colorOnahau, $colorJordyBlue);
        border-radius: $borderRadius;
        font-weight: 600;
   
    }
    .error {
        max-width: 600px;
        color: red;
    }

    .show {
        display: flex;
    }
</style>