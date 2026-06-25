export const TooltipArrow = () => {
  return (
    <svg
      className="absolute left-1/2 -translate-x-1/2 -bottom-[6.5px]"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0 L14 0 L7 7 Z" fill="white" />
      <path
        d="M0 0 L7 7 L14 0"
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
