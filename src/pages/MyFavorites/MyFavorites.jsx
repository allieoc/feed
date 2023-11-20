import React, { useContext } from 'react'
import './MyFavorites.css'
import '../AllRecipes/AllRecipes.css'
import { FavoritesContext } from '../../contexts/FavoritesContext'
import { useNavigate } from 'react-router-dom';

function MyFavorites() {
    const {addRecipe, favorites} = useContext(FavoritesContext);
    const colors = ['#FF5D3B', '#FFA23B', '#FF7F3B', '#FF3A3A', '#FFBD3B'];
    const navigate = useNavigate();

  return (
    <div className="favorites-container">
      <h1 className="favorites-heading">my favorite recipes</h1>
      <div className="all-recipes-container">
        {
          favorites?.length > 0 ? 
          favorites?.map((item, index)=>
            <div className='all-recipes-card' onClick={() => navigate(`/recipedetails/${item?.id}`)} key={item?.id} style={{backgroundColor: colors[index % colors.length]}}>
                <h2 className="all-title" >{item?.title}</h2>
                <img className="all-img" src={item?.imageUrl} onClick={() => navigate(`/recipedetails/${item?.id}`)}/>
                <h3>{`Rating: ${item?.rating}/5`}</h3>
                <h3>{`Submitted by: ${item?.submittedBy}`}</h3>
            </div>)
            :
          <p className='no-favorites'>no favorites yet</p>
        }
      </div>
    </div>
  )
}

export default MyFavorites