import PropTypes from "prop-types";

// Material UI
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import styles from "../styles/CustomerSearchInput.module.css";

const CustomerSearchInput = ({ onChange }) => (
  <TextField
    id="customer-search"
    type="search"
    label="Search by Customer Name"
    className={styles.input}
    onChange={onChange}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />
);

CustomerSearchInput.propTypes = {
  onChange: PropTypes.func,
};

export default CustomerSearchInput;
