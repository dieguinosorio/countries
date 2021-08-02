<template>
    <div class="content-country" v-for="(country,index) in countries" :key="index" @click.prevent="selectCountry(country)">
        <div class="country-flag">
            <div><img :src="country['flag']" :alt="country['name']"></div>
        </div>
        <div class="country-name">
            <span v-text="country['name']"></span>
        </div>
    </div> 
    <modalfavorite v-if="countrySelect" :countrySelect="countrySelect" :groupcode="groupcodes" v-on:closemodal="closeModal()"></modalfavorite>
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
    props: ['filter','continent','data','groupcodes'],
    data(){
        return{
            countries:restServiceApp.getCountriesByContinent(this.continent,this.data),
            backCountries:[],
            countrySelect:null,
        }
    },

    watch:{
        filter(){
            this.filterList(this.filter);
        },
        continent(){
            this.countries = restServiceApp.getCountriesByContinent(this.continent,this.data);
        }
    },

    methods:{
        filterList(search){
            let filText = search.text;
            let filSelect = search.select;
            let searchCountry = [];
            let me = this;
            if(filSelect && filSelect == 'Favorites'){
                
               
                if(restServiceApp.areThereAnyFavorite()){
                    if(restServiceApp.areThereAnyFavorite()){
                        let conts = me.countries;
                        let FavoritesCountries = Object.entries(restServiceApp.getCountriesFavorite());
                        //console.log(FavoritesCountries)
                        var newCountries = [];
                        conts.map(function(c){
                            c
                            FavoritesCountries.map(function(co){
                                let dat = co[1]
                                if(dat.name.indexOf(c.name)>=0){
                                    newCountries.push(c)
                                }
                            })
                        })
                        newCountries.length > 0 ? searchCountry = newCountries: '';
                    }

                    if(searchCountry && searchCountry.length > 0){
                        me.backCountries = me.countries;
                        me.countries =  searchCountry;
                    }
                }
            }   
            else if(filText){
                searchCountry = this.countries?.filter(country => country.name.toLowerCase().includes(filText.toLowerCase()) || country.name.toLowerCase() === filText.toLowerCase());
                if(searchCountry && searchCountry.length > 0){
                    this.backCountries = this.countries;
                    this.countries =  searchCountry;
                }
            }
            else{
                this.countries = restServiceApp.getCountriesByContinent(this.continent,this.data);
            }

        },
        
        filterBycountry(countries,filter){
            return countries.filter(country=>{
                return country.name.toLowerCase().includes(filter.toLowerCase())
            });
        },

        selectCountry(country){
            console.log(country)
            this.countrySelect = country;
        },

        closeModal(){
            this.countrySelect = null;
        }
    },

    mounted(){
        //console.log(this.groupcodes)
    }
}
</script>