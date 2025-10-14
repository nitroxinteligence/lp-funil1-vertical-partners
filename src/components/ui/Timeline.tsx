"use client";
import {
  useScroll,
  useTransform,
  motion,
  useInView,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineItemProps {
  item: TimelineEntry;
}

const TimelineItem = ({ item }: TimelineItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { 
    margin: "-50% 0px -50% 0px"
  });

  return (
    <div
      ref={itemRef}
      className="flex justify-center pt-20 md:pt-80 md:gap-5"
    >
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <div className="h-10 absolute left-8 -translate-x-1/2 md:left-3 md:translate-x-0 w-10 rounded-full flex items-center justify-center bg-[#0f0f0f]">
          <div 
            className={`h-4 w-4 rounded-full border p-2 transition-all duration-300 ${
              isInView 
                ? 'bg-white border-white shadow-[0_0_20px_rgba(255,255,255,0.8)]' 
                : 'bg-neutral-800 border-neutral-700'
            }`} 
          />
        </div>
        <h3 
          className={`hidden md:block text-2xl font-semibold md:pl-20 transition-colors duration-300 ${
            isInView ? 'text-white' : 'text-neutral-500'
          }`}
        >
          {item.title}
        </h3>
      </div>

      <div className="relative pl-20 pr-4 md:pl-4 w-full">
        <h3 
          className={`md:hidden block text-2xl font-semibold mb-4 text-left transition-colors duration-300 ${
            isInView ? 'text-white' : 'text-neutral-500'
          }`}
        >
          {item.title}
        </h3>
        {item.content}
      </div>
    </div>
  );
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, data]); // Re-calculate height if data changes

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans md:px-10"
    >
      <div ref={ref} className="relative max-w-5xl mx-auto pb-4">
        {data.map((item, index) => (
          <TimelineItem key={`timeline-${item.title}-${index}`} item={item} />
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-neutral-600 via-neutral-400 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
