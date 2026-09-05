export function CardBack() {
  return (
    <div className="h-full w-full overflow-hidden rounded-[inherit] bg-black ring-1 ring-inset ring-[oklch(0.78_0.13_78/0.4)]">
      <img
        src="/images/card-back.png"
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover"
        draggable={false}
      />
    </div>
  )
}
