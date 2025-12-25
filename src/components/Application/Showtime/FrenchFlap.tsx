interface FrenchFlapProps {
  position: "start" | "end";
}

const FrenchFlap = ({position}: FrenchFlapProps) => {
  return (
    <div
      className={`
        absolute top-0 w-16 h-32 bg-stone-200 dark:bg-stone-800
        ${position === "start" ? "left-0 rounded-br-2xl" : "right-0 rounded-bl-2xl"}
        shadow-lg shadow-stone-400/30 dark:shadow-stone-900/50
        transform-gpu
      `}
      style={{
        clipPath: position === "start"
          ? 'polygon(0 0, 100% 0, 100% 100%, 0 70%)'
          : 'polygon(0 0, 100% 0, 100% 70%, 0 100%)'
      }}
    />
  );
}

export default FrenchFlap;