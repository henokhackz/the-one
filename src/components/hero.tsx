"use client";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { AnimatedText } from "./animated-text";
import { Typewriter } from "./type-effect";

export function Hero() {
  return (
    <LampContainer>
      <AnimatedText/>
      <Typewriter/>
    </LampContainer>
  );
}
