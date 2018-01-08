const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
      cities = [],
      searchInput = document.querySelector('.search'),
      suggestions = document.querySelector('.suggestions');

fetch(endpoint)
  .then(fetched => fetched.json())
  .then(data => {
    console.log(data);
    cities.push(...data);
  });

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithSapces(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function displayMatches() {
  const matchArr = findMatches(this.value, cities);
  const html = matchArr.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name"><a class="map-link" href="http://www.google.com/maps/place/${place.latitude},${place.longitude}" target="_blank">${cityName}, ${stateName}</a></span>
        <span class="population">${numberWithSapces(place.population)}</span>
      </li>
    `;
  }).join('');

  suggestions.innerHTML = html;
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
