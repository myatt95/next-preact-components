const path = require('path')


/**
 *
 * COPY OF @zeit/next-preact
 *
 * This is just here until this module is released with createContext added
 *
 * This problem could also be solved with the release of Preact X (currently in alpha)
 * which supports createContext in its api. However be cautious since preact-compat becomes
 * an optional import as part of preact (preact/compat)
 *
 */
module.exports = (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
        webpack(config, options) {
            if (!options.defaultLoaders) {
                throw new Error(
                    'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
                )
            }

            if (options.isServer) {
                config.externals = ['react', 'react-dom', ...config.externals]
            }

            config.resolve.alias = Object.assign({}, config.resolve.alias, {
                react$: path.join(__dirname, './preact-compat.js'),
                'react-dom$': 'preact-compat',
                react: path.join(__dirname, './preact-compat.js'),
                'react-dom': 'preact-compat'
            })

            if (typeof nextConfig.webpack === 'function') {
                return nextConfig.webpack(config, options)
            }

            return config
        }
    })
}
