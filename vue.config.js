const path = require('path');

module.exports = {
    devServer: {
        overlay: {
            warnings: false,
            errors: false,
        },
    },
    pluginOptions: {
        'resolve-alias': {
            alias: {
            // just like a normal resolve in Webpack
                src: path.resolve(__dirname, './src'),
                css: path.resolve(__dirname, './src/css'),
                sharedComponents: path.resolve(__dirname, './src/sharedComponents'),
                viewComponents: path.resolve(__dirname, './src/viewComponents'),
            }
        }
    }
};
