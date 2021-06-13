describe("customer name search", () => {
  beforeEach(() => {
    cy.visit("/customers");
  });

  it("searches by first name", () => {
    cy.get("#customer-search").clear().type("Tom");
    cy.get("#customer-results").within(($customersTable) => {
      // Assert matching user is included
      cy.get("td").contains("Tom").should("exist");
      cy.get("td").conains("Reis").should("exist");
      cy.get("td").contains("New Relic").should("exist");

      // Assert non-matching users aren't included
      cy.get("td").contains("Adam").should("not.exist");
    });
  });

  it("searches by last name", () => {
    cy.get("#customer-search").clear().type("Reis");
    cy.get("#customer-results").within(($customersTable) => {
      // Assert matching user is included
      cy.get("td").contains("Tom").should("exist");
      cy.get("td").conains("Reis").should("exist");
      cy.get("td").contains("New Relic").should("exist");

      // Assert non-matching users aren't included
      cy.get("td").contains("Adam").should("not.exist");
    });
  });

  it("appends search query to URL", () => {
    cy.get("#customer-search").clear().type("Tom");
    cy.url().should("include", "?search=Tom");
  });
});
