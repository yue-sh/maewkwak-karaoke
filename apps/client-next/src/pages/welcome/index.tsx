import { Mobile } from '../../modules/layouts/Mobile'
import { Button } from '../../modules/shareds/Button'
import QrReader from '../../modules/shareds/QrReader'
import { useManekiContext } from '../../providers/ManekiProvider'

export const WelcomePage = () => {
  const { action } = useManekiContext()

  return (
    <Mobile hideNavigation>
      <div className="text-center py-8 space-y-8">
        <section>
          <img src="/logo.png" alt="Meawkwak karaoke" className="mx-auto" />
        </section>
        <section className="space-y-0">
          <h1 className="text-2xl font-bold text-zinc-700">ยินดีต้อนรับ 👋</h1>
          <p className="text-sm text-zinc-500">แสกน QR Code เพื่อดำเนินการ</p>
        </section>
        <section className="px-8">
          <div className="overflow-hidden rounded-2xl">
            <QrReader callback={(m) => action.initPayload(m)} />
          </div>
        </section>
        <section className="px-8">
          <Button>หากไม่สามารถแสกนได้</Button>
        </section>
      </div>
    </Mobile>
  )
}
