export const getCustomerData = ({ search, companyFilter }) => {
  return fetch(`/api/customers?search=${search}`).then((response) =>
    response.json()
  );
};
