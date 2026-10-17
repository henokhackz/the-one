"use client";

import React from "react";

/**
 * Manuscript Binding Thread
 * A 2px vertical gold stitch on the left edge that fills with scroll progress.
 * Uses pure CSS scroll-driven animations with animation-timeline: scroll(root) inside @supports.
 * No JavaScript scroll listener is used.
 */
export function BindingThread() {
  return (
    <div
      aria-hidden="true"
      className="binding-thread fixed left-0 top-0 bottom-0 w-[2px] z-50 pointer-events-none"
    />
  );
}
