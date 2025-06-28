interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`w-full px-[16px] lg:px-[60px] ${className}`}>
      {children}
    </div>
  );
};
