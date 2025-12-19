import React from "react";
import {FooterSection, NavLink} from "@/types";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import {useTranslations} from "next-intl";

export default function LandingLayout({children}: { children: React.ReactNode }) {
  const t = useTranslations('Landing');
  const navLinks: NavLink[] = [
    {label: `${t('features')}`, href: '#features'},
    {label: `${t('hiw')}`, href: '#how-it-works'}
  ];
  
  const footerSections: FooterSection[] = [
    {
      title: t('footer.product.title'),
      links: [
        {label: t('footer.product.features'), href: "#features"},
        {label: t('footer.product.howItWorks'), href: "#how-it-works"},
        {label: t('footer.product.demo'), href: "#demo"},
      ]
    },
    {
      title: t('footer.author.title'),
      links: [
        {label: t('footer.author.about'), href: "#about"},
        {label: t('footer.author.contact'), href: "#contact"},
        {label: t('footer.author.feedback'), href: "#feedback"},
      ]
    },
    {
      title: t('footer.support.title'),
      links: [
        {label: t('footer.support.privacy'), href: "#privacy"},
        {label: t('footer.support.terms'), href: "#terms"},
        {label: t('footer.support.faq'), href: "#faq"},
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