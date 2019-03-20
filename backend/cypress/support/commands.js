Cypress.Commands.add("login", username => {
  Cypress.log({
    name: "login",
    message: ["Logging in via POST /api/login"]
  });

  cy.request({
    method: "POST",
    url: "http://localhost:9000/api/login",
    body: { username, password: "password" }
  });
});

Cypress.Commands.add("logout", username => {
  Cypress.log({
    name: "logout",
    message: ["Logging in via POST /api/logout"]
  });

  cy.request({
    method: "GET",
    url: "http://localhost:9000/api/logout"
  });
});
