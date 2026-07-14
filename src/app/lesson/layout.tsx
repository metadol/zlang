type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
  return (
    <div className="bg-white flex flex-col h-full">
      <div className="flex flex-col h-full w-full bg-white ">{children}</div>
    </div>
  );
};

export default LessonLayout;
