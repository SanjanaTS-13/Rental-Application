import React, { useState } from 'react'
import { Cars } from '../../Cars'
import '../../App.css'
import { SearchTable } from '../../SearchTable';
import BackgroundImage from '../../assets/images/cars1.jpg'

export default function SearchAndFilter() {
    const [query, setQuery] = useState("");

    const keys = ["carName", "model", "brand"]
    
    const search = (data) =>{
        return data.filter((item)=>
        // => item.carName.toLowerCase().includes(query)
            keys.some(key=>item[key].toLowerCase().includes(query))
        );
    };

    return(
        <div className='searchBody'>
            <header style={ HeaderStyle }>
            <section className='header'>
            <p className="hello">Search for the car you want </p>
            <div id="custom-search-input">
                <div class="input-group">
                    <input type="text" class="search-query form-control" placeholder="Search here..."  onChange={(e) => setQuery(e.target.value)}></input>
                </div>
            
			</div>
            </section>
           
            <br></br> 
            <br></br>
                {/* <input 
                    type='text' 
                    placeholder='Search...' 
                    className='searchbar' 
                    onChange={(e) => setQuery(e.target.value)}
                /> */}
                
                <SearchTable data={search(Cars)}/>
            </header>
        </div>
    );
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}