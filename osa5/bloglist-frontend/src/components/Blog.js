import React, { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, buttonLabel, handleLike }) => {
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const hideWhenAll = { display: showAll ? "none" : "" }
  const showWhenAll = { display: showAll ? "" : "none" }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const addLike = (event) => {
    event.preventDefault()
    console.log(blog)
    handleLike({...blog, likes: blog.likes+1})
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
        {blog.author}
      </div>
    </div>
  )
}

export default Blog
