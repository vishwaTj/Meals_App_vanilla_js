const ItemImage=document.querySelector('.item');
const Title=document.querySelector('.title');
const searchResultDiv = document.querySelector('.search-result');
const favButton = document.querySelector('.fav-button');
const FaovouritesButton = document.querySelector('#Favourites');
const HomePageBtn = document.querySelector('#Home-Page');

//event Listeners
if(HomePageBtn){
HomePageBtn.addEventListener('click',()=>{
  window.location.href = "./index.html";
})
}

FaovouritesButton.addEventListener('click',()=>{
  window.location.href = "./favourites.html";
});

const mealdesc = localStorage.getItem("fav_Array");
const mealDescription = JSON.parse(mealdesc);

let HTMLContent='';
let favIcon="♥";
if(mealDescription.length!=0){
  mealDescription.map(result => {
     console.log(result);
     HTMLContent +=
       `<div id=${result.idMeal} class="item">
         <img src="${result.strMealThumb}" alt="">
         <div class="flex-container">
          <h1 class="title">${result.strMeal}</h1>
          <div class="buttons">
            <a href = "javascript:void(0)" class="view-button" onclick= "fetchById(${result.idMeal})" data-id =${result.idMeal} starget="_blank">view Recipe</a>
            <a class="fav-button"  onclick = deletefromStorage(${result.idMeal}) fav-data-id = ${result.idMeal}>${favIcon}</a>
          </div>  
         </div>
        </div>
       `});
  searchResultDiv.innerHTML = HTMLContent;

  function getFavourites() {
    let favourites = [];
    const isPresent = localStorage.getItem("fav_Array");
    if (isPresent) {
      favourites = JSON.parse(isPresent);
    }
    return favourites;
  }

  function deletefromStorage(id) {
    const ItemImage=document.querySelector('[id = "' + id + '"]');
    const favourites = getFavourites();
    console.log(favourites);
    res = 0;
    console.log(ItemImage);
    ItemImage.classList.add("Drop-item");
    favourites.forEach((elem) => {
      if (elem["idMeal"] == id) {
        res = favourites.indexOf(elem);
      }
    });
   if (res != -1) {
      favBtn = document.querySelector('[fav-data-id = "' + id + '"]');
      favourites.splice(res, 1);
      localStorage.setItem("fav_Array", JSON.stringify(favourites));
    }
    ItemImage.addEventListener("transitionend", function () {
      location.reload();
    });
    }
}
  else{
    HTMLContent+=`
       <div class="NoItems">
           <h2> You dont have any Favourites, Go back and make up your mind !!! </h2>
           <div> 
            <img src="./choosing-transformed.jpeg"></img>
           </div>
      </div>
    
    `
    searchResultDiv.innerHTML = HTMLContent;
}