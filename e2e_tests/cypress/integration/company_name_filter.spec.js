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
      cy.get("td:contains(La Sportiva)").should("have.length", 2);

      // Other companies and customers are not listed
      cy.get("td").contains("Tom").should("not.exist");
      cy.get("td").contains("Reis").should("not.exist");
      cy.get("td").contains("New Relic").should("not.exist");
    });
  });

  it("appends company name filter to url", () => {
    cy.get("#company-name-filter").click();
    cy.get("li").contains("La Sportiva").should("exist").click();
    cy.url().should("include", "?filter_by_company_name=La+Sportiva");
  });

  it("clears results when reselecting all companies", () => {
    cy.get("#company-name-filter").click();
    cy.get("li").contains("La Sportiva").should("exist").click();

    // Make sure results initially appear
    cy.get("#customer-results").contains("Adam").should("exist");

    // Reselect All Companies
    cy.get("#company-name-filter").click();
    cy.get("li").contains("All Companies").should("exist").click();

    // Assert user results no longer exist
    cy.get("#customer-results").contains("Adam").should("not.exist");

    // Assert empty query message shows
    cy.get("#customer-results").contains(
      "Use the search and filter options above to view Customer results."
    );
  });

  describe("visiting a page with existing query string", () => {
    beforeEach(() => {
      cy.visit("/customers?filter_by_company_name=La+Sportiva");
    });

    it("populates company filter dropdown", () => {
      cy.get("#company-name-filter").contains("La Sportiva").should("exist");
    });

    it("populates customer results", () => {
      cy.get("#customer-results").within(($customersTable) => {
        // Assert matching user is included
        cy.get("td").contains("Adam").should("exist");
        cy.get("td").contains("Ondra").should("exist");
        cy.get("td").contains("La Sportiva").should("exist");

        // Assert non-matching users aren't included
        cy.get("td").contains("Tom").should("not.exist");
      });
    });
  });
});
