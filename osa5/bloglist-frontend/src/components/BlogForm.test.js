import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogForm from "./BlogForm"

test("BlogForm updates parent state and calls onSubmit", () => {
    const createBlog = jest.fn()
  
    const component = render(<BlogForm handleCreate={createBlog} />)
  
    const title = component.container.querySelector("#title")
    const author = component.container.querySelector("#author")
    const url = component.container.querySelector("#url")
    const form = component.container.querySelector("#form")
  
    fireEvent.change(title, {
      target: { value: "kissablogi" },
    })
    fireEvent.change(author, {
      target: { value: "Kim" },
    })
    fireEvent.change(url, {
      target: { value: "www.kissablogi.fi" },
    })
  
    fireEvent.submit(form)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe("kissablogi")
    expect(createBlog.mock.calls[0][0].author).toBe("Kim")
    expect(createBlog.mock.calls[0][0].url).toBe("www.kissablogi.fi")
  })