import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  const sortedBlogsAscending = [...blogs]
    .sort((a, b) => a.likes - b.likes)
    .reverse()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [blogs])  //fires only when 'blogs' changes

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in with", username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      setNotification("login succeeded!")
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage("wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreate = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService.setToken(user.token)
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added!`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage("could not add blog")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      const returnedBlog = await blogService.update(blogObject)
      setBlogs(
        blogs.map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog))
      )
      setNotification(`blog ${returnedBlog.title} liked!`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage("could not update blog likes")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blogObject) => {
    try {
      const confirm = window.confirm(
        `Do you really want to remove blog ${blogObject.title} by ${blogObject.author}?`
      )
      if (confirm) {
        blogService.setToken(user.token)
        await blogService.remove(blogObject)
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
      }
    } catch (exception) {
      console.log(exception)
      setErrorMessage("could not remove blog")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2 className="login">log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm handleCreate={handleCreate} />
    </Togglable>
  )

  return (
    <div>
      <Notification message={notification} error={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
          <br></br>
          <br></br>
          {blogForm()}
          <br></br>
          <br></br>
          {sortedBlogsAscending.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              buttonLabel="view"
              handleLike={handleLike}
              handleDelete={handleDelete}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const Notification = ({ message, error }) => {
  if (message === null && error === null) {
    return null
  }

  if (message !== null) {
    return <div className="message">{message}</div>
  }

  if (error !== null) {
    return <div className="error">{error}</div>
  }
}

export default App
