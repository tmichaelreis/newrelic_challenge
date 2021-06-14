import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import CustomerSearchInput from "../components/CustomerSearchInput.js";
import CompanyFilterInput from "../components/CompanyFilterInput.js";
import CustomerResults from "../components/CustomerResults";

// Services
import { getCustomerData } from "../services/customers.js";

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
    if (existingSearchQuery) {
      setCustomerSearchQuery(existingSearchQuery);
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
    const newCompanyId = event.target.value;
    setCompanyId(newCompanyId);

    const companyName = companies.find(
      (company) => company.id === Number(newCompanyId)
    )?.name;

    // Set url param
    const currentPath = router.pathname;
    const query = companyName
      ? { filter_by_company_name: companyName }
      : undefined;
    router.replace({ pathname: currentPath, query: query }, undefined, {
      shallow: true,
    });
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
