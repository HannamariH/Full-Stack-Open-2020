import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import BlogForm from "./components/BlogForm"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
      setNotification(`login succeeded!`)
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

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      blogService.setToken(user.token)
      const blog = await blogService.create({
        title,
        author,
        url,
      })
      setBlogFormVisible(false)
      setTitle("")
      setAuthor("")
      setUrl("")
      setBlogs(blogs.concat(blog))
      setNotification(`a new blog ${blog.title} by ${blog.author} added!`)
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

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? "none" : "" }
    const showWhenVisible = { display: blogFormVisible ? "" : "none" }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            handleCreate={handleCreate}
            title={title}
            author={author}
            url={url}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
          />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

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
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

const Notification = ({ message, error }) => {
  if (message === null && error == null) {
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
