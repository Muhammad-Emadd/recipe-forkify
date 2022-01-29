# Recipe-forkify

![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## overview

- an overview usuing neatlify :
  [Recipe-forkify](https://recipe-forkify-mo.netlify.app/)

- a screenshot overview :

  ![picture of the app](https://github.com/Muhammad-Emadd/recipe-forkify/blob/main/recipe-forkify-example.png)

---

## Getting Started

## Description

recipe-forkify is a vanilla JavaScript application that interacts with the food2fork API to fetch and display recipe food data.

This app uses modern JavaScript tools, such as Webpack to bundle the modules, and Babel to convert ES6, ES7 and ES8 back to ES5. The user can search for a specific recipe, and add ingredients to a shopping list or save to a favourites list via local storage

### Usage

- Search any recipe you desire
- Bookmark your favorites recipes
- Create new recipe and upload it to the API
- Edit the serving number for peaple to get the excact amount of the ingredients

## Technologies Used

- HTML5
- CSS3
- Javascript
- SCSS

### NPM Packages

- core-js
- regenerator-runtime
- parcel

### API

- <a href="https://forkify-api.herokuapp.com">Forkify API</a>

an example API GET request looks like this:

```sh
{
    "status":"success",
    "data":{
        "recipe":{
            "publisher":"My Baking Addiction",
            "ingredients":[
                {
                "quantity":1,
                "unit":"",
                "description":"tbsp. canola or olive oil"
                },
                {
                "quantity":0.5,
                "unit":"cup",
                "description":"chopped sweet onion"
                },
                {
                "quantity":3,
                "unit":"cups",
                "description":"diced fresh red yellow and green bell peppers"
                },
                {
                "quantity":1,
                "unit":"",
                "description":"tube refrigerated pizza dough"
                },
                {
                "quantity":0.5,
                "unit":"cup",
                "description":"salsa"
                },
                {
                "quantity":2,
                "unit":"cups",
                "description":"sargento chefstyle shredded pepper jack cheese"
                },
                {
                "quantity":null,
                "unit":"",
                "description":"Chopped cilantro or dried oregano"
                }
            ],
            "source_url":"http://www.mybakingaddiction.com/spicy-chicken-and-pepper-jack-pizza-recipe/",
            "image_url":"http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg",
            "title":"Spicy Chicken and Pepper Jack Pizza",
            "servings":4,
            "cooking_time":45,
            "id":"5ed6604591c37cdc054bc886"
        }
    }
}
```

## Version History

- 0.1
  - Initial Release

---

## Acknowledgements

This project was from Jonas Schmedtmann's 'The Complete JavaScript Course' on Udemy

## Thank you!

Thank you so much for checking out this project! If you have any notes or bugs send them my way and I'll make sure they're fixed.
