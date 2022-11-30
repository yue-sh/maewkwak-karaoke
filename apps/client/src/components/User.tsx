import { AiOutlineUser } from 'solid-icons/ai'
import { BiSolidMicrophone } from 'solid-icons/bi'

export const User = ({ title }) => {
  return (
    <div class="flex ml-auto gap-2 items-center text-gray-500">
      <p class="text-sm">{title}</p>
      <BiSolidMicrophone size={24} />
    </div>
  )
}
