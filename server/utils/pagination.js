const pagination = async (
  model,
  page = 1,
  limit = 10,
  filter = {},
  populate = ""
) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const total = await model.countDocuments(filter);

  let query = model.find(filter);

  if (populate) {
    query = query.populate(populate);
  }

  const data = await query
    .skip(skip)
    .limit(limit)
    .sort("-createdAt");

  return {
    data,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  };
};

module.exports = pagination;