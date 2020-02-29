const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');


function searchMeal(e) {
    e.preventDefault();

    single_mealEl.innerHTML = '';

    const keyword = search.value;

    if(keyword.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
        .then(res => res.json())
        .then(data => {
            console.log('meals',data);
            resultHeading.innerHTML = `<h2>Search results for '${keyword}':</h2>`;

            if(data.meals === null) {
                resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`
                mealsEl.innerHTML = '';
            } else {
                mealsEl.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                    </div>
                `)
                .join('');
            }
        });

        search.value = '';
    } else {
        alert('Please enter a keyword');
    }
}

submit.addEventListener('submit', searchMeal);

function getRandomMeal() {
    mealsEl.innerHTML = '';
    resultHeading.innerHTML ='';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        addMealToDOM(meal);
    });
}

random.addEventListener('click', getRandomMeal);

function addMealToDOM(meal) {
    const ingredients = [];

    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} : ${meal[`strMeasure${i}`]}`
            );
        } else {
            break;
        }
    }

    single_mealEl.innerHTML = `
        <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
            ${ingredients.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        </div>
    `;
}

function getMealByID(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        addMealToDOM(meal);
    });
}

function getClickedMeal(e) {
    const mealInfo = e.composedPath().find(item => {
        if(item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });

    console.log('mealinfo div',mealInfo);

    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        getMealByID(mealID);
    }
}

mealsEl.addEventListener('click', getClickedMeal);