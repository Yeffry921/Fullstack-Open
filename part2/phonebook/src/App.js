import { useState } from 'react'

const Person = (props) => {
  return (
    <div>
      {props.data.map((person) => 
        <p key={person.id}>{person.name}</p>
      )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')

  const handlePersonChnage = (event) => {
    setNewName(event.target.value)
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
      id: persons.length + 1
    }
    
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div> 
          Name: <input value={newName} onChange={handlePersonChnage}/> 
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Person data={persons}/>
      </div>
    </div>
  )
}

export default App