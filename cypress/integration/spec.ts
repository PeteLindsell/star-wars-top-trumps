// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe("Star wars toptrumps", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays title", function () {
    cy.contains("h1", "Star Wars Top Trumps").should("be.visible");
  });
});
