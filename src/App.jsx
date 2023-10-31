import { useState, useEffect } from 'react'
import './App.css'
import SearchItem from './SearchItem'
import Content from './Content'

function App() {
  const API_URL = "https://raw.githubusercontent.com/wedeploy-examples/supermarket-web-example/master/products.json" // "http://localhost:8000/products.json"

  const [items, setItems] = useState([])
  const [search, setSearch] = useState("")
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error('Did not reccive expected data')
        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => fetchItems(), 1000)

  }, [])

  const handleChange = (title, newPrice) => {
    const listItems = items.map(item => item.title === title ? {...item, price: newPrice} : item)
    setItems(listItems)
    localStorage.setItem('products', JSON.stringify(listItems))
  }

  return (
    <>
      <h2>Digital Price Tags</h2>
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      <Content
        isLoading={isLoading}
        fetchError={fetchError}
        items={items.filter(item => {
          return ((item.title).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
        })}
        handleChange={handleChange}
      />
    </>
  )
}

export default App
