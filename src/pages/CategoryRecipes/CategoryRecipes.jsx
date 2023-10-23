import React, { useEffect, useState } from 'react'
import './CategoryRecipes.css'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../config/firebaseConfig';

function CategoryRecipes() {
    const {categoryName} = useParams();
    const [categoryRecipes, setCategoryRecipes] = useState([]);
    const colors = ['#FF5D3B', '#FFA23B', '#FF7F3B', '#FF3A3A', '#FFBD3B'];
    const navigate = useNavigate();

    useEffect(()=>{
      //create a reference to firestore db collection
      const categoryRecipesRef = collection(db, "Recipes");
  
      // now create query 
      const q = query(categoryRecipesRef, where("category", "==", categoryName));
      //console.log(recipeRef.docs)
  
      //now get data that matches the query
      getDocs(q, categoryRecipesRef).then((res)=>{
        //console.log(res.docs)
        const filteredRecipes = res.docs.map(item => ({
          ...item.data(),
          id: item.id
      }));

      //console.log(recipes);
      setCategoryRecipes(filteredRecipes);
      })

    }, [categoryName])


  return (
    <div className="recipes-container">
      <h1 className="all-heading">{categoryName.toLowerCase()}</h1>
        {
          categoryRecipes.map((item, index) =>
            <div className='all-recipes-card' key={item?.id} style={{backgroundColor: colors[index % colors.length]}}>
            <h2 className="all-title" onClick={() => navigate(`/recipedetails/${item?.id}`)}>{item?.title}</h2>
            <img className="all-img" src={item?.imageUrl} onClick={() => navigate(`/recipedetails/${item?.id}`)}/>
            <h3>{`Rating: ${item?.rating}/5`}</h3>
            <h3>{`Submitted by: ${item?.submittedBy}`}</h3>
      </div>   
            
            
            )
        }
    </div>
  )
}

export default CategoryRecipes