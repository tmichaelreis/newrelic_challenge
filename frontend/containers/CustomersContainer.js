import { useState } from "react";
import CustomerSearchInput from "../components/CustomerSearchInput.js";
import CustomerResults from "../components/CustomerResults";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import styles from "../styles/CustomersContainer.module.css";

const CustomersContainer = () => {
  const [customers, setCustomers] = useState([]);

  const handleUserSearch = (event) => {
    console.log(event.target.value);
    // TODO: update param in URL
    // TODO: set loading
    // TODO: handle request to api
  };

  return (
    <Paper elevation={6}>
      <Box className={styles.inputs}>
        <CustomerSearchInput onChange={handleUserSearch} />
        <div>TODO: filter</div>
      </Box>
      <CustomerResults customers={customers} />
    </Paper>
  );
};

export default CustomersContainer;
