import {Stats} from "@/types";
import React from "react";
import {Book, Globe, HardDrive, Image, Lock} from "lucide-react";
import {useTranslations} from "next-intl";

const StatsOverview: React.FC<{ stats: Stats }> = ({stats}) => {
  const t = useTranslations('App.User.dashboard.stats');
  const cards = [
    {label: t('myAlbums'), value: stats.myAlbums, icon: Book},
    {label: t('totalPhotos'), value: stats.totalPhotos, icon: Image},
    {label: t('publicAlbums'), value: stats.publicAlbums, icon: Globe},
    {label: t('privateAlbums'), value: stats.privateAlbums, icon: Lock},
  ];
  
  const percentage = (stats.storageUsed / stats.storageTotal) * 100;
  
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, idx) => (
          <div key={idx}
               className="bg-white dark:bg-stone-900 p-5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-soft-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-500">
                <card.icon className="w-5 h-5"/>
              </div>
            </div>
            <h3 className="text-2xl font-sans font-bold text-stone-800 dark:text-stone-100">
              {card.value.toLocaleString('en-US')}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">
              {card.label}
            </p>
          </div>
        ))}
      </div>
      
      {/* Storage */}
      <div className="mb-8 bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-400 flex-shrink-0">
          <HardDrive className="w-6 h-6" />
        </div>
        <div className="flex-1 w-full">
          <div className="flex justify-between items-end mb-2">
            <h4 className="font-semibold text-stone-800 dark:text-stone-100">{t('storageUsage')}</h4>
            <span className="text-sm text-stone-500">
            <span className="font-bold text-stone-900 dark:text-stone-100">{stats.storageUsed}GB</span> / {stats.storageTotal}GB
          </span>
          </div>
          <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <button className="px-5 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors whitespace-nowrap">
          {t('upgradeStorage')}
        </button>
      </div>
    </div>
  );
};

export default StatsOverview;