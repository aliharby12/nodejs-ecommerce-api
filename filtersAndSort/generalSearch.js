const generalSearch = (query, searchFields) => {
    if (!query || !searchFields || searchFields.length === 0) {
        return {};
    }

    const searchConditions = searchFields.map((field) => ({
        [field]: { $regex: query, $options: 'i' }, // Case-insensitive search
    }));

    return { $or: searchConditions };
};

module.exports = generalSearch;