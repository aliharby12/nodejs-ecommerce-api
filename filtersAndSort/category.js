const categoryFilter = (query) => {
    // Iterate over the keys in the query object
    return Object.keys(query).reduce((acc, key) => {
        if (key === 'name') {
            acc.name = { $regex: query[key], $options: 'i' };
        } else if (key === 'parentCategory') {
            acc.parentCategory = query[key];
        } else if (key === 'description') {
            acc.description = { $regex: query[key], $options: 'i' };
        }
        return acc;
    }, {});
};

module.exports = categoryFilter;