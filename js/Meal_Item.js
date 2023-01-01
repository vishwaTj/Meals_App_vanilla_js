// Creating buttons for all Tags from Meals item page
const MealTitle = document.getElementById("meal-Title");
const Ingridients = document.querySelector('.ingridients');
const MealImage = document.querySelector('.meal-image');
const FaovouritesButton = document.querySelector('#Favourites');
const HomePageBtn = document.querySelector('#Home-Page');


//event Listeners

HomePageBtn.addEventListener('click',()=>{
  window.location.href = "./index.html";
})

FaovouritesButton.addEventListener('click',()=>{
  window.location.href = "./favourites.html";
});

// fetching data from loca storage
const mealdesc = localStorage.getItem("mealsDesc");
const mealDescription = JSON.parse(mealdesc);

// Assigning the values to Tags
MealTitle.innerHTML = `<h1>${mealDescription.strMeal}</h1>`
Ingridients.innerHTML = `<h4>Instructions</h4>
                        <p>${mealDescription.strInstructions}
                        </p>`
MealImage.innerHTML = `<img src=${mealDescription.strMealThumb} alt="Image not available">`

console.log(mealDescription);