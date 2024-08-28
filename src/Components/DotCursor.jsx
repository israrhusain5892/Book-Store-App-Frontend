// import React, { useEffect } from "react";
// import { motion, useMotionValue, useSpring } from "framer-motion";

// const DotCursor = () => {
//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);

//   const springConfig = { damping: 30, stiffness: 300 };
//   const outerX = useSpring(cursorX, springConfig);
//   const outerY = useSpring(cursorY, springConfig);

//   useEffect(() => {
//     const moveCursor = (e) => {
//       cursorX.set(e.clientX );
//       cursorY.set(e.clientY );
//     };

//     window.addEventListener("mousemove", moveCursor);

//     return () => {
//       window.removeEventListener("mousemove", moveCursor);
//     };
//   }, [cursorX, cursorY]);

//   return (
//     <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
//       {/* Outer circle with low opacity */}
//       <motion.div
//         className="absolute w-12 h-12 bg-pink-500 rounded-full opacity-30"
//         style={{ x: outerX, y: outerY, translateX: "-50%", translateY: "-50%" }}
//       />

//       {/* Inner dot */}
//       <motion.div
//         className="absolute w-3 h-3 bg-black rounded-full"
//         style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
//       />
//     </div>
//   );
// };

// export default DotCursor;
