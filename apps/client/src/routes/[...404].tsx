import { MobileLayout } from '~/layouts/MobileLayout'

export default function NotFound() {
  return (
    <MobileLayout>
      <div class="p-6">
        <img
          class="rounded-lg transition-all hover:scale-50 transform"
          src="https://pbs.twimg.com/media/FDZGuVMWUAIrJh6.jpg"
        />
        <p class="text-center mt-4 text-xl">Not Found</p>
      </div>
    </MobileLayout>
  )
}
