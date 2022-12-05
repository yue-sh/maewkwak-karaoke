import { A, useMatch } from 'solid-start'

export const NavbarItem = ({ icon, title, route = null }) => {
  const match = useMatch(() => route)

  return (
    <A
      href={route}
      class={
        'flex flex-col transition-all items-center gap-1 ' +
        (Boolean(match()) ? 'text-blue-600' : 'text-gray-600')
      }
    >
      {icon}
      <p class="text-sm">{title}</p>
    </A>
  )
}
