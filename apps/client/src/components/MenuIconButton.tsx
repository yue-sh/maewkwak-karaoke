export const MenuIconButton = ({
  colorClass = 'bg-gray-200 border-gray-300',
  icon,
  title
}) => {
  return (
    <button onClick={() => alert('Triggered')}>
      <div
        class={
          'border-0 text-gray-600 transition-all rounded-full flex justify-center items-center aspect-square ' +
          colorClass
        }
      >
        {icon}
      </div>
      <p class="text-center mt-2 text-gray-500">{title}</p>
    </button>
  )
}
