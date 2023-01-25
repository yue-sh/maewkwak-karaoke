import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useState } from 'react'
import { KaraokePayload, parseJ3kUrl } from '../utils/karaoke'

const MANEKI_BASE_URL = 'http://10.0.0.1:8080/WeixinSong_En/Udp_SelectSong.php'

type ManekiContextType = {
  payload: KaraokePayload | null
  action: {
    initPayload: (url: string) => void
    sendAction: (action: string, value: string) => void
  }
}
const ManekiContext = createContext<ManekiContextType | null>(null)

export const useManekiContext = () => {
  return useContext(ManekiContext) as ManekiContextType
}

export const ManekiProvider = ({ children }: { children: React.ReactNode }) => {
  const [payload, setPayload] = useState<KaraokePayload | null>()

  const { mutate: sendAction } = useMutation({
    mutationFn: ({ action, value }: { action: string; value: string }) => {
      const newPayload = {
        ...payload,
        cmd: action,
        text: value
      }
      const URL =
        MANEKI_BASE_URL + '?' + new URLSearchParams(newPayload).toString()
      return fetch(URL)
    }
  })

  const value = {
    payload: payload || null,
    action: {
      initPayload: (url: string) => {
        setPayload(parseJ3kUrl(url))
      },
      sendAction: (action: string, value: string) => {
        sendAction({
          action,
          value
        })
      }
    }
  }

  return (
    <ManekiContext.Provider value={value}>{children}</ManekiContext.Provider>
  )
}
