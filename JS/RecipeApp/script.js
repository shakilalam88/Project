const searchBox = document.querySelector('.search-box')
const searchBtn = document.querySelector('.search-btn')
const recipeContainer = document.querySelector('.recipe-container')
const recipeDetailsContent = document.querySelector('.recipe-details-content')
const recipeCloseBtn = document.querySelector('.recipe-close-Btn')

const fetchRecipes = async (searchText) => {
  recipeContainer.innerHTML = 'Loading...'
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
  )
  const data = await resp.json()
  //   console.log(data)
  recipeContainer.innerHTML = ''
  data.meals.map((meal) => {
    console.log(meal)
    const recipeDiv = document.createElement('div')
    recipeDiv.id = `${meal.idMeal}'`
    recipeDiv.classList.add('recipe')
    recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" >
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>${meal.strCategory}</p>
    `
    const button = document.createElement('button')
    button.textContent = 'View Recipe'
    recipeDiv.appendChild(button)
    // adding eventListener for popup recipe
    button.addEventListener('click', () => {
      openRecipePopup(meal)
    })
    recipeContainer.appendChild(recipeDiv)
  })
}

// recipe details
const openRecipePopup = (meal) => {
  //   console.log(meal)
  recipeDetailsContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul>${fetchIngredients(meal)}</ul>
        <div>
        <h3>Instructions: </h3>
        <p>${meal.strInstructions}</p>
        </div>
  `
  recipeDetailsContent.parentElement.style.display = 'block'
}

const fetchIngredients = (meal) => {
  let ingredientList = ''
  console.log(meal)
  for (let i = 1; i <= 20; i++) {
    let ingredients = meal[`strIngredient${i}`]
    console.log('ingredients', ingredients)
    if (ingredients) {
      let measure = meal[`strMeasure${i}`]
      ingredientList += `<li>${ingredients}--${measure}</li>`
    } else {
      break
    }
  }
  return ingredientList
}

recipeCloseBtn.addEventListener('click', () => {
  recipeDetailsContent.parentElement.style.display = 'none'
})
searchBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const searchInput = searchBox.value.trim()
  //   console.log(searchInput)
  fetchRecipes(searchInput)
  searchBox.value = ''
})

// https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
