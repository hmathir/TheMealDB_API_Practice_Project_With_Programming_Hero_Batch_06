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