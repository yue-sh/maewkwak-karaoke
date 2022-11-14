import {
  BiSolidPlaylist,
  BiRegularHome,
  BiRegularCog,
  BiRegularPlus,
  BiRegularVideoRecording,
  BiRegularJoystickButton,
  BiRegularJoystickAlt
} from 'solid-icons/bi'
import { NavbarItem } from '~/components/NavbarItem'

export const MobileLayout = ({ children }) => {
  return (
    <div class="flex h-screen overflow-hidden bg-gray-50 max-w-md mx-auto">
      <div class="relative flex flex-col flex-1 w-0 overflow-hidden">
        <main class="relative z-0 flex-1 overflow-y-auto transition-all transform-gpu focus:outline-none">
          {children}
        </main>
        <div class="px-2 py-4 grid grid-cols-5 bg-gray-100">
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
    </div>
  )
}
