import anecdoteService from "../services/anecdotes"

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.anecdote.id
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

//addVote tarvitsee koko anekdootin, jotta voi lähettää sen putille
export const addVote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.putVote(anecdote)
    dispatch({
      type: "VOTE",
      anecdote: votedAnecdote
    })    
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: "NEW_ANECDOTE",
      anecdote: newAnecdote
    })  
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
