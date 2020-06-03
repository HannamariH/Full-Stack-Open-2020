import React, { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [hakuehto, setHakuehto] = useState("")
  const [tulokset, setTulokset] = useState([])
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log("effect")
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled")
      setTulokset(response.data)
      console.log(response.data)
    })
  }, [])

  const onChange = (event) => {
    setShowAll(false)
    setHakuehto(event.target.value)
    console.log(hakuehto)
  }

  const countriesToShow = showAll
    ? tulokset
    : tulokset.filter((tulos) =>
        tulos.name.toUpperCase().includes(hakuehto.toUpperCase())
      )

  return (
    <div>
      <p>
        find countries <input value={hakuehto} onChange={onChange} />{" "}
      </p>
      <Vastaus countriesToShow={countriesToShow}/>
    </div>
  )
}

const Vastaus = ({ countriesToShow }) => {
  if (countriesToShow.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  if (countriesToShow.length === 1) {
    return (
      <div>
        <h1>{countriesToShow[0].name}</h1>
        <p>capital {countriesToShow[0].capital}</p>
        <p>population {countriesToShow[0].population}</p>
        <h2>languages</h2>
        <ul>
        {countriesToShow[0].languages.map(language => <li key = {language.name}>{language.name}</li>)}
        </ul>
        <img src={countriesToShow[0].flag} width="200"></img>
      </div>
    )
  }
  return (
    <div>
      {countriesToShow.map((country) => (
        <p key={country.name}>
          {country.name}
        </p>
      ))}
      </div>
  )
}

export default App
