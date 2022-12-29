# Meals_App_vanilla_js
Meals App using vanilla JS and pulled data from an online API

There are 3 html pages each for main page, favourite page and meal details page
index.html ---- style.css ----- App.js

index.html
html page contains code for navigation bar and search bar in body

style.css
consists of style for navigation bar
code for the updated Recipes has been arranged in a grid

App.js
code is divided into slectors,eventlisteners and functions

fetchAPI -- to fetch data from API
generateHTML --- to generate the recipe cards for the grid

fetchMealById -- fetch meal data from a card when you click on more details and store in local storage to access it in details page

addToLocalStorage -- store the meals by ID  an array

addToFavourites -- Create favourites array and also create new favourite array in local storage to access in favourites array
   { includes fetching the fav array and also delete from favourite array from local storage functions called from within }
   
details.html
html page contains code for navigation bar and Instructions for recipe and also image

Meal_style.css
contains style to navigation bar and also the middle content

Meal_item.js
fetch data from local storage and edit the html data of the page

favourites.html
used the same navigation bar template and declare all html for filing page with cards

Fav_styles.css
style the navigationbar and create style for page with no favourites and and style for page with favourite cards








