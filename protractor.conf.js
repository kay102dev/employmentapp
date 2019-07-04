// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const targetUrl = 'http://localhost:49155';

exports.config = {
  allScriptsTimeout: 75000, // This is the overall Timeout
  getPageTimeout: 75000, // This is the Page timeout
  specs: ['test/features/**/*.feature'],
  directConnect: true,
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      useAutomationExtension: false,
      args: ["--headless", "--disable-gpu", "--window-size=1920,1080"]
    },
    // If tests needs to run in parallel then turn on this feature
    // shardTestFiles: true,
    maxInstances: 10
  },
  baseUrl: targetUrl,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    format: ['json:test/reports/results.json'],
    'require\-module': 'ts-node/register',
    strict: true,
    require: [
      'test/features/**/step_definitions/*.steps.ts'
    ],
    tags: [
      // TODO - Parameterise these via the command line, perhaps by using grunt.options
      '@smoke_employee'
    ]
  },
  plugins: [{
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options: {
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      customData: {
        title: 'Run info',
        data: [
          {label: 'Project', value: 'Employee app test'},
          {label: 'Release', value: '0.0.1'},
          {label: 'Execution Start Time', value: new Date()},
          {label: 'Execution End Time', value: new Date()}
        ]
      }
    }
  }],

  onPrepare: async function () {
    await browser.getCapabilities().then(function (capabilities) {
      browser.browserName = capabilities.get('browserName');
    });

    // It seems the chrome webdriver ignores the baseUrl option defined above
    if (browser.browserName === 'chrome') {
      browser.get(targetUrl);
    }


  }
};
