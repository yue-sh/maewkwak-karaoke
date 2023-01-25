import React, { useRef } from 'react'
import { useState, useEffect } from 'react'

import { BrowserQRCodeReader, BrowserCodeReader } from '@zxing/browser'

interface QRScannerScanOnceProps {
  callback: (result: string) => void
}

const QRScannerScanOnce: React.FC<QRScannerScanOnceProps> = ({ callback }) => {
  const parent = useRef<HTMLVideoElement>(null)
  const [cameraIdx, setCameraIdx] = useState(0)

  useEffect(() => {
    const setUpReader = async () => {
      const codeReader = new BrowserQRCodeReader()
      const videoInputDevices = await BrowserCodeReader.listVideoInputDevices()
      if (videoInputDevices === undefined || videoInputDevices.length === 0) {
        console.log('No video input devices found.')
        return
      }
      const selectedDeviceId =
        videoInputDevices[cameraIdx % videoInputDevices.length]!.deviceId
      codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        parent!.current!,
        (result) => {
          if (!result) return
          callback(result?.getText())
        }
      )
    }
    if (parent.current) {
      setUpReader().then(() => console.log('Camera ready'))
    }
    return () => {
      BrowserCodeReader.releaseAllStreams()
    }
  }, [cameraIdx])

  return (
    <div>
      <video ref={parent}></video>
    </div>
  )
}

export default QRScannerScanOnce
