const initialState = [{
  content: 'If it hurts, do it more often',
  author: 'Jez Humble',
  info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
  votes: 0,
  id: '1'
},
{
  content: 'Premature optimization is the root of all evil',
  author: 'Donald Knuth',
  info: 'http://wiki.c2.com/?PrematureOptimization',
  votes: 0,
  id: '2'
}
]


const anecdoteReducer = (state = initialState,action) => {
  console.log('state',state)
  console.log('action',action)
  switch (action.type) {
    case 'CREATE_NEW':
      console.log([...state,action.data])
      return [...state,action.data]
    default:
      return state
  }
}
const getId = () => (100000 * Math.random()).toFixed(0)

export const createAnecdote = (content,author,info) => {
  return {
    type: 'CREATE_NEW',
    data: { content, author, info, id:getId() }
    }
  }

  

export default anecdoteReducer