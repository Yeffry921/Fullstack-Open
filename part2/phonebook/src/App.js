import { useState, useEffect } from 'react'

import phoneService from './services/phoneRequest'
import './index.css'
import { v4 as uuidv4 } from 'uuid'

const Message = ({ message }) => {
  if(message.name === null) {
    return null
  }
  return (
    <div className={message.type}>
      {message.name}
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
  const [ message, setMessage ] = useState({ name: null, type: ''})
 

  useEffect(() => {
    phoneService
      .getAll()
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
    const personUrl = `http://localhost:3001/api/persons/${data.id}`
    const searchedPerson = persons.find((person) => person.id === data.id)
    const changedPerson = { ...searchedPerson, number: newPhone }
    phoneService
      .update(personUrl, changedPerson)
      .then((response) => {
        setPersons(persons.map((person) => person.id !== data.id ? person : response.data))
        setNewName('')
        setNewPhone('')
        setMessage({
          name: `${response.data.name} was updated`, 
          type: 'success'
        })
        setTimeout(() => setMessage({ name: null, type: '' }), 5000)
      })
      .catch((err) => {
        setMessage({
          name: `Information of ${changedPerson.name} has already deleted from server`,
          type: 'error'
        })
        setPersons(persons.filter((person) => person.id !== data.id))
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
        setMessage({
          name: `Added ${response.data.name}`,
          type: 'success'
        })
        setTimeout(() => {
          setMessage({
            name: null,
            type: ''
          })
        }, 5000)
      })
      .catch((error) => {
        setMessage({ name: error.response.data.error, type: 'error'})
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
          setMessage({
            name: `Information of ${person.name} has already deleted from server`,
            type: 'error'
          })
          setPersons(persons.filter((personItem) => personItem.id !== person.id))
          setTimeout(() => {
            setMessage({
              name: null,
              type: ''
            })
          }, 5000)
          
        })
      }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} onChange={handleFilterChange}/>
      
      <h2>Add new</h2>
      <Message message={message} />
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