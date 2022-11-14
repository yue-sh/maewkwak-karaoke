import {
  BiRegularDialpad,
  BiRegularDialpadAlt,
  BiRegularJoystickAlt,
  BiRegularJoystickButton,
  BiSolidCog,
  BiSolidMusic,
  BiSolidPlaylist
} from 'solid-icons/bi'
import { CTAButton } from '~/components/CTAButton'
import { SongItem } from '~/components/SongItem'
import { MobileLayout } from '~/layouts/MobileLayout'

export default function Home() {
  return (
    <MobileLayout>
      <div class="space-y- p-4">
        <div class="grid grid-cols-2 gap-2">
          <div class="col-span-2 mb-2 flex gap-4 justify-center items-center">
            🎉
            <h1 class="text-xl text-gray-600">
              ยินดีต้อนรับสู่ <b>Manekineko</b>
            </h1>
            🎉
          </div>
          <CTAButton
            title="ค้นหาชื่อเพลง"
            subtitle="ค้นหาชื่อเพลงง่ายๆด้วยชื่อเพลง"
            boxClass="bg-red-500 hover:bg-red-600 col-span-2"
            icon={<BiSolidMusic size={48} />}
          />
          <CTAButton
            title="ควบคุม"
            subtitle="เปลี่ยนโทรศัพท์ให้เป็นรีโมท"
            boxClass="bg-blue-500 hover:bg-blue-600"
            icon={<BiRegularJoystickAlt size={48} />}
          />
          <CTAButton
            title="จัดการคิว"
            subtitle="จัดการคิวเพลงได้ง่ายๆ"
            boxClass="bg-green-500 hover:bg-green-600"
            icon={<BiSolidPlaylist size={48} />}
          />
          <div class="col-span-2">
            <p class="text-gray-500 mt-4 mb-2">เพลงยอดนิยม</p>
            <div class="space-y-2">
              <SongItem />
              <SongItem />
              <SongItem />
              <SongItem />
              <SongItem />
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
