const path = require('path');

module.exports = {
    devServer: {
        overlay: {
            warnings: true,
            errors: true,
        },
    },
    pluginOptions: {
        'resolve-alias': {
            alias: {
            // just like a normal resolve in Webpack
                src: path.resolve(__dirname, './src'),
                components: path.resolve(__dirname, './src/components')
            }
        }
    }
};
