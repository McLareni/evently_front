export const LayoutHorizontalLines: React.FC = () => {
  return (
    <div
      className="absolute top-[110px] z-10 w-full h-[20px] flex flex-col
    justify-between translate-x-[-50%] left-[50%]"
    >
      <div className="h-[1px] bg-lightPurple" />
      <div className="h-[1px] bg-lightPurple" />
    </div>
  );
};
