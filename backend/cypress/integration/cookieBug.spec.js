/// <reference types="Cypress" />

context("cookie bug", () => {
  it("cookie bug", () => {
    Cypress.Cookies.debug(true);

    // sign in with user1
    cy.visit("/");
    cy.login("user1");
    cy.visit("/");
    cy.get("#index").should("exist");

    cy.getCookie("username")
      .its("value")
      .should("equal", "user1"); // passes

    cy.visit("/page-2");
    cy.get("#page-2").should("exist");

    cy.getCookie("username")
      .its("value")
      .should("equal", "user1"); // passes

    cy.logout();
    cy.clearCookies();

    // sign in with user-2
    cy.visit("/");

    cy.login("user2");
    cy.visit("/");
    cy.get("#index").should("exist");

    cy.getCookie("username")
      .its("value")
      .should("equal", "user2"); // passes

    cy.visit("/page-2");

    cy.get("#page-2").should("exist");

    cy.getCookie("username")
      .its("value")
      .should("equal", "user2"); // fails gets userId1 instead
  });
});
