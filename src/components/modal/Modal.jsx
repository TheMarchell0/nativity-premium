import React, {useState, useRef, useContext, useEffect} from 'react';
import ModalSuccess from './ModalSuccess';
import ModalBody from './ModalBody';
import useCallAPI from '../../hooks/useCallAPI';
import useToggleBody from '../../hooks/useToggleBody';
import ModalContext from '../modalContext/ModalContext';

const Modal = () => {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const successOverlayRef = useRef(null);
    const successContentRef = useRef(null);
    const [scrollable, setScrollable] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const {callScriptFunction, showLoader} = useCallAPI();
    const {isOpen, closeModal} = useContext(ModalContext);
    const formRef = useRef();

    const closeSuccessModal = () => {
        if (successOverlayRef.current) {
            successOverlayRef.current.style.animation = 'reverseFadeIn 0.3s forwards';
        }

        if (successContentRef.current) {
            successContentRef.current.style.animation = 'reverseSlideUp 0.3s forwards';
        }

        setTimeout(() => {
            setOpenSuccessModal(false);
        }, 300);
    };

    const openSuccessModalFunc = () => {
        setOpenSuccessModal(true);
    };

    const handleClose = () => {
        setScrollable(false);

        if (overlayRef.current) {
            overlayRef.current.style.animation = 'reverseFadeIn 0.3s forwards';
        }

        if (contentRef.current) {
            contentRef.current.style.animation = 'reverseSlideUp 0.3s forwards';
        }

        setTimeout(() => {
            closeModal();
        }, 300);
    };

    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current && window.innerHeight < contentRef.current.offsetHeight) {
                setScrollable(true);
            } else {
                setScrollable(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);

    useToggleBody(isOpen || openSuccessModal);

    const onSubmit = async (data) => {
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbxW72e2UteLpG-cFjLBtbL3tqLcOj-Mlri3k3okdzRx_xXu4t__NsKF0BbhSSeeZKg/exec';
        await callScriptFunction(scriptUrl, formRef.current);
        handleClose();
        openSuccessModalFunc();
    };

    const handleOverlayClick = () => {
        handleClose();
    };

    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div ref={overlayRef} className="modal__overlay" onClick={handleOverlayClick}></div>
                    <ModalBody contentRef={contentRef} scrollable={scrollable} showLoader={showLoader}
                               handleSubmit={handleOverlayClick} formRef={formRef} onSubmit={onSubmit}/>
                </div>
            )}
            <ModalSuccess overlayRef={successOverlayRef} contentRef={successContentRef} openSuccessModal={openSuccessModal} closeSuccessModal={closeSuccessModal}/>
        </>
    );
};

export default Modal;
