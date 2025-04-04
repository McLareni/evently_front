interface DetailsProps {
  title: string | undefined;
  details: string | undefined;
}

export const Details: React.FC<DetailsProps> = ({ title, details }) => {
  return (
    <div className="border-buttonPurple rounded-[10px] border-[2px] px-[16px] py-[14px]">
      <p>
        <span className="text-[24px] font-medium">{title} </span>
        {details}
      </p>
    </div>
  );
};
