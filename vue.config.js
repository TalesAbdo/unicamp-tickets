const path = require('path');

module.exports = {
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://localhost:3001',
                secure: false
            }
        }
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
