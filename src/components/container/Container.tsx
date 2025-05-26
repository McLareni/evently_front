interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`w-full pl-[14px] pr-[10px] lg:px-[60px] ${className}`}>
      {children}
    </div>
  );
};
