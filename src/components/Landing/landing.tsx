"use client";

import React from 'react';
import {Feature, Step} from '@/types';
import {Book, FolderPlus, Image as ImageIcon, Lock, PenTool, Share2} from 'lucide-react';
import Hero from "@/components/Landing/Hero";
import Features from "@/components/Landing/Features";
import HowItWorks from "@/components/Landing/HowItWork";
import CTA from "@/components/Landing/CTA";

const features: Feature[] = [
  {
    icon: <Book className="w-8 h-8"/>,
    title: "Beautiful Book Layout",
    description: "View your memories as a realistic flipping book with smooth page transitions and nostalgic design."
  },
  {
    icon: <ImageIcon className="w-8 h-8"/>, // Đổi tên alias tránh trùng
    title: "Rich Media Support",
    description: "Add photos, videos, and background music to your stories. Drag, rotate, and arrange them like a real scrapbook."
  },
  {
    icon: <Lock className="w-8 h-8"/>,
    title: "Private & Shareable",
    description: "Keep albums private or share via unique access codes. No account needed for viewers to enjoy your stories."
  },
];

const steps: Step[] = [
  {
    number: "01",
    icon: <FolderPlus className="w-8 h-8"/>,
    title: "Create Album",
    description: "Set up your album with a title, cover image, and optional preface. Choose who can view it."
  },
  {
    number: "02",
    icon: <PenTool className="w-8 h-8"/>,
    title: "Add Stories",
    description: "Upload photos and videos, arrange them beautifully, then write your memories and emotions for each moment."
  },
  {
    number: "03",
    icon: <Share2 className="w-8 h-8"/>,
    title: "Share & Enjoy",
    description: "View your album as a beautiful flipping book or share the unique code with friends and family."
  },
];

export default function Landing() {
  return (
    <>
      <Hero/>
      <Features features={features}/>
      <HowItWorks steps={steps}/>
      <CTA/>
    </>
  );
}