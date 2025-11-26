import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NavMenu from "./components/NavMenu";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Socials from "./pages/Socials";
import Changelog from "./pages/Changelog";
import "./App.css";
import useMediaQuery from "./components/hooks/useMediaQuery";
import Snowfall from "react-snowfall";
import Kofi from "../public/assets/kofi.svg";

function App() {
  const [colorTheme, setColorTheme] = useState("violet");
  const isDesktop = useMediaQuery("(min-width: 640px)");
  useEffect(() => {
    const themes = ["violet", "blue", "green", "rose", "orange"];
    const randomIndex = Math.floor(Math.random() * themes.length);
    setColorTheme(themes[randomIndex]);
  }, []);
  const location = useLocation();
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      className="m-0 box-border flex h-[100svh] flex-col items-center justify-center overflow-hidden overflow-x-hidden bg-gray-950 p-0 font-nunito text-2xl"
    >
      <Snowfall
        color={
          colorTheme === "violet"
            ? "#c0abff"
            : colorTheme === "blue"
              ? "#a0d8ff"
              : colorTheme === "green"
                ? "#a0ffa0"
                : colorTheme === "rose"
                  ? "#ffa0a0"
                  : "#ffcc80"
        }
        snowflakeCount={6}
        radius={[1, 3]}
        speed={[0.1, 1]}
        wind={[-0.1, 0.1]}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 2.5, ease: "easeOut" }}
        className={`absolute	top-[-50%] h-[45%] w-[60%] rounded-full ${colorTheme === "green" ? "bg-green-700" : colorTheme === "rose" ? "bg-rose-700" : colorTheme === "blue" ? "bg-blue-700" : colorTheme === "violet" ? "bg-violet-700" : "bg-orange-800"}	blur-[150px]`}
      />
      <NavMenu colorTheme={colorTheme} location={location.pathname} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home colorTheme={colorTheme} />} />
          <Route path="/faq" element={<FAQ colorTheme={colorTheme} />} />
          <Route path="/socials" element={<Socials />} />
          <Route path="/changelog" element={<Changelog />} />
        </Routes>
      </AnimatePresence>
    </motion.main>
  );
}

export default App;
