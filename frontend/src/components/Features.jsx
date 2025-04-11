import { cn } from "../lib/utils";
import { BarChart, LineChart, PieChart,CirclePlay,Landmark,LayoutDashboard,Brain,Figma, Icon } from 'lucide-react';
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSection() {
    const features=[
        {
          title: 'Automatic Portfolio Tracking',
          description: 'Tired of juggling multiple investment apps? View holdings from Zerodha, MF Central, and more — all in one glance, like PhonePe for stocks.',
          icon : <Landmark className="mx-auto h-20 text-green-400 mb-4 animate-bounce-fast" />,
        },
        {
          id: '2',
          title: 'AI-Powered Comparison Tool',
          description: 'Like Netflix recommends shows, our AI suggests better funds and stocks. See ratings, risk meters 🟡, and smart "Switch Now?" prompts.',
          icon : <Brain className="mx-auto h-20 text-green-400 mb-4 animate-bounce-fast" />,
        },
        { 
          id: '3',
          title: 'One Dashboard for Everything',
          description: 'Track and execute all investments from one place — like ordering from multiple restaurants on Swiggy. Just click "Quick Invest" ✅.',
          icon : <LayoutDashboard className="mx-auto h-20 text-green-400 mb-4 animate-bounce-fast" />,
        },
        {
          id: '4',
          title: 'Super Simple Interface',
          description: 'Finance, simplified. Emoji-based icons 💰, plain-English summaries, and one-click actions like "Compare" or "Invest Now" — just like Uber.',
          icon : <Figma className="mx-auto h-20 text-green-400 mb-4 animate-bounce-fast" />,
        }
      ]
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}>
      {index < 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div
        className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div
          className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span
          className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p
        className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
