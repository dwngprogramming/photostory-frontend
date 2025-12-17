import {Feature} from "@/types";
import FeatureCard from "@/components/Landing/FeatureCard";

const Features= ({features}: {features: Feature[]}) => {
  return (
    <section id="features" className="py-20 md:py-32 px-4 bg-white dark:bg-stone-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-serif font-bold text-stone-800 dark:text-stone-100 text-3xl md:text-4xl lg:text-5xl mb-4">
            Everything You Need to Tell Your Story
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-lg md:text-xl">
            Simple, beautiful, and completely free.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 150}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;