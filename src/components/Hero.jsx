import React, { useEffect, useState } from "react";
import { BiLogoDevTo } from "react-icons/bi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Hero = () => {
  //dark mode start
  const [theme, setTheme] = useState(localStorage.theme || "light");
  useEffect(() => {
    const root = window.document.documentElement;
    // root is basically our html tag in index.html
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  function toggleTheme() {
    setTheme(() => (theme === "dark" ? "light" : "dark"));
  }
  //dark mode end
  return (
    <header className="w-full flex justify-center items-center flex-col  ">
      <nav className="flex justify-between items-center  w-full mb-10 pt-3">
        <BiLogoDevTo className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => window.open("https://google.com")}
          className="black_btn "
        >
          source code
        </button>{" "}
        <button onClick={toggleTheme} className="">
          {theme === "dark" ? (
            <MdOutlineLightMode size={20} />
          ) : (
            <MdOutlineDarkMode size={20} />
          )}
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAi</span>
      </h1>
      <h2 className="desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
        velit quis esse sapiente. Corrupti odio ab facilis iusto quibusdam
        dolores, assumenda vel illum hic asperiores dicta quia et voluptatibus
        harum!
      </h2>
    </header>
  );
};

export default Hero;
