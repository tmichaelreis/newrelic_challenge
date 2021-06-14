import PropTypes from "prop-types";

const CustomerSearchInput = ({ onChange }) => (
  <input type="text" id="customer-search" onChange={onChange} />
);

CustomerSearchInput.propTypes = {
  onChange: PropTypes.func,
};

export default CustomerSearchInput;
