export const getCustomerData = ({ search = null, companyFilter = null }) => {
  let queryParams = {};

  if (!!search) {
    queryParams["search"] = search;
  }

  if (!!companyFilter) {
    queryParams["company_id"] = companyFilter;
  }

  const encodedParams = new URLSearchParams(queryParams);

  return fetch(`/api/customers?${encodedParams.toString()}`)
    .then((response) => response.json())
    .catch((err) => {
      throw new Error(err);
    });
};
