import Head from "next/head";
import CustomersContainer from "../containers/CustomersContainer.js";
import styles from "../styles/Customers.module.css";

const Customers = ({ companies }) => (
  <div className={styles.container}>
    <Head>
      <title>Customers</title>
      <meta
        name="description"
        content="Technical challenge for New Relic interview"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
    <h1 className={styles.header}>Customers</h1>

    <section className={styles.customers}>
      <CustomersContainer companies={companies} />
    </section>
  </div>
);

// Load companies data before serving page
export async function getServerSideProps() {
  // Get companies from API
  // Note, this happens on the server, so our /api rewrite proxy
  // will not work and we need to use an absolute URL
  const res = await fetch(`${process.env.apiUrl}/companies`);
  const companies = await res.json();

  // Set companies prop
  return {
    props: {
      companies: companies,
    },
  };
}

export default Customers;
