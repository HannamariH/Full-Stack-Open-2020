import React from "react"
import { useSelector } from "react-redux"

const Notification = () => {
  let style = {
    display: "none",
  }
  const notification = useSelector((state) => state.notification)
  if (notification !== null) {
    style = {
      border: "solid",
      padding: 10,
      borderWidth: 1,
    }
  }
  return <div style={style}>{notification}</div>
}

export default Notification
