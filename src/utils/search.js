export const matchesQuery = (value, query) => {
  if (!query) return true;
  return String(value ?? "")
    .toLowerCase()
    .includes(query.trim().toLowerCase());
};

export const filterByQuery = (items, query, fields) => {
  if (!query) return items;
  const normalized = query.trim().toLowerCase();
  return items.filter((item) =>
    fields.some((field) => {
      const value = typeof field === "function" ? field(item) : item[field];
      return String(value ?? "").toLowerCase().includes(normalized);
    })
  );
};