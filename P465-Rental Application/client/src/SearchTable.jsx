import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'

export const SearchTable = ({data}) => {
  return (
    <div>
        
    <table>
        <tbody>
            <tr>
                <th>Car Name</th>
                <th>Price</th>
                <th>Rating</th>
            </tr>
            {data.map((item) => (
                <tr key={item.id}>
                    <td><Link className='table-col1' to={`/CarsDescription/${item.id}`}>{item.carName}</Link></td>
                    <td>{item.price}</td>
                    <td>{item.rating}</td>
                </tr>
            ))}
            
        </tbody>
    </table>
    </div>
  )
}
