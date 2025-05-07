const generalFieldsQuery = (query) => {
    if (!query.fields) {
        return null;
    }
    return query.fields.split(',').join(' ');
}

module.exports = generalFieldsQuery;