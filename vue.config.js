const path = require('path');

module.exports = {
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://localhost:3002',
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
// proxy configuration on vue cli 3
// devServer.proxy

// prod app.js
// servir backend
// front-end static

// colocar os arquivos no servidor e entao utilizar PM2
