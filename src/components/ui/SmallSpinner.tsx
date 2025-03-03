const SmallSpinner = () => {
  return (
    <div className="flex justify-center">
      <div
        className="w-16 h-16 border-4 border-gray
                          border-t-transparent rounded-full 
                          animate-spin"
      ></div>
    </div>
  );
};

export default SmallSpinner;
