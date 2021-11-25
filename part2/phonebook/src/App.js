import { useState } from 'react'

const Person = (props) => {
  return (
    <div>
      {props.data.map((person) => 
        <p key={person.id}>{person.name} - {person.phone}</p>
      )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

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
      phone: newPhone,
      id: persons.length + 1
    }
    
    setPersons(persons.concat(personObject))
    setNewName('')
  }
  console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>
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
        <Person data={persons}/>
      </div>
    </div>
  )
}

export default App