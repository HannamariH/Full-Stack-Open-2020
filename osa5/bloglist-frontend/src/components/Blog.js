import React, { useState } from "react"

const Blog = ({ blog, buttonLabel, handleLike, handleDelete, user }) => {
  const [showAll, setShowAll] = useState(false)
  //const [showRemove, setShowRemove] = useState(false)
  const [showRemove, setShowRemove] = useState(blog.user.username === user.username ? true : false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const showWhenAdder = { display: showRemove ? "" : "none" }

  const showRemoveButton = () => {
    if (blog.user.username !== user.username) {
      return
    }
    setShowRemove(true)
  }

  const hideWhenAll = { display: showAll ? "none" : "" }
  const showWhenAll = { display: showAll ? "" : "none" }

  const toggleShowAll = () => {
    setShowAll(!showAll)
    showRemoveButton()
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
      <div className="hiddenFirst" style={showWhenAll}>
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
