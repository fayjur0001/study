export const THEME = {
  primary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
  accent: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    900: "#0f172a",
  },
  danger: "#f43f5e",
  warning: "#f59e0b",
  success: "#10b981",
  info: "#0ea5e9",
} as const

// Convenience flat color list for chart series (recharts needs hex strings)
export const CHART_COLORS = [
  THEME.primary[600],
  THEME.accent[500],
  THEME.info,
  THEME.success,
  THEME.danger,
  THEME.primary[300],
]