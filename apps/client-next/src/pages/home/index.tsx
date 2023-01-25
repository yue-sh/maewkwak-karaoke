import { TbCalculator, TbMusic, TbPlaylist } from 'react-icons/tb'
import { CTAButton } from '../../modules/apps/home/CTAButton'
import { Layout } from '../../modules/layouts/Layout'
import { Mobile } from '../../modules/layouts/Mobile'

export const HomePage = () => {
  return (
    <Mobile>
      <Layout>
        <div className="grid grid-cols-2 gap-2">
          <CTAButton
            title="ค้นหาชื่อเพลง"
            subtitle="ค้นหาชื่อเพลงง่ายๆด้วยชื่อเพลง"
            className="bg-red-500 hover:bg-red-600 col-span-2"
            icon={<TbMusic size="48px" />}
          />
          <CTAButton
            title="ควบคุม"
            subtitle="เปลี่ยนโทรศัพท์ให้เป็นรีโมท"
            className="bg-blue-500 hover:bg-blue-600"
            icon={<TbCalculator size="48px" />}
          />
          <CTAButton
            title="จัดการคิว"
            subtitle="จัดการคิวเพลงได้ง่ายๆ"
            className="bg-green-500 hover:bg-green-600"
            icon={<TbPlaylist size="48px" />}
          />
        </div>
      </Layout>
    </Mobile>
  )
}
