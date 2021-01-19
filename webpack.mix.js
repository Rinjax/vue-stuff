const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.options( {
    hmrOptions: {
        host: 'dev.synavel.co.uk',
        port: 8080
    }
});

mix.setPublicPath('./public/ui');

mix.setResourceRoot('/ui/');

mix.js('resources/js/ui/app.js', 'js/app.js')
    .sourceMaps();
//.version()