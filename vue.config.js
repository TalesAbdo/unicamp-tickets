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
                src: path.resolve(__dirname, './src'),
                css: path.resolve(__dirname, './src/css'),
                modal: path.resolve(__dirname, './src/modalComponents'),
                shared: path.resolve(__dirname, './src/sharedComponents'),
                view: path.resolve(__dirname, './src/viewComponents'),
            }
        }
    },
};
