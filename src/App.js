import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import { useEffect} from 'react';
import gsap from 'gsap';
import { ModalProvider } from "./components/modalContext/ModalContext";
import Modal from "./components/modal/Modal";

function App() {
    useEffect(() => {
            gsap.to('.App', {
                duration: 1,
                opacity: 1,
                ease: 'power1.out',
            });
    }, []);

    return (
        <div className="App" style={{opacity: 0}}>
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
