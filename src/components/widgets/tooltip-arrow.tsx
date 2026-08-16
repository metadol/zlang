export const TooltipArrowBottom = () => {
  return (
    <svg
      className="absolute left-1/2 -translate-x-1/2 -bottom-[6.5px]"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0 L14 0 L7 7 Z" fill="hsl(var(--card))" />
      <path
        d="M0 0 L7 7 L14 0"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const TooltipArrowLeft = () => {
  return (
    <svg
      className="absolute -left-[8.6px] -translate-x-1/2 top-[12px]"
      width="18"
      height="20"
      viewBox="0 0 18 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.00358 19.0909H18V0.909058L0.624575 15.9561C-0.682507 17.088 0.198558 19.0909 2.00358 19.0909Z"
        fill="hsl(var(--background))"
      />
      <path
        d="M18 2.48935V0L0.83037 15.6255C-0.943477 17.2398 0.312833 20 2.82143 20H18V18.2916H16.1228H2.82143C1.98523 18.2916 1.56646 17.3716 2.15774 16.8335L16.1228 4.12436L18 2.48935Z"
        fill="hsl(var(--border))"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
};
