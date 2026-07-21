import { forwardRef, type InputHTMLAttributes } from 'react'

export type LivingGlassInputProps = InputHTMLAttributes<HTMLInputElement>

const LivingGlassInput = forwardRef<HTMLInputElement, LivingGlassInputProps>(
  function LivingGlassInput({ className, ...props }, ref) {
    const classes = ['living-glass-input', className].filter(Boolean).join(' ')
    return <input ref={ref} className={classes} {...props} />
  },
)

export default LivingGlassInput
