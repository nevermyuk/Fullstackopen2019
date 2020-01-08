
const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (notification,duration) => {
  
  return dispatch => {
    dispatch({ 
    type: 'SHOW',
    notification
  })
  setTimeout(() => {
    dispatch({
      type:'SHOW',
      notification:null
    })
  },duration*1000)
}}

export default notificationReducer