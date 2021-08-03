<template v-if="countries.length > 0 ">
    <h3 class="name-continent" v-if="countries.length > 0 "  v-text="nameContinent"></h3>
    <div class="content-country" v-for="(country,index) in countries" :key="index" @click.prevent="selectCountry(country)">
        <div class="country-flag">
            <div><img :src="country['flag']" :alt="country['name']"></div>
        </div>
        <div class="country-name">
            <span v-text="country['name']"></span>
            <span class="list-icon-favorite" v-if="fillFavorites"><img src='./img/favorite.png' alt="favorite" /> </span>
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
    props: ['filter','continent','data','groupcodes','nameContinent'],
    data(){
        return{
            countries:restServiceApp.getCountriesByContinent(this.continent,this.data),
            backCountries:[],
            countrySelect:null,
            serviceApp:restServiceApp,
            fillFavorites:false,
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
            this.fillFavorites = filSelect =='Favorites' ? true :false
            console.log(this.fillFavorites);
            if(filSelect && filSelect == 'Favorites'){
                if(restServiceApp.areThereAnyFavorite()){
                    if(restServiceApp.areThereAnyFavorite()){
                        let favoritCountries = restServiceApp.getCountriesFilterFavorite(me.data);
                        favoritCountries.length > 0 ? searchCountry = favoritCountries: '';
                    }
                    if(filText){
                        searchCountry = searchCountry?.filter(country => country.name.toLowerCase().includes(filText.toLowerCase()) || country.name.toLowerCase() === filText.toLowerCase());
                    }
                    
                    if(searchCountry && searchCountry.length > 0){
                        me.backCountries = me.countries;
                        me.countries = restServiceApp.getCountriesByContinent(this.continent,searchCountry);
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
            this.filterList(this.filter);
        }
    },

    mounted(){
        //console.log(this.groupcodes)
    }
}
</script>