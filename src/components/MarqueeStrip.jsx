export default function MarqueeStrip() {
  const items = [
    'UI/UX Design', 'Product Design', 'User Research',
    'Design Systems', 'Prototyping', 'Interaction Design',
    'Visual Design', 'Usability Testing', 'Figma', 'No-Code',
  ]
  const doubled = [...items, ...items]

  return (
    <div className="border-y border-white/7 bg-[#141414] py-4 overflow-hidden relative z-10">
      <div
        className="flex w-max gap-0"
        style={{ animation: 'marquee 28s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-8 text-[0.78rem] tracking-[0.14em] uppercase text-[#6b6b6b] whitespace-nowrap"
          >
            {item}
            <span className="text-[#c9a84c] text-[0.55rem]">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
