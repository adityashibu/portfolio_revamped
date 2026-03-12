"use client";

import { useRetroMode } from "./RetroModeContext";
import { Button } from "./ui/button";

const RetroModeToggle = () => {
  const { isRetro, toggleRetro } = useRetroMode();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleRetro}
      className="border-accent text-accent hover:bg-accent hover:text-primary transition-all text-xs font-primary px-3 py-1 uppercase tracking-tighter"
    >
      RETRO_MODE: {isRetro ? "ON" : "OFF"}
    </Button>
  );
};

export default RetroModeToggle;
