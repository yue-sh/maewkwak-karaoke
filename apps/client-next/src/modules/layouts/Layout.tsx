import { ReactNode } from 'react'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="block">
      <div className="p-3 space-y-4">{children}</div>
    </div>
  )
}
