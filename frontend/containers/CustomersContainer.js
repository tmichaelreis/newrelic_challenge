import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import CustomerSearchInput from "../components/CustomerSearchInput.js";
import CompanyFilterInput from "../components/CompanyFilterInput.js";
import CustomerResults from "../components/CustomerResults";

// Services
import { getCustomerData } from "../services/customers.js";
import { removeEmpty } from "../utils/removeEmpty.js";

import Paper from "@material-ui/core/Paper";

import styles from "../styles/CustomersContainer.module.css";

const CustomersContainer = ({ companies }) => {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");
  const [companyId, setCompanyId] = useState("");

  // Load existing search query on first render.
  // The query string isn't available at first load,
  // so we have to wait for the NextJS router to be ready
  useEffect(() => {
    const existingSearchQuery = router.query["search"];
    const existingCompanyFilter = router.query["filter_by_company_name"];

    if (existingSearchQuery) {
      setCustomerSearchQuery(existingSearchQuery);
    }

    if (existingCompanyFilter) {
      const existingCompanyId = companies.find(
        (company) => company.name === existingCompanyFilter
      )?.id;
      setCompanyId(existingCompanyId);
    }
  }, [router.isReady]);

  // Use query state change to trigger customers search
  useEffect(() => {
    // Use the ignore flag to enforce effect order
    let ignore = false;

    // Get customers from API if search query is not empty
    if (!!(customerSearchQuery || companyId)) {
      getCustomerData({
        search: customerSearchQuery,
        companyFilter: companyId,
      }).then((data) => {
        if (!ignore) {
          setCustomers(data);
        }
      });
    } else {
      setCustomers([]);
    }

    // Set flag to ignore out of order requests
    return () => {
      ignore = true;
    };
  }, [customerSearchQuery, companyId]);

  const addToQueryString = (newQuery) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;

    // Merge current and new query string params
    const queryParams = Object.assign(currentQuery, newQuery);

    // Remove empty params from query string
    const filteredParams = removeEmpty(queryParams);

    router.replace(
      { pathname: currentPath, query: filteredParams },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleUserSearch = (event) => {
    const searchParam = event.target.value;

    // Update search query in state
    setCustomerSearchQuery(searchParam);

    // Set Query String param
    addToQueryString({ search: searchParam });
  };

  const handleCompanyFilter = (event) => {
    const newCompanyId = event.target.value;

    // Update company search in state
    setCompanyId(newCompanyId);

    // Find company name by ID
    const companyName = companies.find(
      (company) => company.id === Number(newCompanyId)
    )?.name;

    // Set Query String param
    addToQueryString({ filter_by_company_name: companyName });
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
            selectedCompany={companyId}
          />
        </div>
      </div>
      <CustomerResults
        customers={customers}
        resultsExpected={!!(customerSearchQuery || companyId)}
      />
    </Paper>
  );
};

CustomersContainer.propTypes = {
  companies: PropTypes.array,
};

export default CustomersContainer;
