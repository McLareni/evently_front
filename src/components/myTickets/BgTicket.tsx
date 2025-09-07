const BgTicket = () => {
  return (
    <div className="absolute inset-0 flex flex-nowrap">
      <div className="bg-lightPurple rounded-l-xl rounded-r-[9px] w-4/5 h-full"></div>
      <div className="bg-lightPurple w-[10%] h-full relative">
        <div className="absolute w-full aspect-[2/1] bg-background bottom-0 right-0 rounded-t-full"></div>
        <div className="absolute w-full aspect-[2/1] bg-background top-0 right-0 rounded-b-full"></div>
      </div>
      <div className="bg-lightPurple w-[10%] h-full relative rounded-r-xl"></div>
    </div>
  );
};

export default BgTicket;
