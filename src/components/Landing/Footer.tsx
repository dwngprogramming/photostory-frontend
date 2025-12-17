import {Book, Facebook, Github, Instagram, Twitter} from "lucide-react";
import {FooterSection} from "@/types";

const Footer= ({footerSections}: {footerSections: FooterSection[]} ) => {
  return (
    <footer
      className="pt-16 pb-8 px-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <Book className="w-8 h-8 text-amber-500"/>
              <span className="text-xl font-bold text-stone-800 dark:text-stone-100 font-serif">Photostory</span>
            </div>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
              Preserve memories, share stories, cherish moments. A free platform for your digital legacy.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Github].map((Icon, i) => (
                <a key={i} href="#"
                   className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-amber-500 hover:text-white transition-all duration-200 flex items-center justify-center">
                  <Icon className="w-5 h-5"/>
                </a>
              ))}
            </div>
          </div>
          
          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-stone-800 dark:text-stone-100 mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}
                       className="text-stone-600 dark:text-stone-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-stone-200 dark:border-stone-800 mt-12 pt-8 text-center">
          <p className="text-stone-500 dark:text-stone-400 text-sm">
            © {new Date().getFullYear()} Photostory. Made with ❤️ for preserving memories.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;