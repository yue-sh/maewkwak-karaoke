import { ReactNode } from 'react'

export const MenuIconButton = ({
  className = 'bg-gray-200 border-gray-300 text-gray-600',
  icon,
  title,
  onClick
}: {
  className?: string
  icon: ReactNode
  title: string
  onClick: () => void
}) => {
  return (
    <button onClick={() => onClick()}>
      <div
        className={
          'border-0 transition-all rounded-full flex justify-center items-center aspect-square ' +
          className
        }
      >
        {icon}
      </div>
      <p className="text-center text-sm mt-2 text-gray-500">{title}</p>
    </button>
  )
}
