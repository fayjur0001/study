interface GoogleLoginButtonProps {
  onClick?: () => void
}

export default function GoogleLoginButton({ onClick }: GoogleLoginButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M23.52 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.65z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.88-3c-1.08.72-2.45 1.15-4.05 1.15-3.11 0-5.75-2.1-6.69-4.93H1.3v3.1C3.26 21.3 7.3 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.31 14.32c-.24-.72-.38-1.49-.38-2.32s.14-1.6.38-2.32v-3.1H1.3A11.96 11.96 0 000 12c0 1.93.46 3.76 1.3 5.42l4.01-3.1z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0 7.3 0 3.26 2.7 1.3 6.58l4.01 3.1C6.25 6.85 8.89 4.75 12 4.75z"
        />
      </svg>
      Continue with Google
    </button>
  )
}