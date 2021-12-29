import { useState, useEffect } from 'react'

import phoneService from './services/phoneRequest'
import './index.css'
import { v4 as uuidv4 } from 'uuid'

const Message = ({ message }) => {
  if(message === null) {
    return null
  }
  return (
    <div className='success'>
      {message}
    </div>
  )
}

const Person = ({ data, onDeletePerson}) => {
  return (
    <div>
      {data.map((person) => 
        <p key={person.id}>{person.name} - {person.number}
          <button onClick={() => onDeletePerson(person)}>delete</button>
        </p>
      )}
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
        Filter shown: <input type='text' value={props.value} onChange={props.onChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div> 
        Name: <input type='text' value={props.valueName} onChange={props.onPersonChange}/> 
      </div>
      <div> 
        Phone: <input type='tel' value={props.valuePhone} onChange={props.onPhoneChange}/> 
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}
const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    phoneService
      .getAll('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })

  }, [])
  
  const personsToShow = searchTerm === ""
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const updatePerson = (data) => {
    const personUrl = `http://localhost:3001/persons/${data.id}`
    const changedPerson = { ...data, number: newPhone }
    phoneService
      .update(personUrl, changedPerson)
      .then((response) => {
        setPersons(persons.map((person) => person.id !== data.id ? person : response.data))
        setNewName('')
        setNewPhone('')
        setMessage(`${response.data.name} was updated`)
        setTimeout(() => setMessage(null), 5000)
      })
  }

  const handleAddPerson = (event) => {
    event.preventDefault()

    const nameDup = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())

    if(nameDup) {
      if(window.confirm(`${nameDup.name} is already added to phonebook, replace the old number with a new one? `)) {
        updatePerson(nameDup)
      }  
      return;
    }

    const personObject = {
      name: newName,
      number: newPhone,
      id: uuidv4()
    }

    phoneService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewPhone('')
        setMessage(`Added ${response.data.name}`)
        setTimeout(() => setMessage(null), 5000)
      })
  }

  const handleDeletePerson = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)) {
      phoneService
        .deleteItem(person.id)
        .then(() => {
          return phoneService.getAll();
        })
        .then((response) => {
          setPersons(response.data)
        })
        .catch((err) => {
          console.log('pondering....')
        })
      }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} onChange={handleFilterChange}/>
      
      <h2>Add new</h2>
      <Message message={message}/>
      <PersonForm 
        onSubmit={handleAddPerson} 
        valueName={newName}
        valuePhone={newPhone}
        onPersonChange={handlePersonChange}
        onPhoneChange={handlePhoneChange}
      />
      
      <h2>Numbers</h2>
      
      <Person data={personsToShow} onDeletePerson={handleDeletePerson}/>
      
    </div>
  )
}

export default App