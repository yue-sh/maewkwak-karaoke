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
import payload from '~/store/payload'

export default function Home() {
  const { payload: p, getPayloadURL } = payload
  const controlPayload = (event: string, value: string) => {
    fetch(getPayloadURL(event, value), {
      method: 'POST'
    })
  }


  return (
    <MobileLayout>
      <div class="space-y-6 p-4">
        <div class="flex">
          <Title />
          <User title={p().mid} />
        </div>
        <div class="block">
          <div class="flex justify-between items-center px-4 sm:px-8 transition-all pt-4">
            <VolumeInput
              icon={<BiRegularMusic size={18} />}
              centerText="เพลง"
              onClick={(w) => controlPayload('volumeset', w)}
            />
            <div class="block">
              <div class="flex justify-center">
                <button class="p-8 bg-green-200 rounded-full text-green-600" onclick={() => controlPayload('playcontrol', '3')}>
                  <BiRegularSkipNext size={48} />
                </button>
              </div>
              <p class="text-gray-500 text-sm text-center mt-2">เพลงต่อไป</p>
            </div>
            <VolumeInput
              icon={<BiRegularMicrophone size={18} />}
              centerText="ไมค์"
              onClick={(w) => controlPayload('micset', w)}
            />
          </div>
          <div class="mt-6 space-y-8">
            <div class="grid grid-cols-4 gap-4">
              <MenuIconButton
                colorClass="bg-blue-200 hover:bg-blue-300 text-blue-500 border-blue-300"
                icon={<BiRegularPlay size={32} />}
                title="เล่น"
                onClick={() => controlPayload('playcontrol', '0')}
              />
              <MenuIconButton
                colorClass="bg-red-200 hover:bg-red-300 text-red-500 border-red-300"
                icon={<BiRegularStop size={32} />}
                title="หยุด"
                onClick={() => controlPayload('playcontrol', '1')}
              />
              <MenuIconButton
                colorClass="bg-gray-200 hover:bg-gray-300 text-gray-500 border-gray-300"
                icon={<BiRegularRepeat size={32} />}
                title="เล่นอีกครั้ง"
                onClick={() => controlPayload('playcontrol', '2')}
              />
              <MenuIconButton
                colorClass="bg-green-200 hover:bg-green-300 text-green-500 border-green-300"
                icon={<BiRegularSkipNext size={32} />}
                title="เพลงต่อไป"
                onClick={() => controlPayload('playcontrol', '3')}
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
