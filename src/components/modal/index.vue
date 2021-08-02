<template>
    <div className="container-modal-background" >
      <div className="container-modal">
        <div className="container-modal-info">
          <div className="container-modal-close">
            <img src={Close} alt="close-modal" className="img-close" onClick={closeModal}/>
          </div>
          <div className="container-modal-description">
            <div className="name-country">
              <h2>{country.name}</h2>
              <span className="icon-favorite" onClick={addDeleteFavorite}>
                <img src={countryFavorite ? Favorite : Unfavorite} alt="Favorite" />
              </span>
            </div>
            <ul>
              <li><b className="info-key">Region:</b> {country.region}</li>
              <li><b className="info-key">Population:</b> {country.population}</li>
              <li><b className="info-key">Currency:</b> {getStringNames(country.currencies)}</li>
              <li><b className="info-key">Language:</b> {getStringNames(country.languages)}</li>
              <li><b className="info-key">Border Countries:</b> {getBordersName(country.borders)} </li>
              <li>
                <b className="info-key">Flag:</b><br/>
                <img src={country.flag} alt={country.name} className="country-info-flag" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    
}
</script>