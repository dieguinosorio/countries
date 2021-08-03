<template>
    <Header  v-on:filter="getFilters" :continents="continentsGroup"></Header>
  <div>
    <contentcontinents :filter="filters" v-on:continents="getContinents" ></contentcontinents>
  </div>
</template>
<script>
import  Header from './components/header/header.vue'
import contentcontinents from './components/contentcontinents/index.vue'
import './assets/css/styles.css';
import './assets/css/index.css';
export default {
  name: 'App',
  components: {
    contentcontinents,
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
    },

    getContinents(val){
      this.continentsGroup = val;
    }
  },
}
</script>