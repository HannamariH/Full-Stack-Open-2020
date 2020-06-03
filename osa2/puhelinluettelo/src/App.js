import React, { useState, useEffect } from "react"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [hakuehto, setHakuehto] = useState("")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()
    const onkoJo = persons.find((person) => person.name === newName)
    if (onkoJo !== undefined) {
      alert(`${newName} is already added to phonebook`)
      setNewName("")
      setNewNumber("")
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleHakuehtoChange = (event) => {
    setShowAll(false)
    setHakuehto(event.target.value)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toUpperCase().includes(hakuehto.toUpperCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={hakuehto} onChange={handleHakuehtoChange} />
      <h2>Add a new</h2>
      <New
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        onSubmit={onSubmit}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

const New = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number} <Delete person={person} deletePerson={props.deletePerson}/>
        </p>
      ))}
    </div>
  )
}

const Delete = (props) => {
  return (
    <button onClick={() => props.deletePerson(props.person)}>Delete</button>
  )
}

export default App
