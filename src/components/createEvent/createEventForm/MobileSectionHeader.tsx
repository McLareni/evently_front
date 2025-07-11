import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface IProps {
    isActive: boolean;
    text: string;
    // eslint-disable-next-line no-unused-vars
    changeActiveSection: (section: string) => void;
}

const MobileSectionHeader: React.FC<IProps> = ({
    isActive,
    text,
    changeActiveSection,
}) => {

    return (
        <div className="flex justify-between items-center py-1 mb-3">
            <h2 className="font-bold text-base font-lato text-textDark">
                {text}
            </h2>
            <button
                type="button"
                className="focus:outline-0"
                onClick={() => changeActiveSection("")}
            >
                {isActive ? (
                    <AiOutlineMinus className="w-6 h-6 fill-textDark" />
                ) : (
                    <AiOutlinePlus className="w-6 h-6 fill-textDark" />
                )}
            </button>
        </div>
    );
};

export default MobileSectionHeader;