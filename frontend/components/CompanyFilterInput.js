import PropTypes from "prop-types";

// Material UI
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import styles from "../styles/CompanyFilterInput.module.css";

const CompanyFilterInput = ({ companies, onChange }) => <div></div>;

CompanyFilterInput.propTypes = {
  companies: PropTypes.array,
  onChange: PropTypes.func,
};

export default CompanyFilterInput;
