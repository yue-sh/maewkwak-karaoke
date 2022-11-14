import { BiSolidMusic, BiSolidAddToQueue } from 'solid-icons/bi'

export const SongItem = () => {
  return (
    <div class="bg-gray-100 rounded-md p-2 flex items-center gap-3">
      <div class="w-12 h-12 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center text-white">
        <BiSolidMusic size={24} />
      </div>
      <div class="block text-gray-600">
        <h1>Over the fullrenseshift</h1>
        <p class="text-xs text-gray-400">Dj Sharpnel</p>
      </div>

      <div class="ml-auto space-x-2">
        <button class="w-8 h-8 rounded-md text-white bg-blue-500 hover:bg-blue-600 flex justify-center items-center">
          <BiSolidAddToQueue />
        </button>
      </div>
    </div>
  )
}
