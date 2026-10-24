const svg = (props) => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  ...props,
})

export const DatabaseIcon = (p) => (
  <svg {...svg(p)}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
  </svg>
)

export const CodeIcon = (p) => (
  <svg {...svg(p)}>
    <path d="m16 18 6-6-6-6" />
    <path d="m8 6-6 6 6 6" />
  </svg>
)

export const BotIcon = (p) => (
  <svg {...svg(p)}>
    <rect x="3" y="8" width="18" height="12" rx="2" />
    <path d="M12 8V4" />
    <path d="M9 14h.01M15 14h.01" />
  </svg>
)

export const CheckIcon = (p) => (
  <svg {...svg(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const SparkIcon = (p) => (
  <svg {...svg(p)}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
  </svg>
)

export const ArrowLeftIcon = (p) => (
  <svg {...svg(p)}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

export const ArrowRightIcon = (p) => (
  <svg {...svg(p)}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export const SunIcon = (p) => (
  <svg {...svg(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

export const MoonIcon = (p) => (
  <svg {...svg(p)}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

export const PlayIcon = (p) => (
  <svg {...svg(p)}>
    <path d="M6 4l14 8-14 8z" />
  </svg>
)
