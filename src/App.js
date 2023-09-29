import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ModalProvider } from "./components/modalContext/ModalContext";
import Modal from "./components/modal/Modal";

function App() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const checkScreenWidth = () => setScreenWidth(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', checkScreenWidth);

        return () => {
            window.removeEventListener('resize', checkScreenWidth);
        }
    }, []);

    useEffect(() => {
        if(screenWidth > 1024) {
            gsap.to('.App', {
                duration: 1,
                opacity: 1,
                ease: 'power1.out',
            });
        }
    }, [screenWidth]);

    return (
        <div className="App" style={screenWidth > 1024 ? { opacity: 0 } : {}}>
            <ModalProvider>
                <Header />
                <Main />
                <Modal />
                <Footer />
            </ModalProvider>
        </div>
    );
}

export default App;
