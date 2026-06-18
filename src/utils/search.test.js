import { filterByQuery, matchesQuery } from "./search";

describe("matchesQuery", () => {
  it("returns true when query is empty", () => {
    expect(matchesQuery("anything", "")).toBe(true);
  });

  it("matches case-insensitively", () => {
    expect(matchesQuery("Hello World", "world")).toBe(true);
  });
});

describe("filterByQuery", () => {
  const items = [
    { name: "Alice", email: "alice@example.com", company: { name: "Acme" } },
    { name: "Bob", email: "bob@example.com", company: { name: "Globex" } },
  ];

  it("returns all items when query is empty", () => {
    expect(filterByQuery(items, "", ["name"])).toHaveLength(2);
  });

  it("filters by string fields", () => {
    expect(filterByQuery(items, "alice", ["name"])).toHaveLength(1);
    expect(filterByQuery(items, "alice", ["name"])[0].name).toBe("Alice");
  });

  it("filters using accessor functions", () => {
    expect(
      filterByQuery(items, "globex", [(item) => item.company?.name]).length
    ).toBe(1);
  });
});