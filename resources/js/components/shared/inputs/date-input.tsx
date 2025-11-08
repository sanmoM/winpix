import { ChangeEventHandler } from 'react'

export default function DateInput({ onChange }: { onChange: (value: string) => void }) {
  return (
    <input type="date" className='w-full border py-3 bg-bg-primary px-4 rounded-sm' onChange={(e) => onChange(e.target.value)} />
  )
}
