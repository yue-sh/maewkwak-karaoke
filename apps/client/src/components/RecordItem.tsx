import { BiSolidDownload, BiSolidMicrophone } from 'solid-icons/bi'

export const RecordItem = () => {
  return (
    <div class="bg-gray-100 rounded-md p-2 flex items-center gap-3">
      <div class="w-12 h-12 rounded-md  bg-gradient-to-r from-red-500 to-orange-500 flex justify-center items-center text-white">
        <BiSolidMicrophone size={24} />
      </div>
      <div class="block text-gray-600">
        <h1>Lemon</h1>
        <p class="text-xs text-gray-400">米津玄師</p>
      </div>

      <div class="ml-auto flex gap-4 items-center">
        <p class="text-xs text-gray-500">2 นาทีที่แล้ว</p>
        <button class="w-8 h-8 rounded-md text-white bg-green-500 hover:bg-green-600 flex justify-center items-center">
          <BiSolidDownload />
        </button>
      </div>
    </div>
  )
}
