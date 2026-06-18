import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = {
  completed: "#6246ea",
  processing: "#46b9ea",
  pending: "#adb5bd",
  inStock: "#6246ea",
  lowStock: "#ffc107",
  outOfStock: "#e45858",
};

const chartTooltipStyle = {
  borderRadius: "8px",
  border: "1px solid rgba(43, 44, 52, 0.12)",
};

export const OrderStatusChart = ({ completed, processing, pending }) => {
  const data = [
    { name: "Completed", value: completed, color: COLORS.completed },
    { name: "Processing", value: processing, color: COLORS.processing },
    { name: "Pending", value: pending, color: COLORS.pending },
  ].filter((item) => item.value > 0);

  if (data.length === 0) {
    return <p className="text-muted mb-0">No order data available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={2}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={chartTooltipStyle} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const InventoryChart = ({ inStock, lowStock, outOfStock }) => {
  const data = [
    { name: "In Stock", value: inStock, fill: COLORS.inStock },
    { name: "Low Stock", value: lowStock, fill: COLORS.lowStock },
    { name: "Out of Stock", value: outOfStock, fill: COLORS.outOfStock },
  ];

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={chartTooltipStyle} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};