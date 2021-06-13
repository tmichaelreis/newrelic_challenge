import CustomerSearchInput from "../components/CustomerSearchInput.js";

const CustomersContainer = () => {
  const handleUserSearch = (value) => {
    // TODO: update param in URL
    // TODO: set loading
    // TODO: handle request to api
  };

  return (
    <div>
      <CustomerSearchInput onChange={handleUserSearch} />
      <div>TODO: filter</div>
      <div>TODO: results</div>
    </div>
  );
};

export default CustomersContainer;
