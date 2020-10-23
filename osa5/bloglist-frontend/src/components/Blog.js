import React, { useState, useEffect } from "react"

const Blog = ({ blog, buttonLabel, handleLike, handleDelete, user }) => {
  const [showAll, setShowAll] = useState(false)
  const [showRemove, setShowRemove] = useState(false)

  //poistonappi näytetään vain blogin tekijälle
  try {
    if (blog.user.username === user.username) {
      setShowRemove(true)
    }
  } catch (error) { //kaikilla blogeilla ei ole tekijää
    console.log("error")
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const showWhenAdder = { display: showRemove ? "" : "none" }

  const hideWhenAll = { display: showAll ? "none" : "" }
  const showWhenAll = { display: showAll ? "" : "none" }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const addLike = (event) => {
    event.preventDefault()
    handleLike({ ...blog, likes: blog.likes + 1 })
  }

  const removeBlog = (event) => {
    event.preventDefault()
    handleDelete(blog)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenAll}>
        {blog.title} {blog.author}
        <button onClick={toggleShowAll}>{buttonLabel}</button>
      </div>
      <div style={showWhenAll}>
        {blog.title} <button onClick={toggleShowAll}>hide</button> <br />
        {blog.url} <br />
        {blog.likes} <button onClick={addLike}>like</button> <br />
        {blog.author} <br />
        <button style={showWhenAdder} onClick={removeBlog}>
          remove blog
        </button>
      </div>
    </div>
  )
}

export default Blog
