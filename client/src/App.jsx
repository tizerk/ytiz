import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NavMenu from "./components/NavMenu";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Socials from "./pages/Socials";
import Changelog from "./pages/Changelog";
import "./App.css";

function App() {
  const location = useLocation();
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      className=" m-0 box-border flex h-screen flex-col items-center justify-center overflow-hidden overflow-x-hidden bg-background p-0 font-opensans text-2xl"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 2.5, ease: "easeOut" }}
        className="absolute top-[-50%] h-[80%] w-[60%] rounded-full bg-splash blur-[200px]"
      />
      <NavMenu location={location.pathname} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/socials" element={<Socials />} />
          <Route path="/changelog" element={<Changelog />} />
        </Routes>
      </AnimatePresence>
    </motion.main>
  );
}

export default App;
