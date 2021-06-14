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
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://customer-service:4000/:path*",
      },
    ];
  },
};
