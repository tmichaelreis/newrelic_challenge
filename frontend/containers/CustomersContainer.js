import { useState } from "react";
import CustomerSearchInput from "../components/CustomerSearchInput.js";
import CompanyFilterInput from "../components/CompanyFilterInput.js";
import CustomerResults from "../components/CustomerResults";

import Paper from "@material-ui/core/Paper";

import styles from "../styles/CustomersContainer.module.css";

const CustomersContainer = () => {
  const [customers, setCustomers] = useState([]);
  const [companies, setCompanies] = useState([
    { id: 1, name: "New Relic" },
    { id: 2, name: "La Sportiva" },
  ]);
  const [companyFilterValue, setCompanyFilterValue] = useState("");

  // TODO: prefetch companies list on server side

  const handleUserSearch = (event) => {
    const searchParam = event.target.value;
    // TODO: update param in URL
    // TODO: set loading

    fetch(`/api/customers?search=${searchParam}`)
      .then((response) => response.json())
      .then((data) => setCustomers(data));
  };

  const handleCompanyFilter = (event) => {
    setCompanyFilterValue(event.target.value);
    // TODO: update param in URL
    // TODO: set loading
    // TODO: handle filter request to api
  };

  return (
    <Paper elevation={6}>
      <div className={styles.inputs}>
        <div className={styles.inputContainer}>
          <CustomerSearchInput onChange={handleUserSearch} />
        </div>
        <div className={styles.inputContainer}>
          <CompanyFilterInput
            onChange={handleCompanyFilter}
            companies={companies}
            selectedCompany={companyFilterValue}
          />
        </div>
      </div>
      <CustomerResults customers={customers} />
    </Paper>
  );
};

export default CustomersContainer;
