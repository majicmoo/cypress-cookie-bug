Cypress.Commands.add("login", username => {
  Cypress.log({
    name: "login",
    message: ["Logging in via POST /api/login"]
  });

  cy.request({
    method: "POST",
    url: "/api/login",
    body: { username, password: "password" },
    headers: { ["X-Csrf-Prevention"]: "true" }
  });
});
