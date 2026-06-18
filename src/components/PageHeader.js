const PageHeader = ({ title, subtitle, action }) => (
  <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 my-4 my-md-5">
    <div>
      <h1 className="h2 mb-0">{title}</h1>
      {subtitle && <p className="text-muted mb-0 mt-1">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export default PageHeader;