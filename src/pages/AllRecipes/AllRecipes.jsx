import React, { useEffect, useState } from 'react'
import './AllRecipes.css'
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function AllRecipes() {
    const [allRecipes, setAllRecipes] = useState([]);
    const colors = ['#FF5D3B', '#FFA23B', '#FF7F3B', '#FF3A3A', '#FFBD3B']

    const navigate = useNavigate();

    useEffect(()=>{
      //create a reference to firestore db collection
      const allRecipesRef = collection(db, "Recipes");
  
      // now create query 
      const q = query(allRecipesRef);
  
      //now get data that matches the query
      getDocs(q, allRecipesRef).then((res)=>{
        //console.log(res.docs)
        const allRecipes = res.docs.map(item => ({
          ...item.data(),
          id: item.id
      }));

      //console.log(recipes);
      setAllRecipes(allRecipes);
      })

    }, [allRecipes])

  return (
    <div className='recipes-container'>
        <h1 className="all-heading">all recipes</h1>
        <div className='all-recipes-container'>
       
        {
            allRecipes.map((item, index)=>
                
                    <div className='all-recipes-card' key={item?.id} style={{backgroundColor: colors[index % colors.length]}}>
                        <h2 className="all-title" onClick={() => navigate(`/recipedetails/${item?.id}`)}>{item?.title}</h2>
                        <img className="all-img" src={item?.imageUrl} onClick={() => navigate(`/recipedetails/${item?.id}`)}/>
                        <h3>{`Rating: ${item?.rating}/5`}</h3>
                        <h3>{`Submitted by: ${item?.submittedBy}`}</h3>
                    </div>          
               )
        }
        </div>
    </div>
  )
}

export default AllRecipes