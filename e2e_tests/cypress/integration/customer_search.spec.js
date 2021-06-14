describe("customer name search", () => {
  beforeEach(() => {
    cy.visit("/customers");
  });

  it("searches by first name", () => {
    cy.get("#customer-search").clear().type("Tom");
    cy.get("#customer-results").within(($customersTable) => {
      // Assert matching user is included
      cy.get("td").contains("Tom").should("exist");
      cy.get("td").contains("Reis").should("exist");
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
      cy.get("td").contains("Reis").should("exist");
      cy.get("td").contains("New Relic").should("exist");

      // Assert non-matching users aren't included
      cy.get("td").contains("Adam").should("not.exist");
    });
  });

  it("displays no results message if no matches", () => {
    cy.get("#customer-search").clear().type("not a valid name match");
    cy.get("#customer-results").contains(
      "No Customers found. Try adjusting your search and filter options."
    );
  });

  it("modifies search query in URL", () => {
    cy.get("#customer-search").clear().type("Tom");
    cy.url().should("include", "?search=Tom");
    cy.get("#customer-search").clear();
    cy.url().should("not.include", "?search");
  });

  it("clears results when clearing search input", () => {
    cy.get("#customer-search").clear().type("Tom");

    // Make sure results initially appear
    cy.get("#customer-results").contains("Tom").should("exist");

    cy.get("#customer-search").clear();

    // Assert user results no longer exist
    cy.get("#customer-results").contains("Tom").should("not.exist");

    // Assert empty query message shows
    cy.get("#customer-results").contains(
      "Use the search and filter options above to view Customer results."
    );
  });

  describe("visiting a page with existing query string", () => {
    beforeEach(() => {
      cy.visit("/customers?search=Tom");
    });

    it("populates search input", () => {
      cy.get("#customer-search").should("have.value", "Tom");
    });

    it("populates customer results", () => {
      cy.get("#customer-results").within(($customersTable) => {
        // Assert matching user is included
        cy.get("td").contains("Tom").should("exist");
        cy.get("td").contains("Reis").should("exist");
        cy.get("td").contains("New Relic").should("exist");

        // Assert non-matching users aren't included
        cy.get("td").contains("Adam").should("not.exist");
      });
    });
  });
});
