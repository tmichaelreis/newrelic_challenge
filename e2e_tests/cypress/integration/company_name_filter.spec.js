describe("company name filter", () => {
  beforeEach(() => {
    cy.visit("/customers");
  });

  it("filters results by company name", () => {
    cy.get("#company-name-filter").select("La Sportiva");

    cy.get("#customer-results").within(($customersTable) => {
      // All Customers for matching company listed
      cy.get("td").contains("Adam").should("exist");
      cy.get("td").conains("Ondra").should("exist");
      cy.get("td").contains("Brooke").should("exist");
      cy.get("td").contains("Raboutou").should("exist");
      cy.get("td").contains("La Sportiva").should("have.count", 2);

      // Other companies and customers are not listed
      cy.get("td").contains("Tom").should("not.exist");
      cy.get("td").conains("Reis").should("not.exist");
      cy.get("td").contains("New Relic").should("not.exist");
    });
  });

  it("appends company name filter to url", () => {
    cy.get("#company-name-filter").select("La Sportiva");
    cy.url().should("include", "?filter_by_company_name=La%20Sportiva");
  });
});
