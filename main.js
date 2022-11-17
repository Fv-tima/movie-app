const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fdb85c2b4a94a30bb203bf0442bd8d42";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=fdb85c2b4a94a30bb203bf0442bd8d42&query=";

const main = document.getElementById("main");
const search = document.getElementById("search");
const form = document.getElementById("form");
const loader = document.querySelector(".loader");
function showLoader() {
  loader.classList.add("show");
}
function hideLoader() {
  loader.classList.remove("show");
}

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  showLoader();
  const data = await res.json();
  setTimeout(() => {
    hideLoader();
  },2000);
  
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
     <a href="https://www.themoviedb.org/movie/${id}">  <img src="${
      IMG_PATH + poster_path
    }" class="movie-img" alt="${title}"> </a>
       
        <div class = 'movie-info'>
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        
        <h3>Overview</h3>
        ${overview}
        </div>
        `;
    main.appendChild(movieEl);
  });
}
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
