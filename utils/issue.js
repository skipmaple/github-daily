const { Octokit } = require("@octokit/core")
const { createAppAuth } = require("@octokit/auth-app")

let secrets = {}

try {
    secrets = require('../secret.js')
} catch (error) {
    console.log('no secret json, on github action')
}

const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
        appId: 280064,
        installationId: 33004089,
        clientId: "Iv1.3f99f8b73ec0740a",
        clientSecret: process.env.clientSecret ? process.env.clientSecret : secrets.clientSecret,
        privateKey: process.env.privateKey ? process.env.privateKey : secrets.privateKey,
    },
})

const open = async ({owner, repo, title, body}) => {
    try {
        console.log('opening issue')
        const res = await octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner,
            repo,
            title,
            body,
        })
        console.log('opened')
        return res
    } catch (error) {
        console.log(error)
        throw error
    }
}

const lock = async ({owner, repo, issueNumber}) => {
    console.log('locking issue')
    await octokit.request('PUT /repos/{owner}/{repo}/issues/{issue_number}/lock', {
        owner: owner,
        repo: repo,
        issue_number: issueNumber,
        lock_reason: 'resolved'
    })
    console.log('locked')
}

module.exports = {
    open,
    lock,
}

// lock({
//   owner: 'skipmaple',
//   repo: 'github-daily',
//   issueNumber: 1,
// })