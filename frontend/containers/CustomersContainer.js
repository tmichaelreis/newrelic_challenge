import { useState } from "react";
import CustomerSearchInput from "../components/CustomerSearchInput.js";
import CustomerResults from "../components/CustomerResults";

const CustomersContainer = () => {
  const [customers, setCustomers] = useState([]);

  const handleUserSearch = (value) => {
    console.log(value);
    // TODO: update param in URL
    // TODO: set loading
    // TODO: handle request to api
  };

  return (
    <div>
      <CustomerSearchInput onChange={handleUserSearch} />
      <div>TODO: filter</div>
      <CustomerResults customers={customers} />
    </div>
  );
};

export default CustomersContainer;
