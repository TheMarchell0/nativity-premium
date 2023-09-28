import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import {useEffect} from 'react';
import gsap from 'gsap';



function App() {
    useEffect(() => {
        window.onload = () => {
            gsap.to('.App', {
                duration: 1,
                opacity: 1,
                ease: 'power1.out',
            });
        };
    }, []);

    return (
        <div className="App" style={{opacity: 0}}>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}

export default App;
