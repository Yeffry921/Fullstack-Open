import { useState } from 'react'

const Person = (props) => {
  return (
    <div>
      {props.data.map((person) => 
        <p key={person.id}>{person.name} - {person.number}</p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

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

  const handleAddPerson = (event) => {
    event.preventDefault()

    const nameDup = persons.find((person) => person.name === newName)

    if(nameDup) {
      alert(`${nameDup.name} is already added to phonebook `)
      return;
    }

    const personObject = {
      name: newName,
      number: newPhone,
      id: persons.length + 1
    }
    
    setPersons(persons.concat(personObject))
    setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown: <input type='text' value={searchTerm} onChange={handleFilterChange}/>
      </div>
      <form onSubmit={handleAddPerson}>
        <div> 
          Name: <input type='text' value={newName} onChange={handlePersonChange}/> 
        </div>
        <div> 
          Phone: <input type='tel' value={newPhone} onChange={handlePhoneChange}/> 
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {}
        <Person data={personsToShow}/>
      </div>
    </div>
  )
}

export default App