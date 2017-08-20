module.exports = {

    entry: ['./client/index.js', './client/auth/index.js'],

    output: {
        path: __dirname + '/build/',
        publicPath: 'build/',
        filename: 'build.js'
    },

    devServer: {
        proxy: {
            '/api': 'http://localhost:3001'
        },
        stats: 'silent'
    },

    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
        ]
    },

    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
};
