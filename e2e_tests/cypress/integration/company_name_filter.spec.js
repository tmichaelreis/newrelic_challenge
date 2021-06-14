describe("company name filter", () => {
  beforeEach(() => {
    cy.visit("/customers");
  });

  it("displays a list of company names", () => {
    cy.get("#company-name-filter").click();
    cy.get("li").contains("New Relic").should("exist");
    cy.get("li").contains("La Sportiva").should("exist");
  });

  it("filters results by company name", () => {
    cy.get("#company-name-filter").click();
    cy.get("li").contains("La Sportiva").should("exist").click();

    cy.get("#customer-results").within(($customersTable) => {
      // All Customers for matching company listed
      cy.get("td").contains("Adam").should("exist");
      cy.get("td").contains("Ondra").should("exist");
      cy.get("td").contains("Brooke").should("exist");
      cy.get("td").contains("Raboutou").should("exist");
      cy.get("td").contains("La Sportiva").should("have.count", 2);

      // Other companies and customers are not listed
      cy.get("td").contains("Tom").should("not.exist");
      cy.get("td").contains("Reis").should("not.exist");
      cy.get("td").contains("New Relic").should("not.exist");
    });
  });

  it("appends company name filter to url", () => {
    cy.get("#company-name-filter").click();
    cy.get("li").contains("La Sportiva").should("exist").click();
    cy.url().should("include", "?filter_by_company_name=La%20Sportiva");
  });
});
