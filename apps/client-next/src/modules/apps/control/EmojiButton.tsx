import { useManekiContext } from '../../../providers/ManekiProvider'

export const EmojiButton = ({
  children,
  id
}: {
  children: React.ReactNode
  id: string
}) => {
  const { action } = useManekiContext()

  return (
    <button
      onClick={() => action.sendAction('danmu0', `Remote|${id}`)} // Will use "Remote" username for now
      className="rounded-xl bg-gray-100 hover:shadow-sm hover:bg-gray-200 active:scale-95 transition-all flex text-3xl flex-col justify-center items-center py-12 border-0 border-gray-200"
    >
      {children}
    </button>
  )
}
