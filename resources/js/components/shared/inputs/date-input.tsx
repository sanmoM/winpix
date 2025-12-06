
export default function DateInput({
  value,
  onChange,
  min = "",
  max = "",
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
}) {
  console.log(min)
  return (
    <input
      disabled={disabled}
      type="date"
      className="w-full border py-3 bg-bg-primary px-4 rounded-sm"
      value={value || ""}
      min={min || undefined}
      max={max || undefined}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
