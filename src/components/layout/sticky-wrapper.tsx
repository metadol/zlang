type Props = {
  children: React.ReactNode;
};
export const StickyWrapper = ({ children }: Props) => {
  return (
    <div className="hidden bg-lime-400 lg:block w-[368px] sticky self-end bottom-4">
      <div className="min-h-[calc(100vh-48px)] sticky top-6 flex flex-col gap-y-4">
        {children}
      </div>
    </div>
  );
};
