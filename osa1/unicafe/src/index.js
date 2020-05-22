import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  //tila asettamisen asynkronisuus tuli vastaan, keskiarvoa ja positiivisia ei voi suoraan laskea tilasta, koska se ei ole vielä päivittynyt

  const goodClick = () => {
    let newGood = good + 1
    setGood(newGood)
    let newAll = all + 1
    setAll(all + 1)
    let keskiarvo = (newGood - bad)/(newAll)
    setAverage(keskiarvo)
    let positiiviset = (newGood/newAll)
    setPositive(positiiviset)
  }

  const neutralClick = () => {
    let newNeutral = neutral + 1
    setNeutral(newNeutral)
    let newAll = all + 1
    setAll(all + 1)
    let keskiarvo = (good - bad)/(newAll)
    setAverage(keskiarvo)
    let positiiviset = (good/newAll)
    setPositive(positiiviset)
  }

  const badClick = () => {
    let newBad = bad + 1
    setBad(newBad)
    let newAll = all + 1
    setAll(all + 1)
    let keskiarvo = (good - newBad)/(newAll)
    setAverage(keskiarvo)
    let positiiviset = (good/newAll)
    setPositive(positiiviset)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodClick} text="good" />
      <Button handleClick={neutralClick} text="neutral" />
      <Button handleClick={badClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  return (
    <div>
    <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive * 100} %</p>
      </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
      {props.text}
  </button>
)

ReactDOM.render(<App />, 
  document.getElementById('root')
)