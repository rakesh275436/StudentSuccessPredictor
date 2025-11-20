import { useState } from "react";
import { PredictionForm, PredictionResult } from "@/components/PredictionForm";
import { PredictionResults } from "@/components/PredictionResults";
import { GraduationCap, TrendingUp, Brain } from "lucide-react";

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Powered by Advanced AI Technology • Lovable Cloud Backend</p>
          <p className="mt-2">Predictions are based on statistical analysis and should be used as guidance only</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
