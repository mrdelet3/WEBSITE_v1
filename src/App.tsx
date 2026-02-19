import { Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Home } from '@/pages/Home';
import { Store } from '@/pages/Store';
import { Checkout } from '@/pages/Checkout';
import { Toaster } from 'sonner';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ScrollToAnchor } from '@/components/ScrollToAnchor';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from '@/components/animations/PageTransition';

function App() {
  const location = useLocation();

  // Logic to prevent remounting when moving between store collection and product detail
  const getRouteKey = () => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts[0] === 'store') {
      // Return /store/:category for both /store/category and /store/category/product/id
      return `/store/${parts[1] || ''}`;
    }
    return location.pathname;
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-bg-warm dark:bg-bg-dark text-charcoal dark:text-off-white transition-colors duration-500">
      <ScrollToTop />
      <ScrollToAnchor />
      <Toaster position="bottom-right" theme="system" />
      <Sidebar />

      <main className="flex-grow lg:ml-64 w-full">
        <AnimatePresence mode="wait">
          <Routes location={location} key={getRouteKey()}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />

            <Route path="/store" element={<PageTransition><Store /></PageTransition>} />
            <Route path="/store/:category" element={<PageTransition><Store /></PageTransition>} />
            <Route path="/store/:category/product/:id" element={<PageTransition><Store /></PageTransition>} />

            <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
            <Route path="*" element={<div className="p-20 text-center">404 Not Found</div>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
