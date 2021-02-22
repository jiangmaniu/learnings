<template>
  <teleport to="#model">
    <div id="center" v-if="isOpen">
      <h2>this is model</h2>
      <button @click="buttonClick">Close</button>
    </div>
  </teleport>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    isOpen: Boolean,

  },
  emits: {
    'close-model': null
  },
  setup(props, context) {
    const buttonClick = () => {
      context.emit('close-model')
    }

    return {
      buttonClick
    }
  }
})
</script>

<style>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid #000;
  background: white;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>