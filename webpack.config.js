const path = require('path');
const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // Set the output directory to the right location
    .setOutputPath('public/build/')  // Path to store build files
    .setPublicPath('/build')         // Public URL path to access the assets

    // Set entry point for your assets
    .addEntry('app', './assets/theme/entrypoints/app.js')

    // Copy the images from the assets/media folder to public/build/media folder
    .copyFiles({
        from: './assets/theme/images',  // Source folder with images
        to: 'media/[path][name].[ext]'  // Destination in public/build/media/
    })

    // Other configurations
    .enableSingleRuntimeChunk()
    .splitEntryChunks()
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableSassLoader()
    .enablePostCssLoader()
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.38';
    });

module.exports = Encore.getWebpackConfig();
