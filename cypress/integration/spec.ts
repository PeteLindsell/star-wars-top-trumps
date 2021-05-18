// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe("Star wars toptrumps", () => {
  beforeEach(() => {
    cy.intercept("POST", "https://connectr-swapi.herokuapp.com/", {
      fixture: "starships",
    });
    cy.visit("/");
  });

  it("displays title", function () {
    cy.contains("h1", "Star Wars Top Trumps").should("be.visible");
  });

  it("displays first card", function () {
    cy.contains("h2", "Test title").should("be.visible");
    cy.contains("h3", "Test subtitle").should("be.visible");
    cy.contains("button", "Max Atmosphering Speed: 3").should("be.visible");
    cy.contains("button", "Cost in credits: 1").should("be.visible");
    cy.contains("button", "Number of passengers: 2").should("be.visible");
    cy.contains("button", "Films featured in: 4").should("be.visible");
  });

  it("calculates a draw", function () {
    cy.contains('[role="alert"]', "It was a draw").should("not.exist");
    cy.contains("button", "Max Atmosphering Speed: 3").click();
    cy.contains('[role="alert"]', "It was a draw").should("be.visible");
  });
});
