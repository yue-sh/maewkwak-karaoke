import { BiSolidMusic, BiSolidAddToQueue } from 'solid-icons/bi'

export const SongItem = ({
  id,
  title,
  artist,
  titleRomanji = null,
  artistRomanji = null,
  onAdd = null,
  customAction = null
}) => {
  return (
    <div class="bg-gray-100 rounded-md p-2 flex items-center gap-3">
      <div class="w-12 h-12 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center text-white">
        <BiSolidMusic size={24} />
      </div>
      <div class="block text-gray-600">
        <h1>
          {title}{' '}
          {titleRomanji && (
            <span class="text-[12px] text-gray-500">- {titleRomanji}</span>
          )}
        </h1>
        <p class="text-xs text-gray-400">
          {artist}{' '}
          {artistRomanji && (
            <span class="text-[12px] text-gray-500">- {artistRomanji}</span>
          )}
        </p>
      </div>

      <div class="ml-auto space-x-2">
        {!customAction && (
          <button
            class="w-12 h-12 rounded-md text-white bg-blue-500 hover:bg-blue-600 flex justify-center items-center"
            onClick={() => onAdd(id, title)}
          >
            <BiSolidAddToQueue />
          </button>
        )}
        {customAction}
      </div>
    </div>
  )
}
