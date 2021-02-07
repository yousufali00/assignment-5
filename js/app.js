
const userInput = document.getElementById('search-input');

document.getElementById('search-btn').addEventListener('click', ()=>{
    const foodName = userInput.value;
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + foodName;
    fetchData(apiUrl);

    userInput.value = "";
} )

const fetchData = (apiUrl) => {
    fetch( apiUrl )
    .then( response => response.json() )
    .then( data => {
        
        const foodData = data.meals;
        foodData.forEach(element => {
            const foodId = element.idMeal
            const foodName = element.strMeal;
            const foodImage = element.strMealThumb;
            const foodTemplate = `    
                <div id="${foodId}" class="card text-center" >
                    <img src="${foodImage}" class="card-img-top w-100 img-fluid" alt="...">
                    <div class="card-body">
                    <h3 class="card-title"> ${foodName} </h3>
                    </div>
                </div>
            `
            const parentDiv = document.getElementById('food-parent');
            const foodElement = document.createElement('div');
            foodElement.className = 'col-lg-3';
            foodElement.innerHTML = foodTemplate;
            parentDiv.appendChild(foodElement);
        });

    } )
    
}

const foodItemSelect = document.getElementById('food-parent');
foodItemSelect.addEventListener( 'click', (event) =>{
    
    showData()

} )

let showData = () =>{
    const foodItemId = event.target.parentElement.id;

    const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + foodItemId
    fetch(url)
    .then( response => response.json() )
    .then( data => {
                
            const listItemData = data.meals;
            listItemData.forEach(mealItem => {
                const list = document.createElement('ul');
                list.className = 'list';
                const listItemTemplate = `
                    <li> ${mealItem.strIngredient1} </li>
                    <li> ${mealItem.strIngredient2} </li>
                    <li> ${mealItem.strIngredient3} </li>
                    <li> ${mealItem.strIngredient4} </li>
                    <li> ${mealItem.strIngredient5} </li>
                `
                list.innerHTML = listItemTemplate;
                const itemDiv = document.getElementById(foodItemId);
                itemDiv.appendChild(list);
            });
    } )
}