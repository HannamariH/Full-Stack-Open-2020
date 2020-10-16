import React, { useState } from "react"
const Blog = ({ blog, buttonLabel }) => {
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

  return (
    <div style={blogStyle}>
      <div style={hideWhenAll}>
        {blog.title} {blog.author}
        <button onClick={toggleShowAll}>{buttonLabel}</button>
      </div>
      <div style={showWhenAll}>
        {blog.title} <button onClick={toggleShowAll}>hide</button> <br/>
        {blog.url} <br/>
        {blog.likes} <button>like</button> <br/>
        {blog.author}
      </div>
    </div>
  )
}

export default Blog
