import { AiOutlinePlus, AiOutlineMinus } from 'solid-icons/ai'

export const VolumeInput = ({ centerText = null, icon = null }) => {
  return (
    <div class="space-y-4 text-gray-600">
      <div class="flex justify-center">{icon}</div>
      <div class="rounded-full flex bg-gray-100 rounded-full flex-col">
        <button class="hover:bg-gray-200 active:bg-gray-300 transition-all rounded-t-full p-5">
          <AiOutlinePlus size={24} />
        </button>
        <div class="my-2 text-center">{centerText}</div>
        <button class="hover:bg-gray-200 active:bg-gray-300 transition-all rounded-b-full p-5">
          <AiOutlineMinus size={24} />
        </button>
      </div>
    </div>
  )
}
