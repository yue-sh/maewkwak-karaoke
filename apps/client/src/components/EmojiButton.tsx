export const EmojiButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} class="rounded-md bg-gray-100 hover:shadow-sm hover:bg-gray-200 active:scale-95 transition-all flex text-3xl flex-col justify-center items-center py-12 border-0 border-gray-200">
      {children}
    </button>
  )
}
