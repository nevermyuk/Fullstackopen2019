
const notificationReducer = (state = '' , action ) => {
  switch (action.type) {
    case 'SHOW':
      return action.message
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SHOW',
    message
  }
}

export default notificationReducer