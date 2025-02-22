/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // This will be applied both on the server and client.
      config.module.rules.push({
        test: /node_modules\/farmhash\/build\/Release\/farmhash\.node$/,
        use: 'null-loader',
      });
  
      if (!isServer) {
        // Ensuring that farmhash is not bundled on the client-side
        config.externals.push({
          farmhash: 'commonjs farmhash',
        });
      }
  
      return config;
    },
  };
  
  
module.exports = nextConfig
