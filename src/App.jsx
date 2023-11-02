import { useState, useEffect } from 'react'
import './App.css'
import { db } from './firebase-config'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import SearchItem from './SearchItem'
import Content from './Content'
import AddItem from './AddItem'

function App() {

  const [items, setItems] = useState([])
  const [search, setSearch] = useState("")
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newTitle, setNewTitle] = useState("")
  const [newPrice, setNewPrice] = useState("")

  const productCollectionRef = collection(db, "products");

  useEffect(() => {

    const fetchItems = async () => {
      try {
        const data = await getDocs(productCollectionRef)
        setItems(data.docs.map(doc => ({...doc.data(), id: doc.id})))
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
  }

  const createProduct = async (title, price) => {
    if (title && price) {
      try {
        addDoc(
          productCollectionRef,
          {title: title, price: Number(price)}
        ).then(response => setItems(items.concat({
          id: response.id,
          title: newTitle,
          price: newPrice
        })))
      } catch (err) {
        console.log(err.message)
      }
    }
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
      <AddItem
        isLoading={isLoading}
        newPrice={newPrice}
        setNewPrice={setNewPrice}
        setNewTitle={setNewTitle}
        newTitle={newTitle}
        createProduct={createProduct}
      />
    </>
  )
}

export default App
