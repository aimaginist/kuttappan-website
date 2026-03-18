interface EpisodeBadgeProps {
  number: number | string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-16 h-16",
};
const textMap = {
  sm: { label: "text-[9px]", num: "text-sm" },
  md: { label: "text-xs",    num: "text-lg" },
  lg: { label: "text-xs",    num: "text-2xl" },
};

export default function EpisodeBadge({ number, size = "md" }: EpisodeBadgeProps) {
  const padded = String(number).padStart(2, "0");
  return (
    <div
      className={`${sizeMap[size]} rounded-full flex flex-col items-center justify-center shrink-0`}
      style={{ backgroundColor: "#1B7A3D" }}
    >
      <span className={`${textMap[size].label} leading-none uppercase`} style={{ fontFamily: "var(--font-display)", color: "#FFF8E7" }}>EP</span>
      <span className={`${textMap[size].num} leading-none`} style={{ fontFamily: "var(--font-display)", color: "#FFF8E7" }}>{padded}</span>
    </div>
  );
}
