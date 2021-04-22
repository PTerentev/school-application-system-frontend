module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: config => {
    config.resolve.symlinks = false;
  }
};
