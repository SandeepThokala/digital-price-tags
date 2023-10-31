import React, { useState } from 'react'

const ListItem = ({ item, handleChange }) => {
  const [price, setPrice] = useState(item.price)
  
  return (
    <>
      {item.title}
      <input
        type="number"
        value={item.price}
        onChange={(e) => handleChange(item.title, e.target.value)}
      />
      <button disabled={item.price == price}>Update</button>
    </>
  )
}

export default ListItem
