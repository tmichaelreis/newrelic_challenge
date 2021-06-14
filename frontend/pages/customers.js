import Head from "next/head";
import CustomersContainer from "../containers/CustomersContainer.js";
import styles from "../styles/Customers.module.css";

const Customers = () => (
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
      <CustomersContainer />
    </section>
  </div>
);

export default Customers;
