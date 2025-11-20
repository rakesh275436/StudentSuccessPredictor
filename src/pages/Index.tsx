import { useState } from "react";
import { PredictionForm, PredictionResult } from "@/components/PredictionForm";
import { PredictionResults } from "@/components/PredictionResults";
import { TeamSection } from "@/components/TeamSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GraduationCap, TrendingUp, Brain } from "lucide-react";

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Theme Toggle */}
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Header */}
        <header className="text-center mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-700">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-[var(--shadow-soft)]">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Student Performance Predictor
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered academic performance prediction system using advanced machine learning analysis
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-[var(--shadow-soft)] border border-border/50">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">AI Analysis</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-[var(--shadow-soft)] border border-border/50">
              <TrendingUp className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">Confidence Scoring</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-[var(--shadow-soft)] border border-border/50">
              <GraduationCap className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Personalized Recommendations</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="space-y-8">
          <div className="animate-in fade-in-0 slide-in-from-left-4 duration-700">
            <PredictionForm onPredictionComplete={setPredictionResult} />
          </div>
          
          {predictionResult && (
            <PredictionResults result={predictionResult} />
          )}
        </div>

        {/* Team Section */}
        <TeamSection />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="font-medium">© 2025 Team Hawkers</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors duration-300 hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors duration-300 hover:underline">
                Contact
              </a>
              <a href="#" className="hover:text-primary transition-colors duration-300 hover:underline">
                GitHub Repo
              </a>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground/80 mt-4">
            Powered by Advanced AI Technology • Lovable Cloud Backend
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
