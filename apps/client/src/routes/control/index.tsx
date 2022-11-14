import { VolumeInput } from '~/components/VolumeInput'
import {
  BiRegularMicrophone,
  BiRegularMusic,
  BiRegularPlay,
  BiRegularStop,
  BiRegularRepeat,
  BiRegularSkipNext
} from 'solid-icons/bi'
import { MenuIconButton } from '~/components/MenuIconButton'
import { EmojiButton } from '~/components/EmojiButton'
import { MobileLayout } from '~/layouts/MobileLayout'
import { Title } from '~/components/Title'
import { User } from '~/components/User'

export default function Home() {
  return (
    <MobileLayout>
      <div class="space-y-6 p-4">
        <div class="flex">
          <Title />
          <User />
        </div>
        <div class="block">
          <div class="flex justify-between items-center px-4 sm:px-8 transition-all pt-4">
            <VolumeInput
              icon={<BiRegularMusic size={18} />}
              centerText="เพลง"
            />
            <div class="block">
              <div class="flex justify-center">
                <div class="p-8 bg-green-200 rounded-full text-green-600">
                  <BiRegularSkipNext size={48} />
                </div>
              </div>
              <p class="text-gray-500 text-sm text-center mt-2">เพลงต่อไป</p>
            </div>
            <VolumeInput
              icon={<BiRegularMicrophone size={18} />}
              centerText="ไมค์"
            />
          </div>
          <div class="mt-6 space-y-8">
            <div class="grid grid-cols-4 gap-4">
              <MenuIconButton
                colorClass="bg-blue-200 hover:bg-blue-300 text-blue-500 border-blue-300"
                icon={<BiRegularPlay size={32} />}
                title="เล่น"
              />
              <MenuIconButton
                colorClass="bg-red-200 hover:bg-red-300 text-red-500 border-red-300"
                icon={<BiRegularStop size={32} />}
                title="หยุด"
              />
              <MenuIconButton
                colorClass="bg-gray-200 hover:bg-gray-300 text-gray-500 border-gray-300"
                icon={<BiRegularRepeat size={32} />}
                title="เล่นอีกครั้ง"
              />
              <MenuIconButton
                colorClass="bg-green-200 hover:bg-green-300 text-green-500 border-green-300"
                icon={<BiRegularSkipNext size={32} />}
                title="เพลงต่อไป"
              />
            </div>
            <div class="grid grid-cols-2 gap-2">
              <EmojiButton>👏</EmojiButton>
              <EmojiButton>❤️</EmojiButton>
              <EmojiButton>👍</EmojiButton>
              <EmojiButton>😡</EmojiButton>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
