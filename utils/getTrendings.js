require("chromedriver")
const {Builder, By, until} = require('selenium-webdriver')

const Chrome = require('selenium-webdriver/chrome')

const getTrending = async () => {
    let options = new Chrome.Options()
    options.setChromeBinaryPath('/usr/bin/google-chrome');
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options.addArguments('headless'))
        .build()

    let res = []

    try {
        await driver.get('https://github.com/trending')
        await driver.wait(until.elementLocated(By.css('article.Box-row')), 80000);

        const articles = await driver.findElements(By.css('article.Box-row'))

        const firstTenArticles = articles.slice(0, 10)

        for (let i = 0; i < firstTenArticles.length; i++) {
            let article = await firstTenArticles[i]

            let repo_link = await article.findElement(By.css("h2.h3 a")).getAttribute('href')
            let desc = ""
            try {
                desc = await article.findElement(By.css("p")).getText()
            } catch (e) {
                console.log("Desc Error: ", e)
            }

            let programmingLanguage = ""
            try {
                programmingLanguage = await article.findElement(By.css("div span span[itemprop=programmingLanguage]")).getText()
            } catch (e) {
                console.log("ProgrammingLanguage Error: ", e)
            }

            let starCount = ""
            try {
                starCount = await article.findElement(By.css("div a[href*='stargazers']")).getText()
            } catch (e) {
                console.log("StarCount Error: ", e)
            }

            let forkCount = ""
            try {
                forkCount = await article.findElement(By.css("div a[href*='members']")).getText()
            } catch (e) {
                console.log("ForkCount Error: ", e)
            }

            let todayStarCount = ""
            try {
                todayStarCount = await article.findElement(By.css("div span.float-sm-right")).getText()
            } catch (e) {
                console.log("TodayStarCount Error: ", e)
            }

            res.push({
                repo_link,
                repo: repo_link?.replace("https://github.com/", ""),
                desc,
                programmingLanguage,
                starCount,
                forkCount,
                todayStarCount,
            })
            // console.log(href, desc, programmingLanguage, starCount, forkCount, todayStarCount)
        }
    } finally {
        await driver.quit()
    }

    return res
}

module.exports = getTrending
