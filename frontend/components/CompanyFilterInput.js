import { useState } from "react";
import PropTypes from "prop-types";

// Material UI
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import styles from "../styles/CompanyFilterInput.module.css";

const CompanyFilterInput = ({ companies, onChange, selectedCompany }) => {
  return (
    <Select
      value={selectedCompany}
      id="company-name-filter"
      displayEmpty
      label="Filter by Organization"
      className={styles.input}
      onChange={onChange}
    >
      <MenuItem value="">
        <em>All Companies</em>
      </MenuItem>
      {companies.map((company) => (
        <MenuItem key={company.id} value={company.id}>
          {company.name}
        </MenuItem>
      ))}
    </Select>
  );
};

CompanyFilterInput.propTypes = {
  companies: PropTypes.array,
  onChange: PropTypes.func,
};

export default CompanyFilterInput;
