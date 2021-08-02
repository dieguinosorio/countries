<template>
<div class="content-continents">
    <div class="container-continent" v-for="(continent,index) in continents" :key="index">
        <h3 class="name-continent" v-text="continent?.name"></h3>
        <countries :continent="continent.name" :data="data" :filter="filter"></countries>
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
                me.$emit('continents',me.continents);
            }).catch(error=>{
                console.log(error)
            })
        },

        filterContinentByCountry(search){
            let filText = search.text;
            let filSelect = search.select;
            if(filText || filSelect){
                let searchCont = this.continents?.filter(continent => continent.name.toLowerCase().includes(filText.toLowerCase()));
                if(searchCont && searchCont.length > 0){
                    this.continents =  searchCont;
                }
                else{
                    let filterData = this.data?.filter(country => country.name.toLowerCase().includes(filText.toLowerCase()));
                    let hidrateCont = restServiceApp.getContinents(filterData);
                    if(hidrateCont.length != this.continents.length ){
                        this.continents = hidrateCont;
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