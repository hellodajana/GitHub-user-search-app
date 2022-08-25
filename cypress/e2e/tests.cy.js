// <reference type="cypress" />

describe("Testing App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  describe("Testing dark mode", () => {
    it("should change from light to dark theme", () => {
      cy.get("#theme").click();
      cy.get("#theme-name").contains("Light");
      // should get sun image instead of moon
    });
  });

  describe("Searching for user", () => {
    const user = "hellodajana";
    it('should appear on page after clicking on "Search"', () => {
      cy.get("#github-username").type(user);
      cy.get("#submit-btn").click();
      cy.get("#github-user").contains(user);
    });

    it('should appear on page after clicking on "Enter"', () => {
      cy.get("#github-username").type(user).type("{enter}");
      cy.get("#github-user").contains(user);
    });
  });
});
