"use client";

import React from 'react';
import {Feature, Step} from '@/types';
import {Book, FolderPlus, Image as ImageIcon, Lock, PenTool, Share2} from 'lucide-react';
import Hero from "@/components/Landing/Hero";
import Features from "@/components/Landing/Features";
import HowItWorks from "@/components/Landing/HowItWork";
import CTA from "@/components/Landing/CTA";
import {useTranslations} from "next-intl";

export default function Landing() {
  const tEverything = useTranslations('Landing.everythingYouNeed');
  const tCreateYourAlbum = useTranslations('Landing.createYourAlbum');
  
  const features: Feature[] = [
    {
      icon: <Book className="w-8 h-8"/>,
      title: tEverything('beautiful.title'),
      description: tEverything('beautiful.description')
    },
    {
      icon: <ImageIcon className="w-8 h-8"/>,
      title: tEverything('richMedia.title'),
      description: tEverything('richMedia.description')
    },
    {
      icon: <Lock className="w-8 h-8"/>,
      title: tEverything('private.title'),
      description: tEverything('private.description')
    },
  ];
  
  const steps: Step[] = [
    {
      number: "01",
      icon: <FolderPlus className="w-8 h-8"/>,
      title: tCreateYourAlbum('createAlbum.title'),
      description: tCreateYourAlbum('createAlbum.description')
    },
    {
      number: "02",
      icon: <PenTool className="w-8 h-8"/>,
      title: tCreateYourAlbum('addPhotostory.title'),
      description: tCreateYourAlbum('addPhotostory.description')
    },
    {
      number: "03",
      icon: <Share2 className="w-8 h-8"/>,
      title: tCreateYourAlbum('shareEnjoy.title'),
      description: tCreateYourAlbum('shareEnjoy.description')
    },
  ];
  
  return (
    <>
      <Hero/>
      <Features features={features}/>
      <HowItWorks steps={steps}/>
      <CTA/>
    </>
  );
}