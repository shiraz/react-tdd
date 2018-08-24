//require('env2')('.env'); // optionally store your Evironment Variables in .env
const SCREENSHOT_PATH = "./screenshots/";

module.exports = {
    "src_folders": [
        "test/e2e"
    ],
    "output_folder": "./reports",
    "test_settings": {
        "default": {
            "launch_url": "http://ondemand.saucelabs.com:80",
            "selenium_port": 80,
            "selenium_host": "ondemand.saucelabs.com",
            "silent": true,
            "username": process.env.SAUCE_USERNAME,
            "access_key": process.env.SAUCE_ACCESS_KEY,
            "screenshots": {
                "enabled": false,
                "path": "",
            },
            "globals": {
                "waitForConditionTimeout": 10000
            },
            "desiredCapabilities": {
                "browserName": "chrome",
                "platform": "Windows 10",
                "version": "latest"
                //"version": "48"
            }
        },
        "safari": {
            "desiredCapabilities": {
                "browserName": "safari",
                "platform": "OS X 10.11",
                "version": "latest"
            }
        },
        "edge": {
            "desiredCapabilities": {
                "browserName": "MicrosoftEdge",
                "platform": "Windows 10",
                "version": "latest"
                //"version": "13.10586"
            }
        },
        "ffox": {
            "desiredCapabilities": {
                "browserName": "firefox",
                "platform": "Linux",
                "version": "latest"
                //"version": "45.0"
            }
        },
        "ios": {
            "desiredCapabilities": {
                "browserName": "Safari",
                //"platformVersion": "9.3",
                "platformVersion": "11.3",
                "platformName": "iOS",
                "deviceName": "iPhone X Simulator",
                "deviceOrientation": "portrait"
            }
        }
    }
};

function padLeft(count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
    return count < 10 ? '0' + count : count.toString();
}

var FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath(browser) {
    var a = browser.options.desiredCapabilities;
    var meta = [a.platform];
    meta.push(a.browserName ? a.browserName : 'any');
    meta.push(a.version ? a.version : 'any');
    meta.push(a.name); // this is the test filename so always exists.
    var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
    return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
