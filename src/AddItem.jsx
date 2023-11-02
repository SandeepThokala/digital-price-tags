import React from 'react'
import { useState } from 'react'

const AddItem = ({ isLoading, newPrice, setNewPrice, newTitle, setNewTitle, createProduct }) => {

  const [doAdd, setDoAdd] = useState(false)
  const handleReset = () =>  {
    setNewPrice("")
    setNewTitle("")
    setDoAdd(false)
  }

  return (
    <>
      {doAdd &&
        <div>
          <input
            type="text"
            placeholder="Product name"
            required
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <input
            type="number"
            step="0.05"
            placeholder="Product price"
            required
            value={newPrice}
            onChange={e => setNewPrice(e.target.value)}
          />
          <button
            onClick={() => handleReset()}
          >
            Back
          </button>
        </div>
      }
      {!isLoading &&
        <button
          disabled={doAdd ? (!newTitle || !newPrice) : doAdd}
          onClick={() => {
            if (doAdd) {
              createProduct(newTitle, newPrice)
              handleReset()
            } else setDoAdd(true)
          }}
        >
          Add product
        </button>
      }
    </>
  )
}

export default AddItem
