const getTrending = require('../utils/getTrendings')

test('getTrending', async () => {
    let res = await getTrending()

    console.log(res)
})
