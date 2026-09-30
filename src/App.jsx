import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import ScrollManager from './components/layout/ScrollManager';
import Footer from './components/shared/Footer';
import NewsletterSignupSection from './components/shared/NewsletterSignupSection';
import Home from './pages/Home';
import About from './pages/About';
import Give from './pages/Give';
import Faqs from './pages/Faqs';

export default function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/faqs' element={<Faqs />} />
          <Route path='/give' element={<Give />} />
        </Routes>
      </main>
      <NewsletterSignupSection />
      <Footer />
    </>
  );
}
