import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [buttonState, setButtonState] = useState("Idle");

  const shutdownProgress = useMotionValue(0);
  const rightOffset = useTransform(
    shutdownProgress,
    (value) => `${100 - value}%`,
  );

  const handlePointerDown = () => {
    setButtonState("In Progress");
    const progressAnimation = animate(shutdownProgress, 100, {
      duration: 1.5,
      ease: "linear",
    });
    progressAnimation.then(() => {
      if (shutdownProgress.get() !== 100) return;
      setButtonState("Complete");
    });
  };

  const handlePointerUp = () => {
    shutdownProgress.stop();
    setButtonState("Idle");
    animate(shutdownProgress, 0, { duration: 0.1, ease: "linear" });
    if (buttonState === "Complete") {
      shutdownProgress.jump(0);
    }
  };

  return (
    <section className="h-screen bg-neutral-950">
      <div className="mx-auto flex h-full w-[90%] items-center justify-center">
        <motion.button
          className="bg-fire-engine-red-500 border-fire-engine-red-700 relative flex h-10 w-[190px] items-center justify-center gap-3 overflow-hidden rounded-lg border font-medium text-white active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onContextMenuCapture={(e) => e.preventDefault()}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") {
              handlePointerUp();
            }
          }}
          animate={{
            rotate: buttonState === "In Progress" ? [-1, 1] : 0,
            x: buttonState === "In Progress" ? [-1, 1] : 0,
          }}
          transition={{
            duration: 0.1,
            repeat: buttonState === "In Progress" ? Infinity : 0,
            repeatType: "mirror",
            ease: "circInOut",
          }}
        >
          <motion.div
            className="bg-fire-engine-red-700 absolute bottom-0 left-0 top-0"
            style={{
              right: rightOffset,
            }}
          ></motion.div>
          {buttonState === "Idle" && (
            <FontAwesomeIcon icon={faTrashCan} className="z-10" />
          )}
          <span className="z-10 select-none">
            {buttonState === "Idle"
              ? "Delete account"
              : buttonState === "Complete"
                ? "Release to confirm"
                : "Hold to confirm"}
          </span>
        </motion.button>
      </div>
    </section>
  );
}

export default App;
