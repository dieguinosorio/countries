<template>
    <div class="content-country" v-for="(country,index) in countries" :key="index" @click.prevent="selectCountry(country)">
        <div class="country-flag">
            <div><img :src="country['flag']" :alt="country['name']"></div>
        </div>
        <div class="country-name">
            <span v-text="country['name']"></span>
            <span class="list-icon-favorite" v-if="filterFavorites"><img src='./img/favorite.png' alt="favorite" /> </span>
        </div>
    </div> 
<modalfavorite v-if="countrySelect" :countrySelect="countrySelect" :groupcode="groupcodes" v-on:closemodal="closeModal()" v-on:delfavorite="deleteFavorit()"></modalfavorite>
</template>
<script>
import './styles.css';
import ServiceApp from '../../services/ServiceApp';
const restServiceApp = new ServiceApp();
import modalfavorite from '../modal/index.vue'
export default {
    components: {
        modalfavorite
    },
    props: ['filter','continent','data','groupcodes','filterFavorites'],
    emits:['deleteFavorite'],
    data(){
        return{
            countries: restServiceApp.getCountriesByContinent(this.continent,this.data),
            backCountries:[],
            countrySelect:null,
            serviceApp:restServiceApp,
            fillFavorites:false,
        }
    },

    watch:{
        data(){
            this.countries = restServiceApp.getCountriesByContinent(this.continent,this.data);
        }
    },

    methods:{
        selectCountry(country){
            this.countrySelect = country;
        },

        deleteFavorit(){
            this.$emit('deleteFavorite');
        },

        closeModal(){
            this.countrySelect = null;
        }
    },

    mounted(){
    }
}
</script>