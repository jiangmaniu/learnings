<template>
  <teleport to="#back">
    <div
      class="loading-container d-flex justify-content-center align-items-center h-100"
      :style="{backgroundColor: background}"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden sr-only">{{text || 'Loading...'}}</span>
        </div>

        <div v-if="text" class="small mt-2">{{text}}</div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDOMCreate from '../hooks/useDOMCreate'
export default defineComponent({
  name: 'Loading',
  props: {
    text: {
      type: String,
      default: ''
    },
    background: {
      type: String,
      default: ''
    }
  },
  setup () {
    useDOMCreate('back')
  }
})
</script>

<style scoped>
.loading-container {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
}
.loading-content {
  text-align: center;
}
</style>
