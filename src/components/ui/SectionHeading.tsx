interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  color?: "green" | "cream" | "yellow";
  alignment?: "left" | "center";
  withAccent?: boolean;
}

const colorMap = {
  green:  { title: "#1B7A3D", subtitle: "#6D4C41" },
  cream:  { title: "#FFF8E7", subtitle: "rgba(255,248,231,0.8)" },
  yellow: { title: "#F5A623", subtitle: "#FFF8E7" },
};

export default function SectionHeading({
  title,
  subtitle,
  color = "green",
  alignment = "center",
  withAccent = true,
}: SectionHeadingProps) {
  const colors = colorMap[color];
  const alignClass = alignment === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      <h2
        className="text-3xl md:text-4xl lg:text-5xl leading-tight"
        style={{ fontFamily: "var(--font-display)", color: colors.title }}
      >
        {title}
      </h2>
      {withAccent && (
        <span className="block h-1 rounded-full" style={{ width: "40px", backgroundColor: "#F5A623" }} />
      )}
      {subtitle && (
        <p className="text-lg max-w-2xl" style={{ fontFamily: "var(--font-body)", color: colors.subtitle }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
