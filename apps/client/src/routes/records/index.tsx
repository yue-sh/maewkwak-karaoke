import { RecordItem } from '~/components/RecordItem'
import { MobileLayout } from '~/layouts/MobileLayout'

export default function Records() {
  return (
    <MobileLayout>
      <div class="space-y-4 p-4">
        <p class="text-sm text-gray-500">
          ผลจากการอัดเสียง <b>5 รายการ</b>
        </p>

        <div class="space-y-1">
          <RecordItem></RecordItem>
        </div>
      </div>
    </MobileLayout>
  )
}
