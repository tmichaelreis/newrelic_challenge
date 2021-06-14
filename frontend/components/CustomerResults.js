import PropTypes from "prop-types";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  tableContainer: {
    padding: 20,
  },
});

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
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table id="customer-results" className={classes.table}>
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
