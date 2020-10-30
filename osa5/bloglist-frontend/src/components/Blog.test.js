import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

describe("Blog tests: ", () => {

    let component

    const blog= {
        title: "Christmas blog",
        author: "Maija",
        url: "christmasblog.com",
        likes: 5
    }

    beforeEach(() => {
        component = render(
            <Blog blog={blog} buttonLabel="view" />
        )
    })

    test("only title and author are rendered" , () => {
    
        const div = component.container.querySelector(".hiddenFirst")
    
        expect(component.container).toHaveTextContent("Christmas blog")
        expect(component.container).toHaveTextContent("Maija")
        expect(div).toHaveStyle("display: none")
    })
    
    test("after clicking view button also url and likes are shown", () => {
        const button = component.getByText("view")
        fireEvent.click(button)

        const div = component.container.querySelector(".hiddenFirst")
        expect(div).not.toHaveStyle("display: none")
    })
})

test("when like button is clicked twice, mock function is also called twice", () => {

    const blog= {
        title: "Christmas blog",
        author: "Maija",
        url: "christmasblog.com",
        likes: 5
    }

    const mockHandler = jest.fn()

    
    const component = render(<Blog blog={blog} buttonLabel="view" handleLike={mockHandler}/>)   

    const button = component.getByText("view")
    fireEvent.click(button)

    const likeButton = component.getByText("like")
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

})

