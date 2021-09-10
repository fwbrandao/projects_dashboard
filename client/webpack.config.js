const path = require('path')

module.exports = {
    entry: './index.js',
    module: {
        rules: []
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    }
}