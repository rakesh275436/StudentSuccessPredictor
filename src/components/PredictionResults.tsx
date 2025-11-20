import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, TrendingUp, AlertCircle } from "lucide-react";
import { PredictionResult } from "./PredictionForm";

interface PredictionResultsProps {
  result: PredictionResult;
}

export const PredictionResults = ({ result }: PredictionResultsProps) => {
  const isPassing = result.prediction === "PASS";

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <Card className="shadow-[var(--shadow-card)] border-border/50 overflow-hidden">
        <div className={`h-2 ${isPassing ? 'bg-gradient-to-r from-accent to-secondary' : 'bg-gradient-to-r from-destructive to-orange-500'}`} />
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            {isPassing ? (
              <CheckCircle2 className="h-8 w-8 text-accent" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
            Prediction Result
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Predicted Outcome</p>
              <Badge 
                variant={isPassing ? "default" : "destructive"}
                className={`text-lg px-4 py-1 ${isPassing ? 'bg-gradient-to-r from-accent to-secondary' : ''}`}
              >
                {result.prediction}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Confidence Score</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {result.confidence}%
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Confidence Level</span>
              <span className="font-medium">{result.confidence}%</span>
            </div>
            <Progress 
              value={result.confidence} 
              className="h-3 shadow-inner"
            />
          </div>
        </CardContent>
      </Card>

      {result.recommendations && result.recommendations.length > 0 && (
        <Card className="shadow-[var(--shadow-card)] border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="h-6 w-6 text-primary" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-300">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-[var(--shadow-card)] border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Student Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Attendance</p>
              <p className="text-lg font-semibold">{result.studentData.attendance}%</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Study Hours</p>
              <p className="text-lg font-semibold">{result.studentData.studyHours}h/day</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Internal (50)</p>
              <p className="text-lg font-semibold">{result.studentData.internalAssessment}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Class Test (40)</p>
              <p className="text-lg font-semibold">{result.studentData.classTest}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Assignments (50)</p>
              <p className="text-lg font-semibold">{result.studentData.assignmentMarks}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Aptitude (100)</p>
              <p className="text-lg font-semibold">{result.studentData.aptitudeMarks}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Coding (100)</p>
              <p className="text-lg font-semibold">{result.studentData.codingMarks}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Extracurricular</p>
              <p className="text-lg font-semibold">{result.studentData.extracurricular ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
