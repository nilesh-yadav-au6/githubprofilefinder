import React from 'react'
import { Link  } from "react-router-dom"
import "../styles/Navbar.css"


function NavBar() {
    return (
        <div className="nav">
            <Link to="/" style={{textDecoration:"none"}}>Github Profile Finder</Link>
        </div>
    )
}

export default NavBar
