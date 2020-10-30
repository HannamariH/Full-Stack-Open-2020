import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import Blog from "./Blog"

test("only title and author are rendered" , () => {
    const blog= {
        title: "Christmas blog",
        author: "Maija",
        url: "christmasblog.com",
        likes: 5
    }

    const component = render(
        <Blog blog={blog} />
    )

    const div = component.container.querySelector(".hiddenFirst")

    expect(component.container).toHaveTextContent("Christmas blog")
    expect(component.container).toHaveTextContent("Maija")
    expect(div).toHaveStyle("display: none")
})