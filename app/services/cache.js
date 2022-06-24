const db = require('../../database/databaseRedis');

const prefix = 'maraicher:';
const timeout = 60 * 5;

const keys = [];

const cache = async (request, response, next) => {
    //is the data present in the cache?
    const key = `${prefix}${request.url}`;
    // console.log(key);

    //if the data is present in the cache
    if (await db.exists(key)) {
        // console.log('Data from Redis');
        //we retrieve the string stored in redis
        const cachedString = await db.get(key);
        //we transform it into a JS object
        const cachedValue = JSON.parse(cachedString);
        //we send the object or the array of objects to the front
        return response.json(cachedValue);
    }

//     otherwise: fetch from postgres and cache.

//     we need to do the SQL query AND cache the result.
  
//    we save the original response.json, not forgetting to redefine its context.
    // console.log('Saving the original response code json');
    const originalResponseJson = response.json.bind(response);

//     we redefine response.json to give it new features:
//     - stringify the result of the query
//    - caching
//    - use backup of original response.json to actually send response to front
    // console.log('Redefinition of response.json');
    response.json = async (data) => {
        // console.log('Data caching of data')
        const str = JSON.stringify(data);
        //to delete cached entries without messing up the perfs, we ourselves store a list of keys concerning our app
        keys.push(key);
        await db.set(key, str, {EX: timeout, NX: true});
        // console.log('Send to front');
        originalResponseJson(data);
    }

    next();
};

const flush = async (request, response, next) => {
    // console.log('Flushing cache');

    while(key=keys.shift()) {
        await db.del(key);
    }
    next();
}

module.exports = {cache, flush};