describe("simultaneous search and filter", () => {
  beforeEach(() => {
    cy.visit("/customers");
  });

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
    cy.url().should(
      "include",
      "?search=Adam&filter_by_company_name=La+Sportiva"
    );
  });
});
