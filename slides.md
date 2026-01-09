---
theme: seriph

background: https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2

class: "text-center"
highlighter: shiki
lineNumbers: false
info: |
  ## JavaScript course
  Starter course for JavaScript

  Exercises
drawings:
  persist: false
favicon: '/favicon.ico'
css: unocss
---

# Interactive webapps

## A guide to JavaScript

<p class="color-stone-400">Exercises</p>

---

# Exercise: Cinema

- Open the [start project](/cinema/SetupCinema.zip)
- Run `npm install` in the root of the project
- Run `npm run start` in the root of the project to spin up the server
- The html, css is already written for this project
- Complete the index.js and movie.js files to create a functioning app


---

# Overview of the app

- The app loads in all the movies from a remote server
- Displays the movies on the screen
- When clicked on a movie the details of that movie are show in a separate screen
- Th user can like a movie, the liked movies are stored in local storage

---

# Cinema: Part 1, Show the movies to the user

- Create a new function: `addMovieToDOM`, this function gets 1 movie object as argument
- The function will create all the elements that are required to display a movie
- Then it adds the data from the movie object in the corresponding elements
- It puts the elements together and finally shows in in the dom by adding it to the element with id: `list`
- The html of 1 movie should look like this:

```html
<a href="/movie?movieId=87849b25-febf-4086-9616-9a332c18afc8">
  <div class="movieBox">
    <img src="https://m.media-amazon.com/images/M/MV5BMjYzZTBhYjktZTRhOC00ZDBkLTg4Y2MtZmIwMGQwZTNiMmM1XkEyXkFqcGdeQXVyNjM0MTI4Mw@@._V1_FMjpg_UX1125_.jpg">
    <div>
      <p>Avatar</p>
    </div>
  </div>
</a>
```
--- 

# Cinema: Part 1.1, Show the movies to the user

- Make sure you create all 5 elements and append them in the right order
- Don't forget to add the right class name, link, movie title and image src  
- Call the `addMovieToDOM` function in the `onResponse` function for every movie in the list
- Save the response of the movies in a global variable 

[Solution - index.js](/cinema/part1.js)

---

# Cinema: Part 2, Get the movie in the detail page

- Get the movieId as a variable out of the search params of the link
- Have the object of the movie with that id as a variable in the `onResponse` function

[Solution - movie.js](/cinema/part2.js)

---

# Cinema: Part 3, Show the movie details

- Update the following elements with there corresponding content from the movie object:
  - image (poster)
  - movieTitle
  - movieRuntime
  - movieRoom (Make sure you add the text `Room: ` before the room number, do this in js)
  - moviePlot
  - movieWriter
  - movieDirector
  - movieActors (Make sure the the actors are separated by an `-`, Example: `Sam Worthington - Zoe Saldana - Sigourney Weaver - Stephen Lang`)

[Solution - movie.js](/cinema/part4.js)

---

# Cinema: Part 4, Show the genres and images of the movie

- Create for all the genres in the list a `p` element with the className: `movieGenreItem`
- Add all the elements to the `genreList` element
- Create a `src` element for all the images with the correct link
- Add the images to the `imagesList` element

[Solution - movie.js](/cinema/part4.js)

---


# Cinema: Part 5, Liking a movie

- Create a function: `setLikedIcon` this function gets the parameter `isLiked`
  - Based on this parameter the className of the `movieLikeIcon` will be updated
  - When `isLiked` is true the className should be `fa-solid fa-heart` else `fa-regular fa-heart`
- Create a function: `setIsMovieLikedForId` this function get the parameters `movieId` and `isLiked`
  - Save the liked state in localStorage by having a list of id's from the liked movies
  - This function should add or remove the `movieId` based on `isLiked`
- Create a function: `getMovieIsLikedForId` with parameter `movieId`
  - This functions returns a boolean based on if the `movieId` was in localStorage
- When the page loads in the correct functions should be called to show the icon in the correct state
- When the icon button is clicked the state should be updated using these functions

[Solution - movie.js](/cinema/part5.js)

---

# Cinema: Part 6, Add go back button

- When the back button is clicked, the browser should go to the previous page

[Solution - movie.js](/cinema/part6.js)

---

# Cinema: Part 7, Show liked icon in movie overview

- Copy the `getMovieIsLikedForId` from the `movie.js` to the `index.js` file
- Create a function: `getHeartIcon` with parameter movieId
- This function calls the `getMovieIsLikedForId` function to get the state
- It creates an `i` element with the className `fa-solid fa-heart` or `fa-regular fa-heart` based on the state from localStorage. Return this element form the function
- Call the `getHeartIcon` function in the `addMovieToDOM` function so the `i` element can be added to the DOM like this:
```html
<div class="movieBox">
  <img src="https://m.media-amazon.com/images/M/MV5BMjYzZTBhYjktZTRhOC00ZDBkLTg4Y2MtZmIwMGQwZTNiMmM1XkEyXkFqcGdeQXVyNjM0MTI4Mw@@._V1_FMjpg_UX1125_.jpg">
  <div>
    <p>Avatar</p>
    <i class="fa-regular fa-heart"></i>
  </div>
</div>
```

[Solution - index.js](/cinema/part7.js)

---

# Cinema: Part 8, Search for movies

- Save the search in put in a global variable
- When a user clicks on the search button:
  - The movies should be filtered based on if the title contains the search input
  - The search should not be case sensitive
  - The search input should be cleared
  - Only the filtered movies should be shown to the user

[Solution - index.js](/cinema/part8.js)

---

# Cinema: Part 9, Show today movies

- When a user clicks on the movies today button:
- Only the movies with the property `PlaysToday` true should be shown to the user

[Solution - index.js](/cinema/part9.js)

---

# Cinema: Part 10, Sort alphabetically

- When a user clicks on the sort alphabetically button:
- All the movies should be shown in alphabetic order based on there title

[Solution - index.js](/cinema/part10.js)

---

# Cinema: Part 11, Click like in overview

- Expand the `getHeartIcon` function
- The `i` element should be wrapped in a `button element`
- Add an event listener to the button
- When the button is clicked the className should change
- Update the state in localStorage with the `setIsMovieLikedForId` copied from `movie.js`


[Solution - index.js](/cinema/part11.js)

Tip - Use preventDefault to make sure the browser doesn't navigate to the detail page when you click the like icon

---

# Exercise: Dices

- Open the [start project](/dices/SetupDices.zip)
- Run `npm install` in the root of the project
- Run `npm run start` in the root of the project to spin up the server
- The html, css is already written for this project
- Complete the index.js file to make it a functioning app

---

# Overview of the app

- User can click a button to roll the dices and get a random number
- The history of all the rolls is saved and shown
- Users can be added to the game
- Every time someone rolls, the next player will be set as active player

---

# Dices: Part 1, Show random dices

- Create a function: `getRandomRoll`, that return a random number from 1 to 6
- Create a function: `rollDice`
- This function gets a random number for the 2 dices and calculates the total
- It shows these values on the screen in the corresponding boxes
- Call `rollDice` when the roll button is pressed

[Solution](/dices/part1.js)

---

# Dices: Part 2, History of the rolls

- Create a function: `addResult` with result as an input
- This function creates a `p` element with the result in it and adds it to the results list element
- Create a function: `saveResult` with result as an input
- This saves the result in localStorage
- All results in localStorage are divided by a comma. Make sure this also works when localStorage is empty
- Call these function after the `rollDice` function and pass the result along
- Create a function `loadSavedResults` that is called when the page is loaded
- This functions gets the array of results from localStorage and uses `addResult` to show them to the user

[Solution](/dices/part2.js)

---

# Dices: Part3, Add names

- Create a function: `getStoredNames`
- This function gets all the names from localStorage divided by a comma and returns it as an array
- When localStorage is empty it should return an empty array
- Create a function: `onAddName` that is called when the add button is clicked
- It reads the name from the input and clears the input
- Get the other names with the `getStoredNames` function
- Add the new name to the list and save it in localStorage
- Show the names of the players in the playersText element add `Players: ` before the names and show them separated with a comma
- Create a function `loadSavedNames` that is called when the page is loaded
- This function gets the names from localStorage and displays them to the user like described above
- When there are no names the text `Add players` should be shown instead

[Solution](/dices/part3.js)

---

# Dices: Part4, Show current player

- Create a function: `showNextPlayer`
- Get the index of the current player from local storage, when there is non use 0
- Increase the index, make sure it goes back to 0 at the end
- Save this new index in localStorage
- Show the name of the player corresponding to the index
- This function should be called when the roll button is pressed
- Expand the `loadSavedNames` function to set the current player as well

[Solution](/dices/part4.js)

---

# Dices: Part5, Reset 

- Create a function: `onReset` that is called when the reset button is clicked
- This function clears all text
- Clears localStorage
- Show the text `Add players`

[Solution](/dices/part5.js)

---

# Dices: Part6, Animate rolling 

- This is a difficult question, makes use of promises
- Create a function: `showRollingDice` that is called first when the roll button is clicked
  - This calls 50 times `rollDice` to create a rolling effect
  - Between every call the function has to wait 
  - The function wait the amount of ms that corresponds with how many times the function has been called
  - The first time it waits 1 ms, the last time 50 ms

---

- Tips:
  - Add `async` to the function to tell js it is an async function (do this for this function and the one that implements it)
  - Don't use `.then` you will find it when searching online for promises, but believe me don't use it here or you will hate your life
  - Put `await` before you call the function
  - use `setTimeout` to wait between the calls, combine this with a promise constructor to create a delay function

[Solution](/dices/part6.js)

---

# Exercise: 

- Open the [start project](/plants/SetupPlants.zip)
- Run `npm install` in the root of the project
- Run `npm run start` in the root of the project to spin up the server
- The html, css is already written for this project
- Complete the index.js and plant.js files to create a functioning app

---

# Overview of the app

- Show an overview of plants
- Like plants, saved in local storage
- Show the details of a plant
- Search for a plant
- Sort plants
- Show liked plants

---

# Plants: Part1, Show plants overview

- Create a function that gets plant as input, this function will add the plant item to the list element
- The element should look like this
```html
<a href="/plant?plantId=77116&slug=quercus-rotundifolia">
  <div class="plantBox">
    <img src="https://d2seqvvyy3b8p2.cloudfront.net/40ab8e7cdddbe3e78a581b84efa4e893.jpg"/>
    <div>
      <p>Evergreen oak</p>
    </div>
  </div>
</a>
```

---

# Plants: Part1, Show plants overview

- Complete the content with the content of the plant
- Make sure to pass in the link to the detail page the id and slug as search params like:   
  `/plant?plantId=<id>&slug=<slug>`

- When the fetch is done, save the list of plants in a global variable and call the function to show all plants on screen

[Solution](/plants/part1.js)

---

# Plants: Part2, Like plants

- Add a heart icon with button to every plant
- The id's of all liked plants should be saved in localStorage
- Create a separate function that creates a button with the correct icon and handles the like, save and show functionality
- Call this function in the plants function to add the button to the UI, the complete UI should look like: 

```html
<a href="/plant?plantId=77116&amp;slug=quercus-rotundifolia">
  <div class="plantBox">
    <img src="https://d2seqvvyy3b8p2.cloudfront.net/40ab8e7cdddbe3e78a581b84efa4e893.jpg"/>
    <div>
      <p>Evergreen oak</p>
      <button>
        <i class="fa-regular fa-heart" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</a>
```

---

# Plants: Part2, Like plants

- The class of the heart icon should be: `fa-regular fa-heart` when it is not liked, when it is liked the class should be: `fa-solid fa-heart`
- Make sure the type of the id you pass to the function is the correct type

[Solution](/plants/part2.js)

---

# Plants: Part3, Search

- When a user clicks the search button:
- The plants that match the search with there name should be shown, this should not be capital sensitive
- The input should be cleared
- When no plants can be found the message should be displayed
- This can be done by changing the display style from `none` to `flex`

[Solution](/plants/part3.js)

---

# Plants: Part4, Show liked and sort

- Implement the like and sort buttons
- When clicked the name should toggle between two names: 
- `Show liked` <=> `Show all`  /  `Sort alphabetically` <=> `Revert sort`
- The state of the buttons should also be stored in js so we know what to change it to
- When no liked plants can be fount, the no items message should be shown as well
- When liked plants are shown, and you unlike a plant it should also be hidden
- Sort toggle between alphabetically sorted and normal order

[Solution](/plants/part4.js)

---

# Plants: Part5, Start detail page

- When clicked on the go back button, the user should go back to the previous page
- When the page loads in, the 2 search params from the url, should be set in these variables: `plantId` and `plantSlug`
- The plantSlug variable will be used in the url to fetch the correct plant
- When the data is loaded a function can be called to fill the following items with data from the call:
  - imageElement - image_url
  - plantTitleElement - common_name
  - plantScienceNameElement - scientific_name
  - plantBibliographyElement - bibliography
  - plantAuthorElement - author
  - plantObservationsElement - observations

[Solution](/plants/part5.js)

---

# Plants: Part6, Synonyms and Sources

- Show the names of all the synonyms on screen
- Every synonym is in it's own p element with className: `plantInfoListItem`
- Add every synonym to the plantSynonymsList

- Show the names of every source on screen
- Every source has it's own element, depending on if it has a url or not it should be `a` or `p`
- Add the url to the a elements so the link will be opened when clicked
- Every item should have the className: `plantInfoListItem`
- Add all sources to the plantSourcesList

[Solution](/plants/part6.js)

--- 

# Plants: Part7, Implement like button

- Implement the like button
- When the page is loaded the correct class should be added to the icon, based on what is in localStorage and the plantId that is passed as a search param
- When the button is clicked the class should be updated correctly as wel as the state in localStorage

[Solution](/plants/part7.js)

--- 

# Plants: Part8, Show detail images

- In the data you will find an object images whish contains keys of different parts of the plant with a list of images of that part
- To go over all keys and get the list of images for that key, you can use the following code:

```js
Object.keys(plant.images).forEach((key) => {
    const images = plant.images[key];
});
```

- In this block key is the name of the part of the plant, and images a list of objects with a link to the image 
- Implement the forEach further so we add a div with className `plantDetailImageWrapper` for every part 
- Add a h2 element to this element with the name of the part. The first letter should be a capital letter
- Underneath that there should be a div with className: `imagesList`
- In this div we can add a img element for every image with the correct link
- Every plantDetailImageWrapper should be added to the plantDetailImagesList

[Solution](/plants/part8.js)

---

# Shoppy: 

- Open the [start project](/store/ShoppySetup.zip)
- Run `npm install` in the root of the project
- Run `npm run start` in the root of the project to spin up the server
- The html, css is already written for this project
- Complete the index.js and plant.js files to create a functioning app

---

# Overview of the app

- Show an overview of products
- Put products in a shopping cart
- Show the details of a product
- Search for a product
- Filter products on category
- Show total price of products in cart

---

# Shoppy: Part1

- Create a function: `showProductInDOM` that gets a product as input
- This function creates the html elements to show the product in the productsList 
- The html should look like this:
```html
<a href="/product?productId=1">
  <div class="productBox">
    <img src="/images/apple.webp">
    <div class="productInfoBox">
      <div class="productTextBox">
        <h3>Apple</h3>
        <p>10each</p>
        <p>€5</p>
      </div>
      <button>
        <i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</a>
```

[Solution](/store/part1.js)

---

# Shoppy: Part2

- Call the `showProductInDOM` function for every product when the fetch is done
- When the cart button is clicked the amount of items in the cart should increase
- This is not visualized, but should be stored in localStorage
- The cart items should be stored as a JSON in localStorage
- Example: 
```json
{
  "1": 2,
  "3": 1,
  "5": 4,
  "10": 1
}
```

[Solution](/store/part2.js)

---
layout: image
image: /store/screenshots/store1.png
backgroundSize: contain
---

---

# Shoppy: Part3

- Implement the search functionality
- When the search button is clicked the products should be filtered based on the search input
- The search should not be case sensitive
- The input should be cleared after the search
- When no products are found the `noItemsFound` element should be shown by changing the display style from `none` to `flex`

[Solution](/store/part3.js)

---
layout: image
image: /store/screenshots/store2.png
backgroundSize: contain
---

---

# Shoppy: Part4

- If the response is received implement the category filter
- Get all the unique categories from the products
- Add these categories as options to the select element with id: `categorySelect`
- Add as first option: value = "" and innerText = "Not selected"
- When a category is selected the products should be filtered on that category
- When the value is "" all products should be shown

[Solution](/store/part4.js)

---
layout: image
image: /store/screenshots/store3.png
backgroundSize: contain
---

---

# Shoppy: Part5

- On the detail page the productId should be retrieved from the url
- Create a function `showProductDetails` that fills in all the details of the product:
  - image: `/images/<imageName>`
  - name
  - productAmount: `${product.amount}${product.unit}`
  - price: productAmount * productPricePerUnit
  - category
  - description
- Create a function `setAmountOfProductInBasket` that retrieves the number of items in the basket from localStorage and also sets it on the screen
- When the response comes in you get the right product from the list, pass that to showProductDetails
- When the back button is clicked the browser should go back 

[Solution](/store/part5.js)

---
layout: image
image: /store/screenshots/store4.png
backgroundSize: contain
---

---

# Shoppy: Part6

- Implement the + and - buttons
- When the plus button is clicked the amount in localStorage should be updated
- Then also call the `setAmountOfProductInBasket` to show the new number
- When the minus button is clicked the amount in localStorage should be updated
- Make sure the number doesn't go below 0
- Then also call the `setAmountOfProductInBasket` to show the new number

[Solution](/store/part6.js)

---

# Shoppy: Part7

- Create a function `updateUI` that clears the screen
- Also creates a list of all items that are in the basket, keep in mind that items with amount 0 should not be shown
- For every product that needs to be shown you call the `addProductToBasketDOM` function
- This function creates the following HTML based on the product to add to the basketItemsList 
```html
<div class="basketItem">
  <div class="basketItemInfo">
    <img src="/images/apple.webp" />
    <h3>Apple</h3>      
  </div>
  <div class="basketItemActions">
    <button><i class="fa-solid fa-minus" aria-hidden="true"></i></button>
    <p>3</p>
    <button><i class="fa-solid fa-plus" aria-hidden="true"></i></button>
  </div>
</div>
```

---

# Shoppy: Part7 part2

- The buttons are implemented by analogy of the product detail page
- After updating an amount the updateUI function is called again to update the screen
- The updateUI is called when the response arrives
- When the back button is clicked the browser should go back to the previous page

[Solution](/store/part7.js)

---
layout: image
image: /store/screenshots/store5.png
backgroundSize: contain
---

---

# Shoppy: Part8

- Show the total amount in the `updateUI` function
- The total amount is calculated per product as follows:
product.pricePerUnit * product.amount * amountInBasket
- Then show the total amount with the text: `Total: €<totalAmount>`
- When the clear button is clicked localStorage should be cleared and the `updateUI` function called again

[Solution](/store/part8.js)