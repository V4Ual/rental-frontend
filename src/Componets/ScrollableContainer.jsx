import React, { useRef } from 'react';

const ScrollableContainer = ({ children }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };

  return (
    // <div className="relative">
      <>
      
      <div className="m-5 flex justify-between text-center space-x-10 relative">
        <button onClick={scrollLeft}>
          <i
            className="fa fa-arrow-circle-o-left text-5xl bg-orange-400 border-1 rounded-full font-bold border-orange-400"
            aria-hidden="true"
          ></i>
        </button>
        <button onClick={scrollRight}>
          <i
            className="fa fa-arrow-circle-o-right text-5xl bg-orange-400 border-1 rounded-full font-bold border-orange-400"
            aria-hidden="true"
          ></i>
        </button>
      </div>


      <div
        ref={scrollContainerRef}
        className="flex max-h-full w-full gap-2 overflow-auto bg-white pb-10 pt-10"
      >
        {children}
      </div>
      </>
  );
};

export default ScrollableContainer;
