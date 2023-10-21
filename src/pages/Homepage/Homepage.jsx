import React, { useEffect, useState } from 'react'
import './Homepage.css'
import Categories from '../../components/Banner/Banner'
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore"
import {db} from '../../config/firebaseConfig'
import { useNavigate } from 'react-router-dom'

function Homepage() {

  const [featuredRecipe, setFeaturedRecipe] = useState({});
  const [latestRecipes, setLatestRecipes] = useState([]);

  const navigate = useNavigate();

  //get data when page loads
  useEffect(()=>{
    const recipeRef = collection(db, "Recipes");

    //set up query to order responses
    const q = query(recipeRef, orderBy("createdAt","desc"))

    //get articles from db
    getDocs(q, recipeRef).then((res)=>{

      const recipes = res.docs.map(item => ({
        ...item.data(),
        id: item.id
      }))
    
      setFeaturedRecipe(recipes[0]);
      setLatestRecipes(recipes.splice(1));

    })

    

  }, [])

  return (
    <div className="homepage-container">
      <Categories />
      <h1 className='featured-title'>featured recipe</h1>
      <div className="featured-recipe-container">
        <img src={featuredRecipe?.imageUrl} className="featured-img" onClick={() => navigate(`/recipedetails/${featuredRecipe?.id}`)}/> 
        <div className="featured-info">
          <h2 onClick={() => navigate(`/recipedetails/${featuredRecipe?.id}`)}>{featuredRecipe?.title}</h2>
          <h3>{`Rating: ${featuredRecipe?.rating}/5`}</h3>
          <h3>{`Submitted by: ${featuredRecipe?.submittedBy}`}</h3>
        </div>
      </div>
      <h1 className='latest-title'>latest recipes</h1>
      <div className='latest-recipes-container'>
        {
          latestRecipes.map((item) => (
            <div className='latest-container' key={item.id} > 
              <img className="latest-img" src={item?.imageUrl} onClick={() => navigate(`/recipedetails/${item?.id}`)}/>
              <div className="latest-info">
                  <h2 onClick={() => navigate(`/recipedetails/${item?.id}`)}>{item?.title}</h2>
                  <h3>{`Rating: ${item?.rating}/5`}</h3>
                  <h3>{`Submitted by: ${item?.submittedBy}`}</h3>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Homepage