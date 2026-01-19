import React from 'react'

const Movie = ({make, name, year, price}) => {
  return (
    <div>
      <li>
        <p>Make: {make}</p>
        <p>Name: {name}</p>
        <p>Year: {year}</p>
        <p>Price: {price}</p>
      </li>
    </div>
  )
}

export default Movie