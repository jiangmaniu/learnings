<template>
  
  <div id = "app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      <h1>鼠标位置X：{{x}}</h1>
      <h1>鼠标位置y：{{y}}</h1>
    </div>
    <h1>{{count}}</h1>
    <h2>乘二：{{double}}</h2>
    <button @click="increase">add count</button>
    <p>{{errors}}</p>
    <ul>
      <li v-for="number in numbers" :key="number">
        <h1>{{number}}</h1>
      </li>
    </ul>
    <Model :isOpen="modelIsOpen" @close-model="onModelClose">My Model !!</Model>
    <h1>{{person.name}}</h1>

    <h1 v-if="loading">Loading!...</h1>
    <suspense>
      <template #default>
        <!-- 展现result内容 -->
        <div>
          <AsyncShow/>
          <DogShow/>
        </div>
      </template>
      <template #fallback>
        <!-- 展现失败的内容 -->
        <h1>loading!!!</h1>
      </template>
    </suspense>
    <img v-if="loaded" :src="result[0].url" alt="狗狗狗">
    <button @click="openModel">Open Model</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, watch, onErrorCaptured, onUnmounted, ref } from 'vue';
import useMousePosition from './hooks/useMousePosition'
import Model from './components/Model.vue';
import useURLLoader from './hooks/useURLLoader';
import DogShow from './components/DogShow.vue'
import AsyncShow from './components/AsyncShow.vue'
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string };
}
interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default defineComponent({
  name: 'App',
  components: { Model, AsyncShow, DogShow },
  setup () {
    const errors: any = ref(null)
    onErrorCaptured((err: any) => {
      errors.value = err
      return true
    })
    // const count = ref(0)
    
    // const double = computed(() => {
    //   return count.value * 2
    // })

    // const increase = () => {
    //   count.value++
    // }

    const data: DataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increase: () => { data.count++ },
      numbers: [0, 1, 2],
      person: {}
    })

    data.numbers[0] = 5
    data.person.name = 'xixi'
    const refData = toRefs(data)

    watch([refData.count], () => {
      console.log(data.count)
    })

    const refApiData = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search')
    const { resultX } = refApiData
    watch(resultX, (newVal) => {
      console.log(resultX)
      if (resultX.value) {
        console.log('value', resultX.value[0])
      }
    })

    // 跟踪鼠标位置
    const refMouseData = useMousePosition()

    const modelData = reactive({
      modelIsOpen: false,
      openModel: () => {
        modelData.modelIsOpen = true
      },
      onModelClose: () => {
        modelData.modelIsOpen = false
      }
    })
    
    return {
      errors,
      ...refData,
      ...refMouseData,
      ...refApiData,
      ...toRefs(modelData)
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
