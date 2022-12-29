//selectors
const searchForm  = document.querySelector('.Input-Section');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
const ViewRecipe = document.querySelector('.view-button');
const favButton = document.querySelector('.fav-button');
const FaovouritesButton = document.querySelector('#Favourites');
const HomePageBtn = document.querySelector('#Home-Page');
let favText="♡";


const Recipebox = document.querySelector('.Recipe-box');

//event Listeners

HomePageBtn.addEventListener('click',()=>{
  window.location.href = "./index.html";
})

FaovouritesButton.addEventListener('click',()=>{
  window.location.href = "./favourites.html";
});

searchForm.addEventListener('submit',(e) => {
    let searchQuery='';
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI(searchQuery);
});



// functions
async function fetchAPI (query){
    console.log(query);
    const baseURL=`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
    const result = await fetch(baseURL);
    const data2 = await result.json();
    console.log(data2);
    generateHTML(data2.meals);
}


function generateHTML(results){
    console.log(results); 
    let generatedHTML = '';
    if(results){
      results.map(result => {
        generatedHTML +=
        `<div class="item">
           <img src="${result.strMealThumb}" alt="">
           <div class="flex-container">
             <h1 class="title">${result.strMeal}</h1>
             <div class="buttons">
               <a href = "javascript:void(0)" class="view-button" onclick= "fetchById(${result.idMeal})" data-id =${result.idMeal} starget="_blank">view Recipe</a>
               <a class="fav-button" onclick = addToFavourites(${result.idMeal}) fav-data-id = ${result.idMeal}>${favText}</a>
             </div>  
           </div>
         </div>
         `
      });
    }
    else{
        generatedHTML +=
        `<div>
           <h2> "Sorry No results were found"</h2>
         </div>
        `
    }
    searchResultDiv.innerHTML = generatedHTML;

}

const fetchById = (id) => {
    url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("NETWORK RESPONSE ERROR");
        }
      })
      .then((data) => {
        obj = data;
        addToLocalStorage(obj);
      })
      .catch((error) => {
        console.error("FETCH ERROR:", error);
      });
  };
  
//setting it to local storage to access it from the details page  
function addToLocalStorage(obj) {
    const a = obj.meals;
    localStorage.setItem("mealsDesc", JSON.stringify(a[0]));
    window.location.href = "./meal.html";
}



// Adding favourites to local storage
const favouritesArray = [];
const addToFavourites = (id) =>{
  favBtn = document.querySelector('[fav-data-id = "' + id + '"]');
  favText="♥"
  favBtn.innerHTML= favText;
  url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("NETWORK RESPONSE ERROR");
        }
      })
      .then((data) => {
        obj = data;
        addTofavArray(obj,id);
      })
      .catch((error) => {
        console.error("FETCH ERROR:", error);
      });
}   

function addTofavArray(obj,id){
  const { meals } = obj;
  let isPresent = -1;
  for (elem of meals) {
    if (elem["idMeal"] == id) {
      const favourites = getFavourites();
      favourites.forEach((e) => {
        // console.log(e);
        if (e["idMeal"] == id) {
          isPresent = 0;
        }
      });
      console.log(favourites);
      if (isPresent == -1) {
        favouritesArray.push(elem);
        localStorage.setItem("fav_Array", JSON.stringify(favouritesArray));
      } else {
        deletefromStorage(id);
      }
    }
    }
}

// Taking intake of 
function getFavourites() {
  let favourites = [];
  const isPresent = localStorage.getItem("fav_Array");
  if (isPresent) {
    favourites = JSON.parse(isPresent);
  }
  return favourites;
}

function deletefromStorage(id) {
  const favourites = getFavourites();
  console.log('hello');
  console.log(favourites);
  res = 0;
  favourites.forEach((elem) => {
    if (elem["idMeal"] == id) {
      res = favourites.indexOf(elem);
    }
  });

  if (res != -1) {
    favBtn = document.querySelector('[fav-data-id = "' + id + '"]');
    favBtn.innerText = "♡";
    favourites.splice(res, 1);
    localStorage.setItem("fav_Array", JSON.stringify(favourites));
  }
}