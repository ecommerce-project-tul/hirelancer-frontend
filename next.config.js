const withTM = require("next-transpile-modules")([
    "@mui/material",
    "@mui/system",
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    styledComponents: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        config.resolve.alias = {
            ...config.resolve.alias,
            "@mui/styled-engine": "@mui/styled-engine-sc",
        };
        return config;
    },
};

module.exports = withTM(nextConfig);