export const CTAButton = ({ title, subtitle, boxClass, icon }) => {
  return (
    <div
      class={
        'transition-all rounded-xl min-h-[10rem] text-white p-[1rem] relative cta-box ' +
        boxClass
      }
    >
      <p class="text-2xl font-bold">{title}</p>
      <p class="text-sm">{subtitle}</p>
      <div class="absolute bottom-4 right-4 transition-all on-hover">
        {icon}
      </div>
    </div>
  )
}
