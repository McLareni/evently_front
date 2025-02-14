import { Modal, SharedBtn } from '../ui';

interface IProps {
  text: string;
  isOpen: boolean;
  clickYes: () => void;
  onClose: () => void;
}

const ModalAdmin: React.FC<IProps> = ({ text, isOpen, onClose, clickYes }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} hiddenCross>
      <div className="border border-buttonPurple rounded-[20px] bg-lightBlue py-6 px-8 w-[362px] text-center">
        <p className="text-2xl text-textDark font-lato">{text}</p>
        <div className="flex justify-between mt-6">
          <SharedBtn
            type="button"
            primary
            className="w-[120px] h-8 !py-0"
            onClick={clickYes}
          >
            Taк
          </SharedBtn>
          <SharedBtn
            type="button"
            secondary
            className="w-[120px] h-8 !py-0"
            onClick={onClose}
          >
            Ні
          </SharedBtn>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAdmin;
