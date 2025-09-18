export const Extensions  = (() => {
    const where = function(arr, hash={}) {
        const key = Object.keys(hash)[0]
        return arr.filter(item => item[key] === hash[key])
    };
    return { where }
})()
