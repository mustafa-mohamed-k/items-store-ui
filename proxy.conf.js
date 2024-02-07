
const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'https://127.0.0.1:7154',
        secure: false,
        logLevel: "info",
        "changeOrigin": true,
        pathRewrite: {
            "^/api": ""
        }
    }
];

module.exports = PROXY_CONFIG;