import { useState } from "react";
import CustomerSearchInput from "../components/CustomerSearchInput.js";
import CompanyFilterInput from "../components/CompanyFilterInput.js";
import CustomerResults from "../components/CustomerResults";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import styles from "../styles/CustomersContainer.module.css";

const CustomersContainer = () => {
  const [customers, setCustomers] = useState([]);
  const [companies, setCompanies] = useState([]);

  // TODO: prefetch companies list on server side

  const handleUserSearch = (event) => {
    console.log(event.target.value);
    // TODO: update param in URL
    // TODO: set loading
    // TODO: handle search request to api
  };

  const handleCompanyFilter = (event) => {
    // TODO: update param in URL
    // TODO: set loading
    // TODO: handle filter request to api
  };

  return (
    <Paper elevation={6}>
      <Box className={styles.inputs}>
        <div className={styles.inputContainer}>
          <CustomerSearchInput onChange={handleUserSearch} />
        </div>
        <div className={styles.inputContainer}>
          <CompanyFilterInput
            onChange={handleCompanyFilter}
            companies={companies}
          />
        </div>
      </Box>
      <CustomerResults customers={customers} />
    </Paper>
  );
};

export default CustomersContainer;
