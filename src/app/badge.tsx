import React from "react";

const DevBadge = () => {
  return (
    // Container: Adjust size based on screen width
    // Default (mobile): w-12 h-12 (48px)
    // Medium screens and up (md): w-16 h-16 (64px)
    <div className="fixed top-0 left-0 z-50 w-12 h-12 md:w-16 md:h-16 overflow-hidden pointer-events-none">
      {/* Banner: Adjust position, width, and text size based on screen width */}
      <div
        className="
          absolute
          // Base (mobile) styles: Scaled down position & width
          left-[-27px] top-[9px] w-[90px] text-[10px]
          // Medium screen (md) overrides: Revert to original/larger styles
          md:left-[-36px] md:top-[12px] md:w-[120px] md:text-[12px]
          // Common styles
          rotate-[-45deg]
          bg-primary text-white
          font-bold text-center
          py-0.5 // Padding might be okay, or use md:py-1 if needed
          shadow-sm
        "
        // Note: The exact pixel values for the smaller size (-27px, 9px, 90px) are approximations
        // derived by scaling down the original values relative to the container size change (48px/64px = 0.75).
        // You might need to slightly adjust these based on visual testing.
      >
        Test Mode
      </div>
    </div>
  );
};

export default DevBadge;
