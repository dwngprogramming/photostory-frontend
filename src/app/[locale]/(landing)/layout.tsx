import React from "react";
import {FooterSection, NavLink} from "@/types";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import {useTranslations} from "next-intl";
import NoticeBar from "@/components/Common/NoticeBar";
import {DemoNotifyProvider} from "@/contexts/demo-notify-provider";

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
      <DemoNotifyProvider>
        <div
          className="min-h-screen flex flex-col font-sans selection:bg-amber-200 dark:selection:bg-amber-900 selection:text-amber-900 dark:selection:text-amber-100">
          <Navbar navLinks={navLinks}/>
          <div className="sticky top-16 md:top-20 z-40">
            <NoticeBar page="landing"/>
          </div>
          <main className="grow pt-16 md:pt-20">
            {children}
          </main>
          <Footer footerSections={footerSections}/>
        </div>
      </DemoNotifyProvider>
    </div>
  )
}