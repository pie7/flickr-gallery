import { useEffect } from "react";
import ReactPortal from "./ReactPortal";

const Modal = ({ children, isOpen = false, handleClose }: {
    handleClose?: () => void;
    children?: React.ReactNode;
    isOpen: boolean
}) => {
    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (handleClose) {
                    handleClose()
                }
            }
        }
        const ev = document.addEventListener("keydown", closeOnEscapeKey);
        return () => ev
    }, [handleClose]);

    if (!isOpen) return null;

    return (
        <ReactPortal wrapperId="react-portal-modal-container">
            <button className='w-full h-full fixed inset-0 bg-black opacity-30 cursor-default'
                onClick={() => handleClose && handleClose()}
                tabIndex={-1}
            />
            <div className="modal bg-white w-10/12 rounded-lg max-w-lg fixed m-auto inset-0 h-3/5 sm:h-4/5 overflow-hidden">
                <div className="flex justify-end p-3">
                    <button onClick={handleClose} className="close-btn">
                        X
                    </button>
                </div>
                <div className="modal-content p-3">{children}</div>
            </div>
        </ReactPortal>
    );
};
export default Modal;