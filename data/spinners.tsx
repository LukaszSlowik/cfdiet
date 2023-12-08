"use client";
import {
  Pizza,
  Apple,
  Grape,
  Utensils,
  Citrus,
  Banana,
  IceCream,
  IceCream2,
  Soup,
  Cherry,
  Cookie,
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { type } from "os";

export const spinners = [
  <Pizza key={"pizza"} className="w-12 h-12 text-orange-400   " />,
  <Apple key={"Apple"} className="w-12 h-12 text-green-400  " />,
  <Grape key={"Grape"} className="w-12 h-12 text-green-400  " />,
  <Utensils key={"Utensils"} className="w-12 h-12 text-green-400  " />,
  <Citrus key={"Citrus"} className="w-12 h-12 text-yellow-400  " />,
  <Banana key={"Banana"} className="w-12 h-12 text-yellow-400  " />,
  <IceCream key={"IceCream"} className="w-12 h-12 text-blue-400  " />,
  <IceCream2 key={"IceCream2"} className="w-12 h-12 text-blue-400  " />,
  <Soup key={"Soup"} className="w-12 h-12 text-blue-400  " />,
  <Cherry key={"Cherry"} className="w-12 h-12 text-blue-400  " />,
  <Cookie key={"Cookie"} className="w-12 h-12 text-amber-600  " />,
];

type Props = {
  children: React.ReactNode;
};

export const RandomSpinnerFoodWrapper = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ x: "-75%" }}
      animate={{
        x: ["-75%", "75%"],
        rotate: [0, 360],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
      className="text-center p-4"
    >
      {/* <Pizza className="w-12 h-12 text-blue-600 animate-spin" /> */}
      {children}
      <span className="sr-only">Loading...</span>
    </motion.div>
  );
};
