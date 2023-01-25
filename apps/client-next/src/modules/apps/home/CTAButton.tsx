export const CTAButton = ({
  title,
  subtitle,
  className,
  icon
}: {
  title: string
  subtitle: string
  className: string
  icon: JSX.Element
}) => {
  return (
    <div
      className={
        'transition-all rounded-xl min-h-[10rem] text-white p-[1rem] relative cursor-pointer active:translate-y-1 hover:shadow-lg ' +
        className
      }
    >
      <p className="text-2xl font-bold">{title}</p>
      <p className="text-sm">{subtitle}</p>
      <div className="absolute bottom-4 right-4 transition-all on-hover">
        {icon}
      </div>
    </div>
  )
}
