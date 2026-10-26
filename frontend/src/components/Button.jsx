const press =
  'shadow-[3px_3px_0_0_var(--shadow)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_0_var(--shadow)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none active:duration-100 motion-reduce:hover:translate-none motion-reduce:active:translate-none'

const variants = {
  primary: `border-2 border-ink bg-accent text-accent-ink ${press}`,
  secondary: `border-2 border-ink bg-surface text-ink ${press}`,
  ghost: 'border-2 border-transparent text-muted hover:bg-panel hover:text-ink',
}

// También sirve para enlaces que deben verse como botón.
export function buttonClass(variant = 'secondary', className = '') {
  return `inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold no-underline transition-[translate,box-shadow,background-color,color,opacity] duration-[160ms] ease-(--ease-lab) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none ${variants[variant]} ${className}`
}

export default function Button({ variant = 'secondary', className = '', ...props }) {
  return <button type="button" className={buttonClass(variant, className)} {...props} />
}
