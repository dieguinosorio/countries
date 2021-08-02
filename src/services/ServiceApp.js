export default class ServiceApp {

    testData(dat) {
        console.log(dat)
    }

    getContinents(data) {
        let continents = [];
        if (data) {
            data.map(function(e) {
                if (e.region && continents.filter(cont => cont.name == e.region).length == 0) {
                    continents.push({ 'name': e.region });
                }
            });
        }
        continents = continents.sort(function(a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        })
        return continents;
    }

    getCountriesByContinent(name, data) {
        const dataFilter = data.filter(country => country.region == name);
        const sorted = dataFilter.sort((a, b) => a.name.localeCompare(b.name))
        return sorted;
    }

    getCountriesByCode(data){
        const Group = [];
        data.map(function(country){
            if(Group.filter(filter => filter.code == country.alpha3Code).length <=0){
                Group.push({'code': country.alpha3Code, 'name':country.name})
            }
        })
        return Group;
    }

    getFavoritesCountries(){
        return JSON.parse(localStorage.getItem('favoritesCountries')) || ''
    }

    addFavoriteCountry(country){
        const currentCountries = this.getFavoritesCountries();
        if (!currentCountries || !currentCountries[country.region]){
            return localStorage.setItem('favoritesCountries', JSON.stringify({ ...currentCountries, [country.region]: [country] }))
        }
        const updatedRegion = [...currentCountries[country.region], country]
        return localStorage.setItem('favoritesCountries', JSON.stringify({ ...currentCountries, [country.region]: updatedRegion }))
    }

    deleteFavoriteCountry(country){
        const currentCountries = this.getFavoritesCountries()
        if (!currentCountries) return false
        const newCountriesRegion = currentCountries[country.region].filter(co => co.name !== country.name)
        localStorage.setItem('favoritesCountries', JSON.stringify({ ...currentCountries, [country.region]: newCountriesRegion }))
    }

    isFavorite(country){
        const currentCountries = this.getFavoritesCountries()
        if (!currentCountries) return false
        if (!currentCountries[country.region]) return false
        return currentCountries[country.region].some(co => co.name === country.name)
    }

    areThereAnyFavorite(){
        const currentCountries = this.getFavoritesCountries()
        if (!currentCountries) return false
        const objectKeys = Object.keys(currentCountries)
        return objectKeys.some(region => currentCountries[region].length > 0)
    }

    getCountriesFavorite(){
        const currentCountries = Object.entries(this.getFavoritesCountries())
        if (!currentCountries) return false
        let countries = [];
        currentCountries.map(function(cont){
            cont[1].map(function(country){
                countries.push(country)
            })
        })
        return countries
    }
    /* addFavoriteCountry() {
        const currentCountries = this.getFavoritesCountries()
        if (!currentCountries){
            return localStorage.setItem('favoritesCountries', JSON.stringify({ ...currentCountries, [country.region]: [country] }))
        }
        const updatedRegion = [...currentCountries[country.region], country]
        return localStorage.setItem('favoritesCountries', JSON.stringify({ ...currentCountries, [country.region]: updatedRegion }))
    }
    
    /*deleteFavoriteCountry(country){
        const currentCountries = getFavoritesCountries()
        if (!currentCountries) return false
        const newCountriesRegion = currentCountries[country.region].filter(co => co.name !== country.name)
        localStorage.setItem('favoritesCountries', JSON.stringify({ ...currentCountries, [country.region]: newCountriesRegion }))
    }
    
    isFavorite(country){
        const currentCountries = getFavoritesCountries()
        if (!currentCountries) return false
        if (!currentCountries[country.region]) return false
        return currentCountries[country.region].some(co => co.name === country.name)
    }
    
    hasCountryFavorites(region){
        const currentCountries = getFavoritesCountries()
        if (!currentCountries) return false
        if (!currentCountries[region]) return false
        return currentCountries[region].length
    }
    
    areThereAnyFavorite(){
        const currentCountries = getFavoritesCountries()
        if (!currentCountries) return false // to validate when we have not yet added favorites.
        const objectKeys = Object.keys(currentCountries)
        return objectKeys.some(region => currentCountries[region].length > 0)
    }*/


}