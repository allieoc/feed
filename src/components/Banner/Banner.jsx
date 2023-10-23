import React from 'react'
import './Banner.css'
import { Link, useNavigate } from 'react-router-dom'



function Banner() {

    const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Desserts"]
    const colors = ['#FF5D3B', '#FFA23B', '#FF7F3B']

    return (
    <div className="banner-container">
        {
            categories.map((item, index) => 
                <Link className="nav-link"
                to={`category/${item}`}
                key={item}
                style={{backgroundColor: colors[index % colors.length]}}
                >
                {item}
            </Link>)
        }
    </div>
  )
}

export default Banner