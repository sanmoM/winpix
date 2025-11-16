import { ChangeEventHandler } from 'react'

export default function DateInput({ value, onChange, min = "", max = "" }: { value: string, onChange: ChangeEventHandler<HTMLInputElement>, min?: string, max?: string, blockUntil?: string }) {
  const minDate = min
    ? new Date(new Date(min).getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
    : undefined;
  return (
    <input type="date" className='w-full border py-3 bg-bg-primary px-4 rounded-sm' onChange={(e) => onChange(e.target.value)} value={value || ""} min={minDate} max={max} />
  )
}
