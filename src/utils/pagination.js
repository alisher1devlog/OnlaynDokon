export const getPagination = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;

  return { limit, offset, page };
};

export const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, items, totalPages, currentPage, limit };
};
