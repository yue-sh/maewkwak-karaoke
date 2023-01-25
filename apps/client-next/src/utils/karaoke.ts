export interface KaraokePayload {
  ip: string
  mac: string
  port: string
  mid: string
}

export function parseJ3kUrl(url: string) {
  const songurl = url.split('?songurl=')[1]
  const decoded = decodeURIComponent(songurl)
  const urlobj = new URL(decoded)

  return {
    ip: urlobj.searchParams.get('ip'),
    mac: urlobj.searchParams.get('mac'),
    port: urlobj.searchParams.get('port'),
    mid: urlobj.searchParams.get('mid')
  } as KaraokePayload
}