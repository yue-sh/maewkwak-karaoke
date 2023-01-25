import {
  TbMicrophone,
  TbMusic,
  TbPlayerPlay,
  TbPlayerSkipForward,
  TbPlayerStop,
  TbRepeat
} from 'react-icons/tb'
import { EmojiButton } from '../../modules/apps/control/EmojiButton'
import { MenuIconButton } from '../../modules/apps/control/MenuIconButton'
import { Title } from '../../modules/apps/control/Title'
import { User } from '../../modules/apps/control/User'
import { VolumeInput } from '../../modules/apps/control/VolumeInput'
import { Layout } from '../../modules/layouts/Layout'
import { Mobile } from '../../modules/layouts/Mobile'
import { useManekiContext } from '../../providers/ManekiProvider'

export const ControlPage = () => {
  const { payload, action } = useManekiContext()

  return (
    <Mobile>
      <Layout>
        <div className="space-y-6 p-2">
          <section className="flex">
            <Title />
            <User title={payload?.mac || 'Not found'} />
          </section>
          <section className="block">
            <div className="flex justify-between items-center px-2 first:transition-all pt-4 w-full">
              <VolumeInput
                icon={<TbMusic size={18} />}
                centerText="เพลง"
                onClick={(value) => action.sendAction('volumeset', value)}
              />
              <div className="block flex-1">
                <div className="flex justify-center">
                  <button
                    className="p-8 bg-green-200 rounded-full text-green-600"
                    onClick={() => action.sendAction('playcontrol', '3')}
                  >
                    <TbPlayerSkipForward size={48} />
                  </button>
                </div>
                <p className="text-gray-500 text-sm text-center mt-2">
                  เพลงต่อไป
                </p>
              </div>
              <VolumeInput
                icon={<TbMicrophone size={18} />}
                centerText="ไมค์"
                onClick={(value) => action.sendAction('micset', value)}
              />
            </div>
            <section className="mt-6 space-y-8">
              <div className="grid grid-cols-4 gap-4">
                <MenuIconButton
                  className="bg-blue-200 hover:bg-blue-300 text-blue-500 border-blue-300"
                  icon={<TbPlayerPlay size={32} />}
                  title="เล่น"
                  onClick={() => action.sendAction('playcontrol', '0')}
                />
                <MenuIconButton
                  className="bg-red-200 hover:bg-red-300 text-red-500 border-red-300"
                  icon={<TbPlayerStop size={32} />}
                  title="หยุด"
                  onClick={() => action.sendAction('playcontrol', '1')}
                />
                <MenuIconButton
                  className="bg-gray-200 hover:bg-gray-300 text-gray-500 border-gray-300"
                  icon={<TbRepeat size={32} />}
                  title="เล่นอีกครั้ง"
                  onClick={() => action.sendAction('playcontrol', '2')}
                />
                <MenuIconButton
                  className="bg-green-200 hover:bg-green-300 text-green-500 border-green-300"
                  icon={<TbPlayerSkipForward size={32} />}
                  title="เพลงต่อไป"
                  onClick={() => action.sendAction('playcontrol', '3')}
                />
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <EmojiButton id="1">🎂</EmojiButton>
                  <EmojiButton id="2">💖</EmojiButton>
                  <EmojiButton id="3">😘</EmojiButton>
                  <EmojiButton id="4">💣</EmojiButton>
                  <EmojiButton id="5">🌹</EmojiButton>
                  <EmojiButton id="6">🍭</EmojiButton>
                  <EmojiButton id="7">🫡</EmojiButton>
                  <EmojiButton id="8">😲</EmojiButton>
                </div>
              </div>
            </section>
          </section>
        </div>
      </Layout>
    </Mobile>
  )
}
