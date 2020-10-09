// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/angular-whishlist'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false, //El Autowatch es eso que hacía que cuando corríamos los test quede 
    //la consola abierta, eso nosotros no queremos que pase en Circle CI porque sino nunca 
    //va a terminar de ejecutar el job
    browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessCI'],
    //aqui le estamos diciendo es que los test los tiene que correr adentro de un navegador
    //vamos a usar un ChromeHeadlessCI, va a tener un Chrome instalado este servidor, 
    //adentro de la nube cloud de Circle CI.
    //va a haber un servidor que se va a bajar nuestro código y va a correr 
    //nuestros tests e internamente para correr los tests va a usar un Google Chrome
    customLaunchers: {
      // Headless es un modo no interactivo, no abre la ventana gráfica, 
      //esto es para garantizar que no tire error en ejecución si el servidor de CircleCI 
      //no tiene instaladas las librerías de gráficos del sistema operativo donde esto esté
      // corriendo. La documentacion lo sugiere
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
          flags: ['--no-sandbox', '--disable-gpu', '--disable-translate', '--disable-extensions', '--remote-debugging-port=9223']
      }
    },
    singleRun: false,
    restartOnFileChange: true
  });
};
