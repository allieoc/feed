import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import CategoryRecipes from './pages/CategoryRecipes/CategoryRecipes'
import RecipeDetails from './pages/RecipeDetails/RecipeDetails'
import AllRecipes from './pages/AllRecipes/AllRecipes'


function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Homepage /> } />
        <Route path="/category/:categoryName" element={<CategoryRecipes />} />
        <Route path="/recipedetails/:recipeId" element={<RecipeDetails />} />
        <Route path="/category/All" element={<AllRecipes />} />
      </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
