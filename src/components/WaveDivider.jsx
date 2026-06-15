function WaveDivider({ color = "#fffbeb", flip = false, height = "h-12 md:h-20" }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
      <svg
        className={`w-full ${height} block`}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path fill={color} d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" />
      </svg>
    </div>
  )
}

export default WaveDivider