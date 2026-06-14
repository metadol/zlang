type Props = {
  children: React.ReactNode;
};
export const FeedWrapper = ({ children }: Props) => {
  return (
    <div className="flex-1 bg-purple-600 relative top-0">
      <div className="">
        {children}
      </div>
    </div>
  );
};
