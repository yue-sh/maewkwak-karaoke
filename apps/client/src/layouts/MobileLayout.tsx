import {
  BiSolidPlaylist,
  BiRegularHome,
  BiRegularPlus,
  BiRegularVideoRecording,
  BiRegularJoystickAlt
} from 'solid-icons/bi'
import { createEffect } from 'solid-js'
import { useSearchParams } from 'solid-start'
import { Toaster } from 'solid-toast'
import { NavbarItem } from '~/components/NavbarItem'
import payloadStore from '~/store/payload'

export const MobileLayout = ({ children }) => {
  const { payload, updatePayload } = payloadStore

  createEffect(() => {
    const [params] = useSearchParams()
    if (payload()) {
      return
    }
    if (!params.ip && !payload()) {
      return
    }
    const payloadObject = {
      ip: params.ip,
      mac: params.mac,
      port: params.port,
      mid: params.mid,
      openid: params.openid,
      nickname: params.nickname,
      headimgurl: params.headimgurl
    }
    updatePayload(payloadObject)
  }, [])

  return (
    <div class="flex max-w-md mx-auto">
      {payload() ? (
        <div class="relative flex flex-col flex-1 w-0 overflow-hidden">
          <main class="relative z-0 flex-1 overflow-y-auto transition-all transform-gpu focus:outline-none">
            {children}
          </main>
          <div>
            <Toaster containerClassName="!bottom-[6rem]" />
          </div>
          <div class="px-2 py-4 grid grid-cols-5 bg-gray-100 z-[99999999] fixed bottom-0 w-full max-w-md">
            <NavbarItem
              route="/"
              icon={<BiRegularHome size={24} />}
              title="หน้าหลัก"
            />
            <NavbarItem
              route="/control"
              icon={<BiRegularJoystickAlt size={24} />}
              title="ควบคุม"
            />
            <NavbarItem
              route="/songs"
              icon={<BiRegularPlus size={24} />}
              title="เพิ่มเพลง"
            />
            <NavbarItem
              route="/records"
              icon={<BiRegularVideoRecording size={24} />}
              title="อัดเสียง"
            />
            <NavbarItem
              route="/queues"
              icon={<BiSolidPlaylist size={24} />}
              title="คิวเพลง"
            />
          </div>
        </div>
      ) : (
        <div class="flex items-center justify-center w-full">
          <div class="text-center">
            <h1 class="text-2xl font-bold">ไม่พบห้องที่คุณจะควบคุม</h1>
            <p class="text-sm mt-2 text-center">
              กรุณาเช็ค URL แล้วลองอีกครั้ง
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
