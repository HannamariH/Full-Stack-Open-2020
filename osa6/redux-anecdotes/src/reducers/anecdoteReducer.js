import anecdoteService from "../services/anecdotes"

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.id
      const anecdoteToVote = state.find((a) => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      return state.map((a) => (a.id !== id ? a : votedAnecdote))
    case "NEW_ANECDOTE":
      return [...state, action.anecdote]
    case "INIT_ANECDOTES":
      return action.data
    default:
      return state
  }
}

export const addVote = (id) => {
  return {
    type: "VOTE",
    id: id
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: "NEW_ANECDOTE",
    anecdote
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })    
  }
}

export default anecdoteReducer
