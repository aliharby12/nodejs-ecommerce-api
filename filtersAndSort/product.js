const productFilter = (query) => {
    // Iterate over the keys in the query object
    return Object.keys(query).reduce((acc, key) => {
        if (key === 'title') {
            acc.title = { $regex: query[key], $options: 'i' };
        } else if (key === 'category_id') {
            acc.category_id = query[key];
        } else if (key === 'price') {
            if (query[key].includes(',')) {
                const priceRange = query[key].split(',');
                acc.price = { $gte: parseFloat(priceRange[0]), $lte: parseFloat(priceRange[1]) };
            } else {
                acc.price = parseFloat(query[key]);
            }
        } else if (key === 'description') {
            acc.description = { $regex: query[key], $options: 'i' };
        }
        return acc;
    }, {});
};

module.exports = productFilter;