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


}