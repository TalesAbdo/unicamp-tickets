const path = require('path');
const configureServer = require('./server/server.js');

module.exports = {
    devServer: {
        before: configureServer,
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
// proxy configuration on vue cli 3
// devServer.proxy

// prod app.js
// servir backend
// front-end static

// colocar os arquivos no servidor e entao utilizar PM2
