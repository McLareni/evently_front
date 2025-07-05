import React, { ReactElement } from 'react';

interface IProps {
  children: ReactElement;
}

const SectionLayout: React.FC<IProps> = ({ children }) => {
  return (
    <section className="border border-buttonPurple rounded-[10px] p-4">
      {children}
    </section>
  );
};

export default SectionLayout;
