import { AppPreview } from "./landing-v2/AppPreview";
import { Blog } from "./landing-v2/Blog";
import { Comparison } from "./landing-v2/Comparison";
import { CourtTypes } from "./landing-v2/CourtTypes";
import { DownloadApp } from "./landing-v2/DownloadApp";
import { FAQ } from "./landing-v2/FAQ";
import { Features } from "./landing-v2/Features";
import { Footer } from "./landing-v2/Footer";
import { Hero } from "./landing-v2/Hero";
import { HowItWorks } from "./landing-v2/HowItWorks";
import { Marketplace } from "./landing-v2/Marketplace";
import { MobileAppFeatures } from "./landing-v2/MobileAppFeatures";
import { Partners } from "./landing-v2/Partners";
import { Pricing } from "./landing-v2/Pricing";
import { SkillLevels } from "./landing-v2/SkillLevels";
import { SmartMatchmaking } from "./landing-v2/SmartMatchmaking";
import { Statistics } from "./landing-v2/Statistics";
import { Testimonials } from "./landing-v2/Testimonials";
import { Link } from "react-router-dom";
import { ChevronRight, Trophy } from "lucide-react";

const navItems = [
  { label: "Matchmaking", href: "#smart-matchmaking" },
  { label: "Players", href: "#find-players" },
  { label: "Mobile App", href: "#mobile-app" },
  { label: "Marketplace", href: "#marketplace" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header
        className="sticky top-0 z-50 border-b border-[#28492d] bg-[#163E1B]/95 text-white backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="flex items-center gap-3 text-base font-bold text-white md:text-lg">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 shadow-md shadow-[#0c2012]/20">
              <Trophy className="h-4 w-4 text-white" />
            </span>
            <span className="leading-tight">
              Tennis Finder
            </span>
          </a>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-white/82 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#2E7D32] px-4 py-2 text-xs font-medium text-white shadow-sm transition-colors hover:bg-[#1F5A24]"
            >
              Get Started
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <div id="top" className="scroll-mt-28">
        <Hero />
      </div>
      <Statistics />
      <Features />
      <div id="smart-matchmaking" className="scroll-mt-28">
        <SmartMatchmaking />
      </div>
      <div id="find-players" className="scroll-mt-28">
        <SkillLevels />
      </div>
      <HowItWorks />
      <CourtTypes />
      <div id="mobile-app" className="scroll-mt-28">
        <MobileAppFeatures />
      </div>
      <AppPreview />
      <Comparison />
      <Pricing />
      <div id="marketplace" className="scroll-mt-28">
        <Marketplace />
      </div>
      <Testimonials />
      <Partners />
      <Blog />
      <FAQ />
      <DownloadApp />
      <Footer />
    </div>
  );
}
