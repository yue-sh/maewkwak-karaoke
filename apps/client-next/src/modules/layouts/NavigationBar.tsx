import { ReactNode } from 'react'
import {
  TbHome,
  TbCalculator,
  TbList,
  TbPlayerRecord,
  TbMusic
} from 'react-icons/tb'
import { Link, useRoute } from 'wouter'

const NavItem = ({
  title,
  icon,
  href
}: {
  title: string
  icon: ReactNode
  href: string
}) => {
  const [isActive] = useRoute(href)

  return (
    <Link href={href}>
      <a
        className={`flex flex-col justify-center items-center gap-2 flex-1 ${
          isActive ? 'text-blue-500' : 'text-zinc-500'
        }`}
      >
        {icon}
        <p className="text-xs">{title}</p>
      </a>
    </Link>
  )
}

export const NavigationBar = () => {
  return (
    <div className="sticky bottom-0 left-0 w-full bg-zinc-100 flex px-2 py-4 transition-all max-w-md mx-auto">
      <NavItem href="/" title="หน้าหลัก" icon={<TbHome size="24px" />} />
      <NavItem
        href="/control"
        title="ควบคุม"
        icon={<TbCalculator size="24px" />}
      />
      <NavItem href="/songs" title="เพิ่มเพลง" icon={<TbMusic size="24px" />} />
      <NavItem href="/queue" title="คิวเพลง" icon={<TbList size="24px" />} />
      <NavItem
        href="/records"
        title="อัดบันทึก"
        icon={<TbPlayerRecord size="24px" />}
      />
    </div>
  )
}
