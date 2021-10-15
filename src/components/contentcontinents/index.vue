<template>
    <continents v-if="!NotfoundData" :continents="continents" :dataFilter="dataFilter" :groupcodes="GroupCodeCountry" v-on:deletedFavorit="deletedFavorit" :filterFavorites="filterFavorites"></continents>
    <div class="content-not-found" v-else >
        <p>No results found</p>
    </div>   
</template>
<script>
import continents from '../continents/index.vue'
import axios from 'axios';
import ServiceApp from '../../services/ServiceApp';
const restServiceApp = new ServiceApp();
export default {
    props:['filter'],
    emits:['continents'],
    components: {
        continents,
    },
    data(){
        return{
            data:[],
            dataBack:[],
            dataFilter:[],
            continents:[],
            countries:[],
            GroupCodeCountry:[],
            backContinents:[],
            filterFavorites:false,
            NotfoundData:false,
        }
    },

    watch:{
        filter(){
            this.filterData();
        }
    },

    methods:{
        getDataEndPoint() {
            let me = this;
            let url = "https://restcountries.com/v2/all";
            axios.get(url).then(response => {
                me.data = response.data;
                me.dataBack = response.data;
                me.dataFilter = response.data;
                me.continents = restServiceApp.getContinents(me.data);
                me.backContinents =me.continents;
                me.GroupCodeCountry =  restServiceApp.getCountriesByCode(me.data);
                me.$emit('continents',me.continents);
            }).catch(error=>{
                console.log(error)
            })
        },

        deletedFavorit(){
            this.filterData();
        },

        filterData(){
            let filText = this.filter.text;
            let filSelect = this.filter.select;
            this.NotfoundData = false;
            this.filterFavorites = false;
            if(filText || filSelect){
                if(filSelect && filSelect === 'Favorites'){
                    this.filterFavorites = true;
                    let searchFavorites = [];
                    if(restServiceApp.areThereAnyFavorite()){
                        let favoritCountries = restServiceApp.getCountriesFilterFavorite(this.dataBack);
                        favoritCountries.length > 0 ? searchFavorites = favoritCountries: '';
                    }
                    if(filText){
                        searchFavorites = searchFavorites?.filter(country => country.name.toLowerCase().includes(filText.toLowerCase()) || country.name.toLowerCase() === filText.toLowerCase());
                    }
                    if(searchFavorites.length >0 ){
                        this.continents = restServiceApp.getContinents(searchFavorites);
                        this.dataFilter = searchFavorites;
                    }
                    else{
                        this.NotfoundData =!this.NotfoundData;
                    }
                }
                else{
                    let filterData = this.data.filter(fill =>{
                        if( filText && !filSelect){
                            return fill.name.toLowerCase().includes(filText.toLowerCase()) || fill.region.toLowerCase().includes(filText.toLowerCase());
                        }
                        else if(filSelect && filText){
                            return fill.name.toLowerCase().includes(filText.toLowerCase()) && fill.region.toLowerCase().includes(filSelect.toLowerCase())
                        }
                        else if(filSelect && !filText){
                            return fill.region.toLowerCase().includes(filSelect.toLowerCase())
                        }
                        else{
                            return false;
                        }
                    });
                    if(filterData.length >0 ){
                        this.continents = restServiceApp.getContinents(filterData);
                        this.dataFilter = filterData;
                    }
                    else{
                        this.NotfoundData =!this.NotfoundData;
                    }
                }
            }
            else{
                this.continents = this.backContinents;
                this.dataFilter = this.dataBack;
            }
        }
    },

    mounted(){
        this.getDataEndPoint();
    }    
}
</script>
