// This class helps wo avoid having to wrap everything in a try catch block when using asyn and await keywords
// Also, it is very useful to destruct the promise into objects
class PromiseWrapper {
    async(promise) {
        return promise
        .then(data => ({ data, error : null }))
        .catch(error => ({ data : null, error }));
    }
};

module.exports = PromiseWrapper;