export const User = ({ title }: { title: string }) => {
  return (
    <div className="flex ml-auto gap-2 items-center text-gray-500">
      <p className="text-sm">{title}</p>
    </div>
  )
}
