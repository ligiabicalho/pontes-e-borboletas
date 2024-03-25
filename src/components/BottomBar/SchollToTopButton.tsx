import React from "react";
import { ChevronsUp } from "lucide-react";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div onClick={scrollToTop} className="flex pl-1 cursor-pointer">
      <ChevronsUp color={"gray"} size={16} className="h-8 focus:outline-none" />
    </div>
  );
};

export default ScrollToTopButton;
