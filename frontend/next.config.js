module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/customers",
        permanent: true,
      },
    ];
  },
};
