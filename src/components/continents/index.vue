<template>
<div class="content-continents">
    <div class="container-continent" v-for="(continent,index) in continents" :key="index">
        <h3 class="name-continent" v-text="continent?.name"></h3>
        <countries :continent="continent.name" :data="data" :filter="filter" :groupcodes="GroupCodeCountry"></countries>
    </div>   
</div>         
</template>
<script>
import axios from 'axios';
import './styles.css';
import ServiceApp from '../../services/ServiceApp';
const restServiceApp = new ServiceApp();
import countries from '../../components/countries/index.vue'

export default {
    restServiceApp,
    props: ['filter'],
    components: {
        countries
    },
    data(){
        return{
            continents:[],
            backContinents:[],
            data : [],
            dataBack: [],
            GroupCodeCountry:[],
        }
    },

    watch:{
        filter(){
            this.filterContinentByCountry(this.filter);
        },
    },

    methods: {
        getDataEndPoint() {
            let me = this;
            let url = "https://restcountries.eu/rest/v2/all";
            axios.get(url).then(response => {
                me.data = response.data;
                me.dataBack = response.data;
                me.continents = restServiceApp.getContinents(me.data);
                me.backContinents =me.continents;
                me.GroupCodeCountry =  restServiceApp.getCountriesByCode(me.data);
                me.$emit('continents',me.continents);
            }).catch(error=>{
                console.log(error)
            })
        },

        filterContinentByCountry(search){
            let me = this;
            let filText = search.text;
            let filSelect = search.select;
            
            if(filText || filSelect){
                let searchCont = [];
                if(filSelect && filSelect == 'Favorites'){
                    me
                    if(restServiceApp.areThereAnyFavorite()){
                        let conts = me.continents;
                        let FavoritesCountries = Object.entries(restServiceApp.getFavoritesCountries());
                        console.log(FavoritesCountries)
                        var newContinents = [];
                        conts.map(function(c){
                            FavoritesCountries.map(function(co){
                                if(co.indexOf(c.name)>=0){
                                    newContinents.push(c)
                                }
                            })
                        })
                        newContinents.length > 0 ? searchCont = newContinents: '';
                    }
                }
                else{
                    searchCont = this.backContinents.filter(continent =>{
                        if( filText && !filSelect){
                            return continent.name.toLowerCase().includes(filText.toLowerCase());
                        }
                        else if(filSelect && filText){
                            return continent.name.toLowerCase().includes(filText.toLowerCase()) && continent.name.toLowerCase().includes(filSelect.toLowerCase())
                        }
                        else if(filSelect && !filText){
                            return continent.name.toLowerCase().includes(filSelect.toLowerCase())
                        }
                        else{
                            return false;
                        }
                    })
                }

                if(searchCont && searchCont.length > 0){
                    this.continents =  searchCont;
                }
                else{
                    let filterData = this.data?.filter(country => country.name.toLowerCase().includes(filText.toLowerCase()));
                    let hydratedCont = restServiceApp.getContinents(filterData);
                    if(hydratedCont.length != this.continents.length ){
                        this.continents = hydratedCont;
                    }
                }
            }
            else{
                this.continents = this.backContinents;
            }
        },
    },

    mounted() {
        this.getDataEndPoint();
    },
}
</script>