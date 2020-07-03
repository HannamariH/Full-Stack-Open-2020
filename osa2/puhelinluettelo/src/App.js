import React, { useState, useEffect } from "react"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [hakuehto, setHakuehto] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()

    if (!newName) {
      setError("Name is missing")
      setTimeout(() => {
        setError(null)
      }, 5000)
      return
    } else if (!newNumber) {
      setError("Number is missing")
      setTimeout(() => {
        setError(null)
      }, 5000)
      return
    }

    const onkoJo = persons.find((person) => person.name === newName)
    //jos henkilö löytyy listalta
    if (onkoJo !== undefined) {
      //jos halutaan muokata olemassa olevan henkilön puhelinnumeroa
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personObject = {
          name: newName,
          number: newNumber,
        }
        const id = persons.find((person) => person.name === newName).id
        personService
          .update(id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            )
            setNewName("")
            setNewNumber("")
            setMessage(`Updated ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch((error) => {
            console.log(error)
            setError(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setError(null)
            }, 5000)
          })
      } else {
        //jos ei haluta muokata olemassa olevaa
        setNewName("")
        setNewNumber("")
      }
    } else {
      //jos henkilöä ei löydy, lisätään uutena
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          setMessage(`Created ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch((error) => {
          setNewName("")
          setNewNumber("")
          console.log(error.response.data)
          setError(JSON.stringify(error.response.data))
          setTimeout(() => {
          setError(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id))
        setMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
      <Notification message={message} error={error} />
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
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
          {person.name} {person.number}{" "}
          <Delete person={person} deletePerson={props.deletePerson} />
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

const Notification = ({ message, error }) => {
  if (message === null && error == null) {
    return null
  }

  if (message !== null) {
    return <div className="message">{message}</div>
  }

  if (error !== null) {
    return <div className="error">{error}</div>
  }
}

export default App
