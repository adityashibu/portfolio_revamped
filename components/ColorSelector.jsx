"use client";

import { useRetroMode, ACCENT_COLORS } from "./RetroModeContext";

const ColorSelector = () => {
  const { accentColor, changeAccentColor } = useRetroMode();

  return (
    <div className="flex gap-2 items-center px-2 py-1">
      <span className="text-[9px] text-white/20 uppercase tracking-tighter mr-1 font-primary hidden sm:block">Theme:</span>
      <div className="flex gap-1.5">
        {ACCENT_COLORS.map((color) => (
          <button
            key={color.name}
            onClick={() => changeAccentColor(color)}
            className={`w-3 h-3 rounded-full transition-all duration-300 border ${
              accentColor.name === color.name ? "border-white scale-125" : "border-transparent"
            }`}
            style={{ backgroundColor: color.primary }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
