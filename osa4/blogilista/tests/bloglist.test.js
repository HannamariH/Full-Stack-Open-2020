const listHelper = require("../utils/list_helper")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const blog = require("../models/blog")

const api = supertest(app)

const initialBlogs = [
  {
    title: "Vauvablogi",
    author: "Veera",
    url: "www.vauvablogi.fi",
    likes: 5
  },
  {
    title: "Ruokablogi",
    author: "Reijo",
    url: "www.ruokablogi.fi",
    likes: 3
  }
]

beforeEach(async () => {
  await blog.deleteMany({})

  let blogObject = new blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new blog(initialBlogs[1])
  await blogObject.save()
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs")

  expect(response.body).toHaveLength(initialBlogs.length)
})

test("a new blog is added", async () => {

  const newBlog = {
    title: "Matkablogi",
    author: "Matti",
    url: "www.matkablogi.fi",
    likes: 7
  }

  await api
    .post("/api/blogs")
    .send(newBlog)

  const response = await api.get("/api/blogs")
  const authors = response.body.map(r => r.author)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(authors).toContain("Matti")
})

test("likes will be 0", async () => {

  const newBlog = {
    title: "Matkablogi",
    author: "Matti",
    url: "www.matkablogi.fi"
  }

  await api
    .post("/api/blogs")
    .send(newBlog)

  const response = await api.get("/api/blogs")

  //testissä lisättävä blogi on listan kolmas
  expect(response.body[2].likes).toBe(0)
})

test("title missing, 400 bad request", async () => {

  const newBlog = {
    author: "Matti",
    url: "www.matkablogi.fi",
    likes: 4
  }  

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
})

test("url missing, 400 bad request", async () => {

  const newBlog = {
    title: "Matkablogi",
    author: "Matti",
    likes: 4
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
})

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs")

  const titles = response.body.map(r => r.title)

  expect(titles).toContain("Vauvablogi")
})

test("field id is included", async () => {
  const response = await api.get("/api/blogs")
  expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ]

const noBlogs = []

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
]

describe("total likes", () => {

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test("of an empty list is zero", () => {
    const result = listHelper.totalLikes(noBlogs)
    expect(result).toBe(0)
  })
})

describe("most likes", () => {

    test("with a longer list of blogs", () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result.likes).toBe(12)
    })

    test("with a list of one blog", () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result.likes).toBe(5)
    })

    test("with an empty array", () => {
        const result = listHelper.favoriteBlog(noBlogs)
        expect(result.likes).toBe(undefined)
    })
})

