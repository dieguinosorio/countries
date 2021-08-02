<template>
    <Header  v-on:filter="getFilters" :continents="continentsGroup"></Header>
  <div>
    <continents :filter="filters" v-on:continents="getContinents"></continents>
  </div>
</template>
<script>
import  Header from './components/header/header.vue'
import continents from './components/continents/index.vue'
import './assets/css/styles.css';
import './assets/css/index.css';
export default {
  name: 'App',
  components: {
    continents,
    Header
  },
  data(){
    return{
      data:[],
      filters:[],
      continentsGroup:[],
    }
  },

  methods: {

    getFilters(val){
      this.filters = val;
      console.log(this.filters)
    },

    getContinents(val){
      this.continentsGroup = val;
    }
  },

  mounted(){

  }

}
</script>