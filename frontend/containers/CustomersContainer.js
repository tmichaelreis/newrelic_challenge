import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import CustomerSearchInput from "../components/CustomerSearchInput.js";
import CompanyFilterInput from "../components/CompanyFilterInput.js";
import CustomerResults from "../components/CustomerResults";

import Paper from "@material-ui/core/Paper";

import styles from "../styles/CustomersContainer.module.css";

const CustomersContainer = ({ companies }) => {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [customerSearchQuery, setCustomerSearchQuery] = useState();
  const [companyFilterValue, setCompanyFilterValue] = useState("");

  // Load existing search query on first render.
  // The query string isn't available at first load,
  // so we have to wait for the NextJS router to be ready
  useEffect(() => {
    const existingSearchQuery = router.query["search"];
    if (existingSearchQuery) {
      setCustomerSearchQuery(existingSearchQuery);
    }
  }, [router.isReady]);

  // Use query state change to trigger customers search
  useEffect(() => {
    // Get customers from API
    fetch(`/api/customers?search=${customerSearchQuery}`)
      .then((response) => response.json())
      .then((data) => setCustomers(data));
  }, [customerSearchQuery]);

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
          <CustomerSearchInput
            onChange={handleUserSearch}
            value={customerSearchQuery}
          />
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
        resultsExpected={!!(customerSearchQuery || companyFilterValue)}
      />
    </Paper>
  );
};

CustomersContainer.propTypes = {
  companies: PropTypes.array,
};

export default CustomersContainer;
