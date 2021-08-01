/*
 * AWPS uses Laravel Mix
 *
 * Check the documentation at
 * https://laravel.com/docs/5.6/mix
 */

let mix = require("laravel-mix");

// BrowserSync and LiveReload on `npm run watch` command
// Update the `proxy` and the location of your SSL Certificates if you're developing over HTTPS
mix.browserSync({
  proxy: "http://bufet.test/",
  // https: {
  // 	key: '/your/certificates/location/your-local-domain.key',
  // 	cert: '/your/certificates/location/your-local-domain.crt'
  // },
  files: ["**/*.html", "assets/dist/css/**/*.css", "assets/dist/js/**/*.js"],
  injectChanges: true,
  open: false,
});

// Autloading jQuery to make it accessible to all the packages, because, you know, reasons
// You can comment this line if you don't need jQuery
mix.autoload({
  jquery: ["$", "window.jQuery", "jQuery"],
});

mix.setPublicPath("./assets/dist");

// Compile assets
mix
  .js("assets/src/scripts/app.js", "assets/dist/js")
  .options({
    processCssUrls: false,
  })
  .sass("assets/src/sass/style.scss", "assets/dist/css");

// Add versioning to assets in production environment
if (mix.inProduction()) {
  mix.version();
}
