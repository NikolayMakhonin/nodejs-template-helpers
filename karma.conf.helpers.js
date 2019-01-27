/* eslint-disable prefer-template,no-sync,no-process-env */
// Karma configuration

const globby = require('globby')
const path = require('path')
const fs = require('fs')
const thisPackage = require('./package')

function mergeArrays(...arrays) {
	const items = {}
	for (let i = arrays.length; i--;) {
		const array = arrays[i]
		for (let j = array ? array.length : 0; j--;) {
			const item = array[j]
			if (!items[item]) {
				items[item] = true
			}
		}
	}
	return Object.keys(items)
}

module.exports.writeTextFile = writeTextFile
function writeTextFile(outFilePath, text) {
	const dir = path.dirname(outFilePath)

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, {recursive: true})
	}

	fs.writeFileSync(outFilePath, text)

	return outFilePath
}

module.exports.concatJsFiles = function concatJsFiles(outFilePath, ...globbyPatterns) {
	const dir = path.dirname(outFilePath)

	const code = globby
		.sync(globbyPatterns)
		.map(file => "import {} from '"
			+ path
				.relative(dir, file)
				.replace(/\\/g, '/')
				.replace(/'/g, "\\'")
			+ "'")
		.join('\n') + '\n'

	return writeTextFile(outFilePath, code)
}

module.exports.servedPattern = function (file) {
	return {
		pattern : file,
		included: true,
		served  : true,
		watched : false
	}
}

module.exports.watchPatterns = function (...globbyPatterns) {
	return globby
		.sync(globbyPatterns)
		.map(file => ({
			pattern : file,
			included: false,
			served  : false,
			watched : true
		}))
}

module.exports.configCommon = function (config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha'],

		logReporter: {
			outputPath: 'reports/', // default name is current directory
			outputName: 'performance.log' // default name is logFile_month_day_year_hr:min:sec.log
		},

		plugins: [
			'karma-chrome-launcher',
			'karma-mocha',
			'karma-rollup-preprocessor',
			'karma-coverage'
		],

		// optionally, configure the reporter
		coverageReporter: {
			type  : 'lcov',
			dir   : '.nyc_output',
			subDir: () => 'browser'
		},

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],

		customLaunchers: {
			ChromeHeadlessNoSandbox: {
				base : 'ChromeHeadless',
				flags: ['--no-sandbox']
			},
			FirefoxHeadless: {
				base : 'Firefox',
				flags: ['-headless'],
			}
		}
	})

	if (process.env.TRAVIS) {
		config.browsers = [
			'ChromeHeadlessNoSandbox',
			'FirefoxHeadless',
			// 'IE',
			'Opera',
			'PhantomJS'
		]
	}
}

module.exports.configDetectBrowsers = configDetectBrowsers
function configDetectBrowsers(config) {
	config.set({
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: mergeArrays(config.frameworks, ['detectBrowsers']),

		// configuration
		detectBrowsers: {
			// use headless mode, for browsers that support it, default is false
			preferHeadless: true,
		},

		plugins: mergeArrays(config.plugins, [
			'karma-chrome-launcher',
			'karma-edge-launcher',
			'karma-firefox-launcher',
			'karma-ie-launcher',
			'karma-safari-launcher',
			'karma-safaritechpreview-launcher',
			'karma-opera-launcher',
			'karma-phantomjs-launcher',
			'karma-detect-browsers'
		])
	})
}

module.exports.configTravis = function (config) {
	configDetectBrowsers(config)
}

module.exports.configBrowserStack = function (config) {
	const customLaunchers = {
		// config: https://www.browserstack.com/list-of-browsers-and-platforms?product=automate
		// browser statistics: http://gs.statcounter.com/browser-version-market-share
		Android4_4: {
			base      : 'BrowserStack',
			browser   : 'android',
			os        : 'android',
			device    : 'Galaxy Tab 4',
			os_version: '4.4',
		},
		Android6: {
			base      : 'BrowserStack',
			browser   : 'android',
			os        : 'android',
			device    : 'Galaxy S7',
			os_version: '6.0',
		},
		Android7: {
			base      : 'BrowserStack',
			browser   : 'android',
			os        : 'android',
			device    : 'Galaxy S8',
			os_version: '7.0',
		},
		Android8: {
			base      : 'BrowserStack',
			browser   : 'android',
			os        : 'android',
			device    : 'Galaxy S9',
			os_version: '8.0',
		},
		iOS10_3: {
			base      : 'BrowserStack',
			browser   : 'iOS',
			os        : 'iOS',
			device    : 'iPhone 7',
			os_version: '10.3',
		},
		iOS11: {
			base      : 'BrowserStack',
			browser   : 'iOS',
			os        : 'iOS',
			device    : 'iPhone 8',
			os_version: '11.0',
		},
		iOS12: {
			base      : 'BrowserStack',
			browser   : 'iOS',
			os        : 'iOS',
			device    : 'iPhone XS',
			os_version: '12.1',
		},
		Chrome48: {
			base           : 'BrowserStack',
			browser        : 'Chrome',
			browser_version: '48',
			os             : 'Windows',
			os_version     : '10',
		},
		Firefox47: {
			base           : 'BrowserStack',
			browser        : 'Firefox',
			browser_version: '47',
			os             : 'Windows',
			os_version     : '10',
		},
		Safari10_1: {
			base           : 'BrowserStack',
			browser        : 'Safari',
			browser_version: '10.1',
			os             : 'OS X',
			os_version     : 'Sierra',
		},
		Opera12_15: {
			base           : 'BrowserStack',
			browser        : 'Opera',
			browser_version: '12.15',
			os             : 'OS X',
			os_version     : 'Sierra',
		},
		IE11: {
			base           : 'BrowserStack',
			browser        : 'IE',
			browser_version: '11',
			os             : 'Windows',
			os_version     : '10',
		},
		IE10: {
			base           : 'BrowserStack',
			browser        : 'IE',
			browser_version: '10',
			os             : 'Windows',
			os_version     : '8',
		},
		IE9: {
			base           : 'BrowserStack',
			browser        : 'IE',
			browser_version: '9',
			os             : 'Windows',
			os_version     : '7',
		},
		Edge: {
			base           : 'BrowserStack',
			browser        : 'Edge',
			browser_version: '15',
			os             : 'Windows',
			os_version     : '10',
		}
	}

	// see: https://github.com/karma-runner/karma-browserstack-launcher#global-options
	const browserStack = {
		project  : thisPackage.name,
		username : process.env.BROWSERSTACK_USERNAME,
		accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
	}

	if (process.env.TRAVIS) {
		browserStack.name = process.env.TRAVIS_JOB_NUMBER
		browserStack.build = 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')'
		browserStack.tunnelIdentifier = process.env.BROWSERSTACK_LOCAL_IDENTIFIER
		browserStack.startTunnel = false
	}

	config.set({
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		// frameworks: mergeArrays(config.frameworks, ['browserStack']),

		browserStack,

		customLaunchers,

		browsers: mergeArrays(config.browsers, Object.keys(customLaunchers)),

		plugins: mergeArrays(config.plugins, ['karma-browserstack-launcher'])
	})
}
