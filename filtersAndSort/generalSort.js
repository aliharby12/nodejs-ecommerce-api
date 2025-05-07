const generalQuerySort = (query) => {
    const sort = {};
    if (query.sort) {
        const sortField = query.sort.split(':')[0];
        const sortOrder = query.sort.split(':')[1] === 'desc' ? -1 : 1;
        sort[sortField] = sortOrder;
    }
    return sort;
}

module.exports = generalQuerySort;