import React, { useEffect, useState } from 'react'
import './RecipeDetails.css'
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

function RecipeDetails() {
    const {recipeId} = useParams();
    //console.log(recipeId)
    const [recipes, setRecipes] = useState([]);
    //console.log(recipe)
    const [recipe, setRecipe] = useState({});
  
    useEffect(()=>{
      //create a reference to firestore db collection
      const recipesRef = collection(db, "Recipes");
  
      // now create query 
      const q = query(recipesRef);
      //console.log(recipeRef.docs)
  
      //now get data that matches the query
      getDocs(q, recipesRef).then((res)=>{
        //console.log(res.docs)
        const recipes = res.docs.map(item => ({
          ...item.data(),
          id: item.id
      }));
      //console.log(recipes);
      setRecipes(recipes);
      })

      const foundRecipe = recipes.find(item => item.id === recipeId);
        //console.log(foundRecipe)
        setRecipe(foundRecipe)

    }, [recipes])


  return (
    <div className="recipe-details-container">
         <div className="recipe-details-banner">
            <h1>{recipe?.title}</h1>
            <img className="recipe-img" src={recipe?.imageUrl} />
            <h4>Rating: {recipe?.rating}/5</h4>
            <h4>Submitted by: {recipe?.submittedBy}</h4>
         </div>
         <div className="recipe-info">
            <h2 className="ingredients-title">ingredients</h2>
            <ul>
                {
                    recipe?.ingredients && recipe?.ingredients.map((step, index) => (
                                <li key={index}>{step}</li>
                        ))
                }
            </ul>
            <h2 className="directions-title">directions</h2>
            <ol>
                {
                    recipe?.directions && recipe?.directions.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))
                }
            </ol>
         </div>
    </div>
  )
}

export default RecipeDetails