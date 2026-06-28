interface ONSLogoProps {
  /** Height of the logo in px. Width scales proportionally. */
  height?: number
  /** Extra Tailwind classes on the wrapper */
  className?: string
  /** Use white/light colours for dark backgrounds */
  dark?: boolean
}

/**
 * SVG recreation of the ONS Healthcare logo.
 *
 * Layout:
 *  Left column : red-bordered rounded rect with O / N / S stacked vertically
 *  Right column: "RTHO" / "EURO" / "PORTS" beside each letter
 *  Bottom row  : red dot + "Healthcare" in green, underlined in red
 */
export default function ONSLogo({ height = 56, className = '', dark = false }: ONSLogoProps) {
  // All dimensions are relative to a 200×160 viewBox
  const viewW = 200
  const viewH = 160

  const letterColor   = dark ? '#ffffff' : '#111111'
  const suffixColor   = dark ? '#cccccc' : '#333333'
  const borderColor   = '#CC0000'
  const rectFill      = dark ? 'transparent' : 'white'
  const healthcareColor = dark ? '#6ee67e' : '#2E7D32'

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      height={height}
      width={(height * viewW) / viewH}
      className={className}
      aria-label="ONS Healthcare logo"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Red-bordered rounded rectangle (left column) ── */}
      <rect
        x="4" y="4"
        width="52" height="112"
        rx="8" ry="8"
        fill={rectFill}
        stroke={borderColor}
        strokeWidth="3.5"
      />

      {/* ── O ── */}
      <text x="30" y="38" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="30" fill={letterColor}>O</text>
      {/* ── N ── */}
      <text x="30" y="74" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="30" fill={letterColor}>N</text>
      {/* ── S ── */}
      <text x="30" y="110" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="30" fill={letterColor}>S</text>

      {/* ── Suffix labels (right of rectangle) ── */}
      <text x="63" y="34" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="11" fill={suffixColor} letterSpacing="1">RTHO</text>
      <text x="63" y="70" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="11" fill={suffixColor} letterSpacing="1">EURO</text>
      <text x="63" y="106" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="11" fill={suffixColor} letterSpacing="1">PORTS</text>

      {/* ── Red dot ── */}
      <circle cx="10" cy="138" r="5" fill={borderColor} />

      {/* ── "Healthcare" in green ── */}
      <text x="22" y="145" fontFamily="Georgia, serif" fontWeight="700" fontSize="22" fill={healthcareColor} letterSpacing="0.5">Healthcare</text>

      {/* ── Red underline ── */}
      <line x1="4" y1="152" x2="196" y2="152" stroke={borderColor} strokeWidth="2.5" />
    </svg>
  )
}
