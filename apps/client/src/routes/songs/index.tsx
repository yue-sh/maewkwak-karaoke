import { BiRegularSearch } from 'solid-icons/bi'
import { SongItem } from '~/components/SongItem'
import { MobileLayout } from '~/layouts/MobileLayout'

export default function Songs() {
  return (
    <MobileLayout>
      <div class="space-y-4">
        <div>
          <div class="grid grid-cols-2 bg-blue-400 text-white">
            <button class="p-2 text-center text-sm bg-blue-700">
              ชื่อเพลง
            </button>
            <button class="p-2 text-center text-sm">ศิลปิน</button>
          </div>
          <div class="relative sticky top-0">
            <input
              type="text"
              id="hs-leading-icon"
              name="hs-leading-icon"
              class="py-4 px-6 pl-11 block w-full border-gray-200 text-sm focus:z-10 focus:border-0 focus:ring-0"
              placeholder="ค้นหาชื่อเพลง"
            />
            <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
              <BiRegularSearch />
            </div>
          </div>
        </div>

        <div class="space-y-1 px-4">
          <p class="text-sm text-gray-500 pb-2">
            ผลการค้นหา <b>2 รายการ</b>
          </p>
          <SongItem></SongItem>
        </div>
      </div>
    </MobileLayout>
  )
}
