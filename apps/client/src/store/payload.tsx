import { createSignal, createMemo, createRoot } from 'solid-js'

function createPayload() {
  const [payload, setPayload] = createSignal(null)
  const updatePayload = (newPayload) => {
    setPayload(newPayload)
  }
  const getPayloadURL = (event, value) =>
    `http://10.0.0.1:8080/WeixinSong_En/Udp_SelectSong.php?ip=${
      payload().ip
    }&port=${payload().port}&mac=${payload().mac}&mid=${
      payload().mid
    }&cmd=${event}&text=${value}`

  return { payload, updatePayload, getPayloadURL }
}

export default createRoot(createPayload)
