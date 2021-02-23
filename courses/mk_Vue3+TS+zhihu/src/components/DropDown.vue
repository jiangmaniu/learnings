<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click="isShowMenu = !isShowMenu"
    >
      {{title}}
    </a>
    <ul v-if="isShowMenu" class="dropdown-menu d-block">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    },
    closeOnContentClick: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const isShowMenu = ref(false)

    // 点击其他区域隐藏菜单
    const dropdownRef = ref<null | HTMLElement>(null)
    const isClickOutside = useClickOutside(dropdownRef, !props.closeOnContentClick)
    watch([isClickOutside], () => {
      if (isClickOutside.value && isShowMenu.value) {
        isShowMenu.value = false
      }
    })

    return {
      isShowMenu,
      dropdownRef
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
