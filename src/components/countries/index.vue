<template>
    <div class="header">
        <h1>prueba</h1>
    </div>
</template>
<script>
import axios from 'axios'; 
export default {
    data(){
        return{
            paises:[],
            continents:[],
        }
    },

    methods:{
        getPaises(){
            let me = this;
            let url ="https://restcountries.eu/rest/v2/all";
            axios.get(url).then(response=>{
                response.data.map(function(e){
                    me.paises.push(e);
                    if(me.continents.indexOf(e.region) < 0){
                        me.continents.push(e.region);
                        console.log(e.region)
                    }
                })
            })
        },
    },

    mounted(){
        this.getPaises();
    }
}
</script>