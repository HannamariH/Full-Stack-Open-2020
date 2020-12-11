const notificationAtStart = "my first notification"

const notificationReducer = (state = notificationAtStart, action) => {
  switch (action.type) {
      case 'NOTIFICATION':
          return action.content
      default:
          return state
  }
}

export const changeNotification = (content) => {
  return {
    type: "NOTIFICATION",
    content,
  }
}

export default notificationReducer
