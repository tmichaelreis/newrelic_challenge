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
});
