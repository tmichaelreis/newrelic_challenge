describe("customers list page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders /customers page by default", () => {
    cy.url().should("eq", "http://localhost:3000/customers");
  });

  it("has appropriate page title", () => {
    cy.title().should("eq", "Customers");
  });

  it("has appropriate meta description", () => {
    cy.get('meta[name="description"]').should(
      "have.attr",
      "content",
      "Technical challenge for New Relic interview"
    );
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

  it("displays search or filter prompt", () => {
    cy.get("#customer-results").contains(
      "Use the search and filter options above to view Customer results."
    );
  });
});
