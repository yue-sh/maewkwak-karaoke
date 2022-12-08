import { describe, it, expect } from 'vitest'
import { parseJ3kUrl } from './parseUrl'

const realJ3kUrl =
  'http://vod.cnhaimei.com/YKZone/WXPay/UserInfo/UserAuth.php?songurl=http%3A%2F%2F10.0.0.1%3A8080%2FWeixinSong_En%2FIndex.php%3Fip%3D10.0.66.26%26mac%3D24.59.0b.00.e3.b2%26port%3D4168%26mid%3D823030139684'

describe('parseJ3kUrl', () => {
  it('can parse j3k url', () => {
    expect(parseJ3kUrl(realJ3kUrl)).toStrictEqual({
      ip: '10.0.66.26',
      mac: '24.59.0b.00.e3.b2',
      port: '4168',
      mid: '823030139684'
    })
  })
})
