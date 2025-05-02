const paginate = async (model, page, limit) => {
    const skip = (page - 1) * limit;
    const data = await model.find().skip(skip).limit(limit);
    const total = await model.countDocuments();

    return {
        data,
        page: parseInt(page),
        limit: parseInt(limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
        nextPage: data.length > 0 ? parseInt(page) + 1 : null,
        totalPages: Math.ceil(total / limit),
        previousPage: page > 1 ? parseInt(page) - 1 : null,
        lastPage: Math.ceil(total / limit),
        total,
    };
}

module.exports = paginate;