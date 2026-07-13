import { cn } from "@/libs/utils";

const BG_COLORS = [
  "#1890FF", "#377DFF", "#0ACF83", "#FF5E5E",
  "#F59E0B", "#8B5CF6", "#EC4899", "#14B8A6",
  "#F97316", "#6366F1",
];

function pickColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return BG_COLORS[Math.abs(hash) % BG_COLORS.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return (parts[0]?.[0] ?? "?").toUpperCase();
}

type AvatarProps = {
  name: string;
  email?: string;
  src?: string | null;
  className?: string;
  size?: number;
};

export function Avatar({ name, email, src, className, size = 40 }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn("rounded-full object-cover", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  const seed = email || name;
  const bg = pickColor(seed);
  const initials = getInitials(name);

  return (
    <div
      className={cn("flex shrink-0 items-center justify-center rounded-full text-white font-medium", className)}
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        fontSize: size * 0.38,
      }}
      title={name}
    >
      {initials}
    </div>
  );
}
