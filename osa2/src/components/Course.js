import React from "react"

const Header = ({ course }) => {
  return <h2>{course.name}</h2>
}

const Total = ({ course }) => {
  const amounts = course.parts.map((part) => part.exercises)

  const sum = amounts.reduce((acc, value) => acc + value)

  return <h3>Number of exercises {sum}</h3>
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
      <Total course={props.course} />
    </div>
  )
}

export default Course