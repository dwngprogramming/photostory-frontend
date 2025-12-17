import React from "react";
import {FooterSection, NavLink} from "@/types";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";

export default function LandingLayout({children}: { children: React.ReactNode }) {
  const navLinks: NavLink[] = [
    {label: 'Features', href: '#features'},
    {label: 'How It Works', href: '#how-it-works'},
  ];
  
  const footerSections: FooterSection[] = [
    {
      title: "Product",
      links: [
        {label: "Features", href: "#features"},
        {label: "How It Works", href: "#how-it-works"},
        {label: "Demo Album", href: "#demo"},
        {label: "Updates", href: "#updates"},
      ]
    },
    {
      title: "Company",
      links: [
        {label: "About", href: "#about"},
        {label: "Blog", href: "#blog"},
        {label: "Contact", href: "#contact"},
        {label: "Feedback", href: "#feedback"},
      ]
    },
    {
      title: "Support",
      links: [
        {label: "Help Center", href: "#help"},
        {label: "Privacy Policy", href: "#privacy"},
        {label: "Terms of Service", href: "#terms"},
        {label: "FAQ", href: "#faq"},
      ]
    },
  ];
  
  return (
    <div className="bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 transition-colors duration-300">
      <div
        className="min-h-screen flex flex-col font-sans selection:bg-amber-200 dark:selection:bg-amber-900 selection:text-amber-900 dark:selection:text-amber-100">
        <Navbar navLinks={navLinks}/>
        <main className="flex-grow">
          {children}
        </main>
        <Footer footerSections={footerSections}/>
      </div>
    </div>
  )
}