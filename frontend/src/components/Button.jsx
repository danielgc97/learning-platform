// El empuje es un desplazamiento mínimo, sin sombra dura: el peso lo lleva el color.
const press =
  'hover:-translate-y-px active:translate-y-px active:duration-100 motion-reduce:hover:translate-none motion-reduce:active:translate-none'

const variants = {
  primary: `border border-accent bg-accent text-accent-ink hover:brightness-110 ${press}`,
  secondary: `border border-line bg-surface text-ink hover:border-muted ${press}`,
  ghost: 'border border-transparent text-muted hover:bg-panel hover:text-ink',
}

// También sirve para enlaces que deben verse como botón.
export function buttonClass(variant = 'secondary', className = '') {
  return `inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold no-underline transition-[translate,box-shadow,background-color,color,opacity] duration-[160ms] ease-(--ease-lab) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none ${variants[variant]} ${className}`
}

export default function Button({ variant = 'secondary', className = '', ...props }) {
  return <button type="button" className={buttonClass(variant, className)} {...props} />
}
