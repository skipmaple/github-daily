const issue = require('./utils/issue');
const getTrending = require('./utils/getTrendings');


// run every day at 00:01 UTC
const run = async (date) => {
    const top10Objs = await getTrending();

    let contents = top10Objs
        .map((obj, i) => {
            let {repo_link, repo, desc, programmingLanguage, starCount, forkCount, todayStarCount,} = obj;

            return `${i + 1}. [**${repo}**${desc ? ': ' + desc : ''}](${repo_link})
${todayStarCount} | ${starCount} stars | ${forkCount} forks ${programmingLanguage ? '| ' + programmingLanguage : ''}

`
        }).join('');

    console.log(contents)
    const res = await issue.open({
        owner: 'skipmaple',
        repo: 'github-daily',
        title: `GitHub Daily Top 10 @${new Date(date).toISOString().slice(0, 10)}`,
        body: contents,
    });

    const issueNumber = res.data.number;

    await issue.lock({
        owner: 'skipmaple',
        repo: 'github-daily',
        issueNumber,
    });
}

run(new Date())
    .catch(err => {
        throw err
    });