"use client";

import { useEffect, useRef } from "react";

export default function GsapSeamlessVideo({ src, className = "" }: { src: string, className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    const checkLoop = () => {
      // If the video has a bad trailing keyframe causing a hard blink,
      // we proactively force it to loop slightly before EOF.
      if (video.duration && video.currentTime >= video.duration - 0.15) {
        video.currentTime = 0.05; // skip direct to 0.05 immediately bypassing the cut
      }
      rafId = requestAnimationFrame(checkLoop);
    };

    rafId = requestAnimationFrame(checkLoop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <video
      ref={videoRef}
      className={`parallax-video ${className}`}
      autoPlay
      loop
      muted
      playsInline
      src={src}
    />
  );
}
