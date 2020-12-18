import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { changeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const filteredAnecdotes = filter !== null ? anecdotes.filter((a) => a.content.toUpperCase().includes(filter.toUpperCase())) : anecdotes

  const sortedAnecdotes = [...filteredAnecdotes]
    .sort((a, b) => a.votes - b.votes)
    .reverse()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    const notification = `You voted ${anecdote.content}`
    dispatch(changeNotification(notification))
    setTimeout(() => {      
      dispatch(changeNotification(null))
    }, 5000)
  }

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
