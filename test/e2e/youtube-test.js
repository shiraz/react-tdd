const videoLocator = 'div.html5-video-container > video';
const script = `var player = document.querySelector(\'${videoLocator}\'); player.pause(); return {'duration': player.duration, 'paused': player.paused, 'currentTime': player.currentTime};`;

const configName = process.argv.filter(x => x.toLowerCase().includes('config'))[0];
const isSauce = configName.toLowerCase().includes('sauce');

module.exports = {

    beforeEach: (browser) => {
        browser
            .url('https://www.youtube.com/watch?v=2nZLxqTBV7U')
            .waitForElementVisible('body');
    },

    'Test 1: YouTube page load': (browser) => {
        browser
            .assert.title('Street Fighter V: Arcade Edition – Sagat Gameplay Trailer | PS4 - YouTube')
            .end();
    },

    'Test 2: YouTube player existence': (browser) => {
        browser.assert.visible(videoLocator, 'Verify the existence of the video player.').end();
    },

    'Test 3: YouTube video playback': (browser) => {
        browser
            .pause(3000)
            .execute(script, [], function(result) {
                browser.pause(2000);
                browser.assert.equal(result.value.paused, true, 'Verify that the video was paused.');
                if (isSauce) {
                    browser.assert.ok(Math.floor(result.value.currentTime) <= 6, 'Verify that the current duration of the playback is still 3 seconds (or 6 seconds if Sauce Labs is used).');
                } else {
                    //browser.assert.equal(Math.floor(result.value.currentTime), 3, 'Verify that the current duration of the playback is still 3 seconds.');
                }
            })
            .end();
    },
};