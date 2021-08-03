<template>
<div class="content-continents">
    <div class="container-continent" v-for="(continent,index) in continents" :key="index">
        <h3 class="name-continent" v-text="continent.name"></h3>
        <countries :continent="continent.name" :data="dataFilter" :groupcodes="groupcodes" v-on:deleteFavorite="deleteFavorite" :filterFavorites="filterFavorites"></countries>
    </div>   
</div> 
</template>
<script>
import './styles.css';
import ServiceApp from '../../services/ServiceApp';
const restServiceApp = new ServiceApp();
import countries from '../../components/countries/index.vue'

export default {
    props: ['filter','continents','dataFilter','groupcodes','filterFavorites'],
    emits:['deletedFavorit'],
    components: {
        countries
    },
    data(){
        return{
            backContinents:[],
            data : [],
            dataBack: [],
            GroupCodeCountry:[],
            restServiceApp : restServiceApp ,
        }
    },

    
    methods: {
        deleteFavorite(){
            this.$emit('deletedFavorit');
        }
    },
}
</script>