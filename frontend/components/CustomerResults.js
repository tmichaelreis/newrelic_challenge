import PropTypes from "prop-types";

const renderCustomerResults = (customers) =>
  customers.map((customer) => <div>{customer.firstName}</div>);

const renderNoResults = () => (
  <p>Use the search and filter options above to view Customer results.</p>
);

const CustomerResults = ({ customers }) => (
  <table id="customer-results">
    {customers.length > 0
      ? renderCustomerResults(customers)
      : renderNoResults()}
  </table>
);

CustomerResults.propTypes = {
  customers: PropTypes.array,
};

export default CustomerResults;
