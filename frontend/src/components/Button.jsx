const variants = {
  primary: 'border border-ink bg-ink text-paper hover:border-accent hover:bg-accent hover:text-accent-ink',
  secondary: 'border border-ink bg-transparent text-ink hover:bg-panel',
  ghost: 'border border-transparent text-muted hover:text-ink',
}

// También sirve para enlaces que deben verse como botón.
export function buttonClass(variant = 'secondary', className = '') {
  return `inline-flex cursor-pointer items-center justify-center gap-1.5 px-4 py-2 font-mono text-xs font-medium tracking-wider uppercase no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`
}

export default function Button({ variant = 'secondary', className = '', ...props }) {
  return <button type="button" className={buttonClass(variant, className)} {...props} />
}
