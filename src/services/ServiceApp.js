export default class ServiceApp {

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

    getCountriesByCode(data) {
        const Group = [];
        data.map(function(country) {
            if (Group.filter(filter => filter.code == country.alpha3Code).length <= 0) {
                Group.push({ 'code': country.alpha3Code, 'name': country.name })
            }
        })
        return Group;
    }

    getFavoritesCountries() {
        return JSON.parse(localStorage.getItem('favoritesCountries')) || ''
    }

    addFavoriteCountry(country) {
        const currentCountries = this.getFavoritesCountries();
        if (!currentCountries || !currentCountries[country.region]) {
            return localStorage.setItem('favoritesCountries', JSON.stringify({...currentCountries, [country.region]: [country] }))
        }
        const updatedRegion = [...currentCountries[country.region], country]
        return localStorage.setItem('favoritesCountries', JSON.stringify({...currentCountries, [country.region]: updatedRegion }))
    }

    deleteFavoriteCountry(country) {
        const currentCountries = this.getFavoritesCountries()
        if (!currentCountries) return false
        const newCountriesRegion = currentCountries[country.region].filter(co => co.name !== country.name)
        const newContinents = Object.entries({...currentCountries, [country.region]: newCountriesRegion })
        const newContinentsFilter = Object.fromEntries(newContinents.filter(continent => continent[1].length))
        localStorage.setItem('favoritesCountries', JSON.stringify(newContinentsFilter))
    }

    isFavorite(country) {
        const currentCountries = this.getFavoritesCountries()
        if (!currentCountries) return false
        if (!currentCountries[country.region]) return false
        return currentCountries[country.region].some(co => co.name === country.name)
    }

    areThereAnyFavorite() {
        const currentCountries = this.getFavoritesCountries()
        if (!currentCountries) return false
        const objectKeys = Object.keys(currentCountries)
        return objectKeys.some(region => currentCountries[region].length > 0)
    }

    getCountriesFavorite() {
        const currentCountries = Object.entries(this.getFavoritesCountries())
        if (!currentCountries) return false
        let countries = [];
        currentCountries.map(function(cont) {
            cont[1].map(function(country) {
                countries.push(country)
            })
        })
        return countries
    }

    getContinentsFilterFavorite(continents) {
        let FavoritesCountries = Object.entries(this.getFavoritesCountries());
        var newContinents = [];
        continents.map(function(continent) {
            FavoritesCountries.map(function(co) {
                if (co[0].indexOf(continent.name) >= 0 && co[1].length > 0) {
                    newContinents.push(continent)
                }
            })
        })
        return newContinents;
    }

    getCountriesFilterFavorite(data) {
        let countries = data;
        let FavoritesCountries = Object.entries(this.getCountriesFavorite());
        var newCountries = [];
        countries.map(function(country) {
            FavoritesCountries.map(function(co) {
                let countriesFavorites = co[1]
                if (countriesFavorites.name.indexOf(country.name) >= 0) {
                    newCountries.push(country)
                }
            })
        })
        return newCountries;
    }

}