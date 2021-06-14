import PropTypes from "prop-types";

// Material UI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import styles from "../styles/CustomerResults.module.css";

const renderCustomerResults = (customers) => (
  <TableBody>
    {customers.map((customer) => (
      <TableRow key={customer.id}>
        <TableCell>{customer.firstName}</TableCell>
        <TableCell>{customer.lastName}</TableCell>
        <TableCell>{customer.companyName}</TableCell>
      </TableRow>
    ))}
  </TableBody>
);

const renderNoResults = (resultsExpected) =>
  resultsExpected ? (
    <p>No Customers found. Try adjusting your search and filter options.</p>
  ) : (
    <p>Use the search and filter options above to view Customer results.</p>
  );

const CustomerResults = ({ customers, resultsExpected }) => {
  return (
    <TableContainer id="customer-results" className={styles.results}>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Company Name</TableCell>
          </TableRow>
        </TableHead>
        {customers.length > 0 && renderCustomerResults(customers)}
      </Table>
      {customers.length === 0 && renderNoResults(resultsExpected)}
    </TableContainer>
  );
};

CustomerResults.propTypes = {
  customers: PropTypes.array,
  resultsExpected: PropTypes.bool,
};

export default CustomerResults;
