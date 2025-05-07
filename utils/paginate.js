const paginate = async (model, page, limit, parentField = null) => {
    const skip = (page - 1) * limit;
    let query = model.find();

    // Populate parent field if provided
    if (parentField) {
        query = query.populate(parentField);
    }

    const data = await query.skip(skip).limit(limit);
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