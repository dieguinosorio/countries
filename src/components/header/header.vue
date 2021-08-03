<template>
    <header class="header">
      <div class="head-description">
        <p class="head-description-info">Find any 
        <b class="head-description-secundary">country</b> <br>in the world.</p>
      </div>
      <div class="head-image">
        <img src="../../assets/img/world.png" alt="world">
      </div>
      <form>
        <div class="head-search">
          <input type="text" v-model="filterText" name="search"  placeholder="Search country" >
          <div class="head-select">
            <select name="filter" v-model="filterSelect" >
              <option value="">Show All</option>
              <option value="Favorites">Favorites</option>
              <option v-for="(continent,index) in continents" :key="index" v-text="continent.name" :value="continent.name"></option>
            </select>
          </div>
          <div class="head-search-lupa"><img src="../../assets/img/search.png" alt="Lupa">
          </div>
        </div>
      </form>
    </header>
</template>
<script>
import './styles.css';
export default {
  props: ['continents'],
  emits:['filter'],
  data() {
    return {
      filterText:'',
      filterSelect:'',
      filter:[],
    }
  },

  watch:{
    filterText: function() {
      this.changedFilter();
    },

    filterSelect:function(){
      this.changedFilter();
    }
  },

  methods: {
    changedFilter(){
      this.filter = [];
      this.filter={'text':this.filterText,'select':this.filterSelect};
      this.$emit('filter',this.filter);
    }
  },

  mounted() {
    
  },
}
</script>