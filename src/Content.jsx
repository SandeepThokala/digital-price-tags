import React from 'react'
import ListItem from './ListItem'

const Content = ({ isLoading, fetchError, items, handleChange }) => {
  return (
    <main>
        {isLoading && <p>Loading...</p>}
        {fetchError && <p style={{color: 'red'}}>{`Error: ${fetchError}`}</p>}

        <ul>
          {!fetchError && !isLoading && items.map(item => (
            <li key={`key-${item.title}`}>
              <ListItem
                item={item}
                handleChange={handleChange}
              />
            </li>
          ))}
        </ul>

    </main>
  )
}

export default Content
