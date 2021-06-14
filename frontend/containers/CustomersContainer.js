import { useState } from "react";
import { useRouter } from "next/router";
import CustomerSearchInput from "../components/CustomerSearchInput.js";
import CompanyFilterInput from "../components/CompanyFilterInput.js";
import CustomerResults from "../components/CustomerResults";

import Paper from "@material-ui/core/Paper";

import styles from "../styles/CustomersContainer.module.css";

const CustomersContainer = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [customerSearchQuery, setCustomerSearchQuery] = useState();
  const [companyFilterValue, setCompanyFilterValue] = useState("");

  // TODO: prefetch companies list on server side

  const handleUserSearch = (event) => {
    const searchParam = event.target.value;

    // Update search query in state
    setCustomerSearchQuery(searchParam);

    // Set url param
    const currentPath = router.pathname;
    const query = searchParam ? { search: searchParam } : undefined;
    router.replace({ pathname: currentPath, query: query }, undefined, {
      shallow: true,
    });

    // TODO: set loading

    // Get customers from API
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
      <CustomerResults
        customers={customers}
        resultsExpected={customerSearchQuery || companyFilterValue}
      />
    </Paper>
  );
};

export default CustomersContainer;
