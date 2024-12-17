export const UploadButton = () => {
  const labelStyles = `w-[150px] h-[150px] bg-uploadBtnBg rounded-full
  flex justify-center items-center cursor-pointer relative overflow-hidden`;

  return (
    <div className="relative overflow-hidden">
      <input
        id="avatar"
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
      />
      <label htmlFor="avatar" className={labelStyles}>
        <img
          src="/images/user-logo.jpg"
          width={150}
          height={150}
          alt="user logo"
        />
      </label>
    </div>
  );
};
