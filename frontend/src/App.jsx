import { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

  const [liftData, setLiftData] = useState([])
  // Chose to update data on the frontend
  const [refresh, setRefresh] = useState(false)
  

  // Use backticks, not apostrophes
  const endpoint = `${import.meta.env.VITE_API_URL}`

  const fetchData = async() => {
    console.log('fetching...')
    const response = await axios.get(endpoint)
    console.log(response)
    const { data } = response
    setLiftData(data)
    console.log(data)

    return data
  }

  const postData = async() => {
    const name = 'test z'
    const description = 'test z desc'
    const body = {name, description}

    const response = await axios.post(endpoint, body)
    console.log(response)

    return response.data
  }

  const handleSendData = async() => {
    const newData = await postData()
    console.log(newData)
    if (newData) {
      // Takes into a new array old data and adds newly created object
      setLiftData(prevState => [...prevState, newData])
    }
  }

  // Side effect for fetching data
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <ul>
        {liftData.map(el => <li key={el.LiftTemplateId}>{el.name} {el.description} | {el.created_at} | {el.updated_at} | {el.sets} | {el.reps}</li>)}
      </ul>
      <button onClick={handleSendData}>Enter lift</button>
    </>
  );
}

export default App;
