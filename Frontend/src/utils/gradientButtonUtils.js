export const buttonSizes = {
  small: "px-5 py-2 text-[14px]",
  normal: "px-6 py-2.5 text-[14px]",
  large: "px-8 py-3.5 text-[16px]",
  xl: "px-8 py-4 text-[15px]",
};

export const gradientButtonBaseClasses = `
  bg-gradient-to-r from-[#004ac6] to-[#57dffe]
  text-white
  font-medium
  rounded-xl
  shadow-[0_10px_25px_-5px_rgba(0,74,198,0.4)]
  hover:-translate-y-1
  hover:shadow-lg
  transition-all
  duration-300
  flex
  items-center
  justify-center
  group
  disabled:opacity-70
  disabled:pointer-events-none
`;