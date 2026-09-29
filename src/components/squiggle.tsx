/**
 * Hand-drawn decorative squiggles used in the Process section.
 * Each is a simple stroke path drawn inside a 96×48 viewBox.
 */

type SquiggleProps = {
  variant: "wave" | "loop" | "zigzag";
  className?: string;
};

export function Squiggle({ variant, className }: SquiggleProps) {
  return (
    <svg
      viewBox="0 0 96 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {variant === "wave" && (
        <path
          d="M4 30 C 14 10, 24 10, 32 26 S 50 44, 58 26 S 76 8, 92 22"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      )}
      {variant === "loop" && (
        <path
          d="M4 34 C 20 34, 24 12, 40 12 C 58 12, 50 40, 66 38 C 78 36, 78 20, 90 16"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      )}
      {variant === "zigzag" && (
        <path
          d="M4 34 L 18 14 L 32 34 L 46 14 L 60 34 L 74 14 L 92 30"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
