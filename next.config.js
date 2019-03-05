const withPlugins = require('next-compose-plugins');
const withPreact = require('./next-preact');
const withSass = require('@zeit/next-sass');
const withTM = require('next-transpile-modules');

// next.js configuration
const nextConfig = {
    useFileSystemPublicRoutes: true,
    distDir: 'build',
};

module.exports = withPlugins([
    [withTM, {
        transpileModules: ['@insurance/*', '@rentalcarsDev/*']
    }],

    withPreact,

    // add a plugin with specific configuration
    [withSass, {
        cssModules: true,
        cssLoaderOptions: {
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]',
        },
    }],


], nextConfig);
