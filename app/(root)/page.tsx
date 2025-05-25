"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SplineBackground from "@/components/SplineBackground";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import GetStartedbtn from "@/components/GetStartedbtn";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Hero section with Spline */}
      <section className="relative min-h-[80px] rounded-3xl overflow-hidden mb-12 flex flex-col md:flex-row">
        {/* Left content */}
        <div className="relative z-20 flex flex-col justify-center p-16 max-sm:p-8 w-full md:w-1/2 bg-gradient-to-r from-black/50 to-transparent">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-xl tracking-tight leading-tight">
            Master Your Interview Skills with AI-Driven Practice
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-lg leading-relaxed">
            Get personalized interview simulations, real-time feedback, and expert guidance to land your dream job.
          </p>
          <Link href="/sign-up">
            <GetStartedbtn />
          </Link>
        </div>

        {/* Right side with Spline 3D robot */}
        <div className="absolute md:relative inset-0 md:inset-auto md:w-1/2 h-full min-h-[80px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:hidden" />
          <SplineBackground
            sceneUrl="https://prod.spline.design/2goG9T1bI53vr8nb/scene.splinecode"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      
      {/* <div className="flex justify-center content-center my-16 items-center">
        <div className="max-w-3xl text-center px-4">
          <h2 className="text-2xl sm:text-3xl text-white font-medium mb-6">
            Your Path to Interview Excellence
          </h2>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-4">
            In today's competitive job market, standing out is crucial. Our advanced AI platform provides tailored interview scenarios that match your industry and experience level.
          </p>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed">
            Practice with confidence using our cutting-edge technology that simulates real interview environments and provides detailed performance analytics.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center mb-16">
        <Link href="/sign-up">
          <GetStartedbtn />
        </Link>
      </div> */}

      {/* Features Section */}
      <div className="flex flex-col items-center mb-16">
        <section className="max-w-4xl px-4 text-center mb-12">
          <h2 className="text-2xl sm:text-3xl text-white font-bold mb-4">
            The InterviewPrep Advantage
          </h2>
          <h3 className="text-xl sm:text-2xl text-white font-medium mb-4">
            Advanced Tools for Interview Success
          </h3>
          <p className="text-base sm:text-lg text-white/90">
            Experience the future of interview preparation with our comprehensive suite of AI-powered tools.
          </p>
        </section>

        <section className="w-full max-w-7xl px-4 mx-auto">
          <Features />
        </section>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
