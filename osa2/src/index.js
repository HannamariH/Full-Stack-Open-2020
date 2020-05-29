import React from "react"
import ReactDOM from "react-dom"

const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

const Total = ({ course }) => {

  const amounts = course.parts.map(part => part.exercises)

  const sum = amounts.reduce((acc, value) => acc + value)

  return <p>Number of exercises {sum}</p>
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
    </div>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "neljäs",
        exercises: 67,
        id: 4,
      },
    ],
  }

  return (
    <div>
      <Course course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
