type Props = {
  children: React.ReactNode;
};
export const FeedWrapper = ({ children }: Props) => {
  return (
    <div className="flex-1 bg-white relative top-0 pb-10">
      <div className="">
        {children}
      </div>
    </div>
  );
};
