import { ReactNode } from 'react'
import { NavigationBar } from './NavigationBar'

export const Mobile = ({
  children,
  hideNavigation
}: {
  children: ReactNode
  hideNavigation?: boolean
}) => {
  return (
    <>
      <div
        className={`block bg-white max-w-md mx-auto relative ${
          hideNavigation ? 'h-screen' : 'full-height'
        }`}
      >
        {children}
      </div>
      {!hideNavigation && <NavigationBar></NavigationBar>}
    </>
  )
}
