import { NavLink } from 'react-router-dom';

import { Modal, SharedBtn } from '../ui';

interface IProps {
  isOpen: boolean;
  clickYes: () => void;
  onClose: () => void;
}

const TabModal: React.FC<IProps> = ({ isOpen, onClose, clickYes }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} hiddenCross>
      <div className="border border-buttonPurple rounded-[20px] bg-lightBlue py-6 px-8 lg:w-[362px] w-[340px] text-center">
        <p className="lg:text-2xl text-base text-textDark font-lato lg:mx-6">
          Ви впевнені, що хочете вийти ?
        </p>
        <div className="flex justify-between lg:mt-6 mt-5">
          <NavLink to={'/'}>
            <SharedBtn
              type="button"
              primary
              className="w-[120px] h-8 !py-0"
              onClick={clickYes}
            >
              Taк
            </SharedBtn>
          </NavLink>
          <SharedBtn
            type="button"
            secondary
            className="w-[120px] h-8 !py-0 text-textDark"
            onClick={onClose}
          >
            Ні
          </SharedBtn>
        </div>
      </div>
    </Modal>
  );
};

export default TabModal;
