const nextConfig = {
  output: "export",
  assetPrefix: process.env.NODE_ENV === "production" ? "/dentist-app/" : "",
};

export default nextConfig;
