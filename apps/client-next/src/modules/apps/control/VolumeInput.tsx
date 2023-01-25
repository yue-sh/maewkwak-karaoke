import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

export const VolumeInput = ({
  centerText = null,
  icon = null,
  onClick
}: {
  centerText?: string | null
  icon?: React.ReactNode
  onClick: (value: string) => void
}) => {
  return (
    <div className="space-y-4 text-gray-600">
      <div className="flex justify-center">{icon}</div>
      <div className="rounded-full flex bg-gray-100 flex-col">
        <button
          className="active:bg-gray-300 transition-all rounded-t-full p-5"
          onClick={() => onClick('1')}
        >
          <AiOutlinePlus size={24} />
        </button>
        <div className="my-2 text-center">{centerText}</div>
        <button
          className="active:bg-gray-300 transition-all rounded-b-full p-5"
          onClick={() => onClick('0')}
        >
          <AiOutlineMinus size={24} />
        </button>
      </div>
    </div>
  )
}
