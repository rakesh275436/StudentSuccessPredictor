import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PredictionFormProps {
  onPredictionComplete: (result: PredictionResult) => void;
}

export interface PredictionResult {
  prediction: "PASS" | "FAIL";
  confidence: number;
  recommendations: string[];
  studentData: StudentData;
}

interface StudentData {
  attendance: number;
  studyHours: number;
  internalAssessment: number;
  classTest: number;
  assignmentMarks: number;
  extracurricular: boolean;
  aptitudeMarks: number;
  codingMarks: number;
}

export const PredictionForm = ({ onPredictionComplete }: PredictionFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<StudentData>({
    attendance: 75,
    studyHours: 4,
    internalAssessment: 35,
    classTest: 28,
    assignmentMarks: 40,
    extracurricular: false,
    aptitudeMarks: 70,
    codingMarks: 65,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.attendance < 0 || formData.attendance > 100) {
      toast({ title: "Error", description: "Attendance must be between 0-100%", variant: "destructive" });
      return;
    }
    if (formData.internalAssessment < 0 || formData.internalAssessment > 50) {
      toast({ title: "Error", description: "Internal Assessment must be between 0-50", variant: "destructive" });
      return;
    }
    if (formData.classTest < 0 || formData.classTest > 40) {
      toast({ title: "Error", description: "Class Test must be between 0-40", variant: "destructive" });
      return;
    }
    if (formData.assignmentMarks < 0 || formData.assignmentMarks > 50) {
      toast({ title: "Error", description: "Assignment marks must be between 0-50", variant: "destructive" });
      return;
    }
    if (formData.aptitudeMarks < 0 || formData.aptitudeMarks > 100) {
      toast({ title: "Error", description: "Aptitude marks must be between 0-100", variant: "destructive" });
      return;
    }
    if (formData.codingMarks < 0 || formData.codingMarks > 100) {
      toast({ title: "Error", description: "Coding marks must be between 0-100", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('predict-performance', {
        body: formData
      });

      if (error) throw error;

      onPredictionComplete({
        ...data,
        studentData: formData
      });

      toast({
        title: "Prediction Complete",
        description: `Student is predicted to ${data.prediction}`,
      });
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Error",
        description: "Failed to generate prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-[var(--shadow-card)] border-border/50">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Student Performance Data
        </CardTitle>
        <CardDescription>Enter student information to predict academic outcome</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="attendance">Attendance (%)</Label>
              <Input
                id="attendance"
                type="number"
                min="0"
                max="100"
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: parseFloat(e.target.value) })}
                className="transition-all duration-300 focus:shadow-[var(--shadow-soft)]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studyHours">Daily Study Hours</Label>
              <Input
                id="studyHours"
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={formData.studyHours}
                onChange={(e) => setFormData({ ...formData, studyHours: parseFloat(e.target.value) })}
                className="transition-all duration-300 focus:shadow-[var(--shadow-soft)]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="internalAssessment">Internal Assessment (out of 50)</Label>
              <Input
                id="internalAssessment"
                type="number"
                min="0"
                max="50"
                value={formData.internalAssessment}
                onChange={(e) => setFormData({ ...formData, internalAssessment: parseFloat(e.target.value) })}
                className="transition-all duration-300 focus:shadow-[var(--shadow-soft)]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classTest">Class Test (out of 40)</Label>
              <Input
                id="classTest"
                type="number"
                min="0"
                max="40"
                value={formData.classTest}
                onChange={(e) => setFormData({ ...formData, classTest: parseFloat(e.target.value) })}
                className="transition-all duration-300 focus:shadow-[var(--shadow-soft)]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignmentMarks">Assignment Marks (out of 50)</Label>
              <Input
                id="assignmentMarks"
                type="number"
                min="0"
                max="50"
                value={formData.assignmentMarks}
                onChange={(e) => setFormData({ ...formData, assignmentMarks: parseFloat(e.target.value) })}
                className="transition-all duration-300 focus:shadow-[var(--shadow-soft)]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aptitudeMarks">Aptitude Marks (out of 100)</Label>
              <Input
                id="aptitudeMarks"
                type="number"
                min="0"
                max="100"
                value={formData.aptitudeMarks}
                onChange={(e) => setFormData({ ...formData, aptitudeMarks: parseFloat(e.target.value) })}
                className="transition-all duration-300 focus:shadow-[var(--shadow-soft)]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codingMarks">Coding Marks (out of 100)</Label>
              <Input
                id="codingMarks"
                type="number"
                min="0"
                max="100"
                value={formData.codingMarks}
                onChange={(e) => setFormData({ ...formData, codingMarks: parseFloat(e.target.value) })}
                className="transition-all duration-300 focus:shadow-[var(--shadow-soft)]"
                required
              />
            </div>

            <div className="flex items-center space-x-3">
              <Switch
                id="extracurricular"
                checked={formData.extracurricular}
                onCheckedChange={(checked) => setFormData({ ...formData, extracurricular: checked })}
              />
              <Label htmlFor="extracurricular" className="cursor-pointer">
                Participates in Extracurricular Activities
              </Label>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-[var(--shadow-soft)]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Predict Performance"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
