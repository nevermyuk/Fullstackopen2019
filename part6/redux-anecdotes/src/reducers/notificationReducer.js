
const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return { 
    type: 'SHOW',
    notification
  }
}

export default notificationReducer