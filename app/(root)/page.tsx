"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SplineBackground from "@/components/SplineBackground";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import GetStartedbtn from "@/components/GetStartedbtn";
// import HomePlay from "@/components/HomePlay";
import Testimonials from "@/components/Testimonials";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Hero section with Spline */}
      <section className="relative min-h-[600px] rounded-3xl overflow-hidden mb-12 flex">
        {/* Left content */}
        <div className="relative z-20 flex flex-col justify-center p-16 max-sm:p-8 w-full md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-xl text-on-spline tracking-tight leading-tight">
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-lg text-on-spline leading-relaxed">
            Practice on real interview questions & get instant feedback
          </p>
          <Link href="/sign-up">
            <GetStartedbtn />
          </Link>
        </div>

        {/* Right side with Spline 3D robot */}
        <div className=" w-full md:relative md:w-1/2 h-full md:rounded-3xl overflow-hidden md:relative">
          <SplineBackground
            sceneUrl="https://prod.spline.design/2goG9T1bI53vr8nb/scene.splinecode"
            className="h-full w-full"
          />
        </div>
      </section>

      {/* Existing content */}
      <div className="flex justify-center content-center mt-6 items-center">
        <div className="gap-x-1">
          <div className="sm:text-5xl text-2xl text-white text-center font-light">
            Where everyone
            <div className="sm:text-7xl text-4xl mt-1.5 text-white font-bold text-center leading-[1.2] tracking-tight">
              suffers together
            </div>
            <div className="gap-2 pl-5 pr-5">
              <p className="sm:text-2xl text-[16px] text-center mt-3 justify-center items-center leading-relaxed">
                We know how brutal interviews can be. They don't have to be.
              </p>
              <p className="sm:text-2xl text-[16px] text-center justify-center items-center leading-relaxed">
                Generate personalized mock interviews, watch how others handled
                theirs,
              </p>
              <p className="sm:text-2xl text-[16px] text-center justify-center items-center leading-relaxed">
                and get feedback that actually helps.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center text-center">
        <Link href="/sign-up">
          <GetStartedbtn />
        </Link>
        {/* Removed the glow-border div */}
      </div>

      {/* <div className="relative z-20">
        <HomePlay />
      </div> */}

      <div className="flex flex-col items-center">
        <section className="max-w-4xl px-4 text-center mt-[-50]">
          <div className="sm:text-4xl text-2xl mt-7 text-white font-bold text-center leading-[1.2] tracking-tight">
            WHY CHOOSE US
          </div>
          <div className="text-white text-2xl mt-3 sm:text-6xl font-bold tracking-tight leading-tight">
            Unleash Your Potential with AI
          </div>
          <div className="text-white text-[20px] mt-3 leading-relaxed">
            Take your interview preparation to the next level with features
            designed for success.
          </div>
        </section>

        <section className="relative w-screen justify-center items-center flex overflow-hidden">
          <div className="mt-10">
            <Features />
          </div>
        </section>
      </div>

      <div className="relative z-10">
        <Testimonials />
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
