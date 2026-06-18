const Skeleton = ({ className = "", style, as: Tag = "span" }) => (
  <Tag
    className={`placeholder placeholder-glow ${className}`.trim()}
    style={style}
    aria-hidden="true"
  />
);

export const TextSkeleton = ({ lines = 3, className = "" }) => (
  <div className={`d-flex flex-column gap-2 py-3 ${className}`.trim()}>
    {Array.from({ length: lines }, (_, index) => (
      <Skeleton
        key={index}
        className={`rounded ${index === lines - 1 ? "col-8" : "col-12"}`}
        style={{ height: "0.9rem" }}
      />
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 5, columns = 5 }) => (
  <div className="table-responsive">
    <table className="table mb-0">
      <thead>
        <tr>
          {Array.from({ length: columns }, (_, index) => (
            <th key={index} scope="col">
              <Skeleton className="col-10 rounded" style={{ height: "0.75rem" }} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }, (_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: columns }, (_, colIndex) => (
              <td key={colIndex}>
                <Skeleton
                  className={`rounded ${colIndex === 0 ? "col-6" : "col-10"}`}
                  style={{ height: "0.85rem" }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const CardSkeleton = ({ count = 3 }) => (
  <div className="row g-4">
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="col-md-4">
        <div className="card shadow-sm h-100">
          <div className="card-body p-4">
            <Skeleton className="col-6 rounded mb-3" style={{ height: "1rem" }} />
            <Skeleton className="col-4 rounded mb-3" style={{ height: "2rem" }} />
            <Skeleton className="col-10 rounded mb-4" style={{ height: "0.85rem" }} />
            <Skeleton className="col-12 rounded mb-2" style={{ height: "0.75rem" }} />
            <Skeleton className="col-11 rounded mb-2" style={{ height: "0.75rem" }} />
            <Skeleton className="col-9 rounded" style={{ height: "0.75rem" }} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const PageSkeleton = () => (
  <div className="py-4">
    <Skeleton className="col-4 rounded mb-3" style={{ height: "1.75rem" }} />
    <Skeleton className="col-6 rounded mb-4" style={{ height: "0.9rem" }} />
    <CardSkeleton count={2} />
  </div>
);

export default Skeleton;