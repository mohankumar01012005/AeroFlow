type SeatItemProps = {
  label: string;

  occupied: boolean;

  selected: boolean;

  onSelect: () => void;
};

export default function SeatItem({
  label,
  occupied,
  selected,
  onSelect,
}: SeatItemProps) {
  return (
    <button
      disabled={occupied}
      onClick={onSelect}
      className={`
        flex h-12 w-12 items-center justify-center rounded-xl border text-sm font-semibold transition

        ${
          occupied
            ? "cursor-not-allowed border-neutral-200 bg-neutral-200 text-neutral-400"
            : selected
            ? "border-black bg-black text-white"
            : "border-neutral-300 bg-white hover:border-black"
        }
      `}
    >
      {label}
    </button>
  );
}