describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    const user = {
      name: "Maija Meikäläinen",
      username: "maija",
      password: "salasana",
    }
    cy.request("POST", "http://localhost:3001/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("Login from is shown", function () {
    cy.contains("log in to application")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input:first").type("maija")
      cy.get("input:last").type("salasana")
      cy.contains("login").click()
      cy.contains("logged in")
    })

    it("fails with wrong credentials", function () {
      cy.get("input:first").type("kissa")
      cy.get("input:last").type("koira")
      cy.contains("login").click()
      cy.get(".error").contains("wrong username or password")
    })
  })
})
