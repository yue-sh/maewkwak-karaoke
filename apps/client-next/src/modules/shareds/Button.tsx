import { ButtonHTMLAttributes } from 'react'

export const Button = ({ children, ...rest }: ButtonHTMLAttributes<any>) => (
  <button
    {...rest}
    type="button"
    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#EAA86E] text-white hover:bg-[#E69F5E] focus:outline-none focus:ring-2 focus:ring-[#E7A76C] focus:ring-offset-2 transition-all text-sm w-full"
  >
    {children}
  </button>
)
