const paginate = (data, page, limit) => {
    const skip = (page - 1) * limit;
    const paginatedData = data.slice(skip, skip + limit);
    const total = data.length;

    return {
        data: paginatedData,
        page: parseInt(page),
        limit: parseInt(limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
        nextPage: paginatedData.length > 0 ? parseInt(page) + 1 : null,
        totalPages: Math.ceil(total / limit),
        previousPage: page > 1 ? parseInt(page) - 1 : null,
        lastPage: Math.ceil(total / limit),
        total,
    };
};

module.exports = paginate;
