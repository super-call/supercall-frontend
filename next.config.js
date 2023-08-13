const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      displayName: false,
    },
  },
  env: {
    NEXT_PUBLIC_COVALENT_KEY: process.env.NEXT_PUBLIC_COVALENT_KEY,
  }
};

module.exports = nextConfig;
