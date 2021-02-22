<template>
  <img :src="result && result.message" alt="">
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
export default defineComponent({
  async setup() {
    const rawData = await axios.get('https://dog.ceo/api/breeds/image/ra111 ndom')

    return {
      result: rawData.data
    }
  }
})
</script>

<style>

</style>