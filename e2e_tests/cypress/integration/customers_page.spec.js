describe("customers list page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays page header", () => {
    cy.get("h1").contains("Customers").should("exist");
  });

  it("has user search input", () => {
    cy.get("#customer-search")
      .invoke("attr", "placeholder")
      .should("contain", "Search Customers by First or Last name");
  });

  it("has company name filter", () => {
    cy.get("#company-name-filter").should("have.value", "");
    cy.get("#company-name-filter").should("have.text", "All Companies");
  });

  it("displays all seeded users", () => {
    cy.get("#customer-results").within(($customersTable) => {
      cy.get("td").contains("Tom").should("exist");
      cy.get("td").conains("Reis").should("exist");
      cy.get("td").contains("New Relic").should("exist");

      cy.get("td").contains("Adam").should("exist");
      cy.get("td").conains("Ondra").should("exist");
      cy.get("td").contains("La Sportiva").should("exist");
    });
  });

  describe("customer name search", () => {
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

  describe("company name filter", () => {
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

  describe("simultaneous search and filter", () => {
    it("limits results by name search and company filter", () => {
      cy.get("#customer-search").clear().type("Brooke");
      cy.get("#company-name-filter").select("La Sportiva");

      cy.get("#customer-results").within(($customersTable) => {
        // Matching customers at company should display
        cy.get("td").contains("Brooke").should("exist");
        cy.get("td").contains("Raboutou").should("exist");
        cy.get("td").contains("La Sportiva").should("have.count", 1);

        // Company users that don't match search should not display
        cy.get("td").contains("Adam").should("not.exist");
        cy.get("td").conains("Ondra").should("not.exist");
      });
    });

    it("appends company name filter and search to url", () => {
      cy.get("#customer-search").clear().type("Adam");
      cy.get("#company-name-filter").select("La Sportiva");
      cy.url().should("include", "?filter_by_company_name=La%20Sportiva");
    });
  });
});
