export const getCustomerData = ({ search, companyFilter }) => {
  const promise = new Promise(async (resolve) => {
    const response = await fetch(`/api/customers?search=${search}`);
    const data = await response.json();
    resolve(data);
  });
  return promise;
};
