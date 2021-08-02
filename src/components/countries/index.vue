<template>
    <div class="content-country" v-for="(country,index) in countries" :key="index">
        <div class="country-flag">
            <div><img :src="country['flag']" :alt="country['name']"></div>
        </div>
        <div class="country-name">
            <span v-text="country['name']"></span>
        </div>
    </div>   
</template>
<script>
import './styles.css';
import ServiceApp from '../../services/ServiceApp';
const restServiceApp = new ServiceApp();
export default {
    props: ['filter','continent','data'],
    data(){
        return{
            countries:restServiceApp.getCountriesByContinent(this.continent,this.data),
            backCountries:[]
        }
    },

    watch:{
        filter(){
            console.log("Desde countryes",this.filter)
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
            if(filText || filSelect){
                let searchCountry = this.countries?.filter(country => country.name.toLowerCase().includes(filText.toLowerCase()) || country.name.toLowerCase() === filText.toLowerCase());
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
        }
    },

    mounted(){

    }
}
</script>