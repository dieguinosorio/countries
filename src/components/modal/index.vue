<template>
    <div class="container-modal-background" >
      <div class="container-modal">
        <div class="container-modal-info">
          <div class="container-modal-close"  v-on:click="closeModal()">
            <img src="./img/close.png"  alt="close-modal" class="img-close" />
          </div>
          <div class="container-modal-description">
            <div class="name-country">
              <h2>{{country.name}}</h2>
              <span class="icon-favorite">
                <img src="./img/favorite.png"  alt="Favorite" v-if="isFavorite" @click.prevent="serviceApp.deleteFavoriteCountry(country),validFavorite()"/>
                <img src="./img/unfavorite.png"  alt="Favorite" v-else @click.prevent="serviceApp.addFavoriteCountry(country),validFavorite()"/>
              </span>
            </div>
            <ul>
              <li><b class="info-key">Region:</b> {{country.region}}</li>
              <li><b class="info-key">Population:</b> {{country.population}}</li>
              <li><b class="info-key">Currency:</b> {{getStringByNames(country.currencies)}}</li>
              <li><b class="info-key">Language:</b> {{getStringByNames(country.languages)}}</li>
              <li><b class="info-key">Border Countries:</b> {{getBodersCountries(country)}} </li>
              <li>
                <b class="info-key">Flag:</b><br/>
                <img :src="country.flag" :alt="country.name" class="country-info-flag" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import './styles.css';
import ServiceApp from '../../services/ServiceApp';
const restServiceApp = new ServiceApp();
export default {
  props:['countrySelect','groupcode'],
  emits:['closemodal','delfavorite'],
  data(){
      return{
        country:this.countrySelect,
        serviceApp:restServiceApp,
        isFavorite:restServiceApp.isFavorite(this.countrySelect),
      }
  },

  watch:{

  },

  methods:{
    getStringByNames(array){
      const namesArray = array.map ( info => info.name );
      const stringNames = namesArray.join(", ");
      return stringNames;
    },

    validFavorite(){
      this.isFavorite= restServiceApp.isFavorite(this.countrySelect);
      this.$emit('delfavorite') 
    },


    getBodersCountries(country){
      let me =this;
      let filterBorders = country.borders?.map((e)=>{
        let filter = (me.groupcode.filter(cod => cod.code.toLowerCase() === e.toLowerCase()));
        return filter[0].name;
      });
      return filterBorders.join(", ");
    },

    closeModal(){
      this.$emit('closemodal');
    }
  },
  mounted(){
    
  }
}
</script>