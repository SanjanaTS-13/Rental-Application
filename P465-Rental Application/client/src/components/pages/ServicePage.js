import React, { useState } from 'react'
import { Cars } from '../car'
import { Link } from 'react-router-dom'

import '../../App.css'



export default function SearchAndFilter() {
    const [query, setQuery] = useState("");

    console.log(query)
    return(
        <div className=''>
                <input 
                    type='text' 
                    placeholder='Search...' 
                    className='search' 
                    onChange={(e) => setQuery(e.target.value)}
                />
                <ul className='list'>
                    {Cars.map((user) => (
                        <a><li key={user.id} className="listItem">{Cars.name}</li></a>
                    ))}
                </ul>
        </div>

    );
}

