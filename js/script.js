//Fetch Meal Data From API
const loadMeal = async (searchValue) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
    const response = await fetch(url);
    const meals = await response.json();
    displayMeals(meals.meals);
}

loadMeal('');


//Write a function for display meal data which got from 'loadMeal' function.
const displayMeals = (meals) => {
    const mealCardParent = document.getElementById('parent-meal-view');
    mealCardParent.innerHTML = ''; //Clear card Field after new search
    meals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('col');
        mealCard.innerHTML = `
        <div class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
        </div>
        <button onclick="details(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetailsModal">
            View Meal Details
        </button>
    </div>`;
    mealCardParent.appendChild(mealCard);
    })
}


//Added Search Input And Button And Call 'loadMeal' Function using Search Button
document.getElementById('search-btn').addEventListener('click', function(){
    const getSearchFeildValue = document.getElementById('search-input');
    searchValue = getSearchFeildValue.value;
    loadMeal(searchValue);
    getSearchFeildValue.value = ''; //Clear Search Field after press this button
})

//Write this function for fetch Data using Meal ID from modal button click
const details = async (mealID) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    const meal = await response.json();
    displaySingleMealDetails(meal.meals[0]);
}

//Write This function for display single meal details on modal.
const displaySingleMealDetails = (meal) => {
    const modalParent = document.getElementById('modal-parent');
    modalParent.innerHTML = '';
    const newModalDiv = document.createElement('div');
    newModalDiv.classList.add('modal-content');
    newModalDiv.innerHTML = `
    <div class="modal-header">
        <h5 class="modal-title" id="mealDetailsModalTitle">${meal.strMeal}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <img src="${meal.strMealThumb}" width="300">
        <hr>
        <p>Category: ${meal.strCategory}</p>
        <hr>
        <p>Area: ${meal.strArea}</p>
        <hr>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>`;
modalParent.appendChild(newModalDiv);
}