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

const Filter = (props) => {
  console.log(props)
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
      <Filter value={searchTerm} onChange={handleFilterChange}/>
      
      <h2>Add new</h2>

      <PersonForm 
        onSubmit={handleAddPerson} 
        valueName={newName}
        valuePhone={newPhone}
        onPersonChange={handlePersonChange}
        onPhoneChange={handlePhoneChange}
      />
      
      <h2>Numbers</h2>
      
      <Person data={personsToShow}/>
      
    </div>
  )
}

export default App