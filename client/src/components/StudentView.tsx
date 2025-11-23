import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Send } from "lucide-react";
import { type Question } from "@shared/schema";

interface StudentViewProps {
  questions: Question[];
  onSubmit: (studentName: string, answers: Record<string, boolean>) => void;
  studentName: string;
}

export default function StudentView({ questions, onSubmit, studentName }: StudentViewProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    const unansweredQuestions = questions.filter(q => !answers[q.id]);
    if (unansweredQuestions.length > 0) {
      alert(`Please answer all questions. ${unansweredQuestions.length} question(s) remaining.`);
      return;
    }

    const booleanAnswers: Record<string, boolean> = {};
    Object.entries(answers).forEach(([id, value]) => {
      booleanAnswers[id] = value === "true";
    });

    onSubmit(studentName, booleanAnswers);
    setSubmitted(true);
    console.log("Quiz submitted:", { studentName, answers: booleanAnswers });
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-12">
        <Card className="border-2 border-primary/20">
          <CardContent className="py-12 text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-semibold mb-2">Quiz Submitted Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you, {studentName}. Your answers have been recorded.
            </p>
            <Button
              data-testid="button-submit-another"
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                console.log("Ready for new submission");
              }}
            >
              Submit Another Response
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No questions available</p>
            <p className="text-sm text-muted-foreground">Please wait for your instructor to upload questions</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allAnswered = questions.every(q => answers[q.id]);

  return (
    <div className="max-w-3xl mx-auto px-8 py-12 pb-32">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Campbell Evaluation Exam</h2>
        <p className="text-muted-foreground">Answer all questions and submit when ready</p>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <Card key={question.id} data-testid={`question-card-${index}`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4 mb-4">
                <Badge 
                  variant="secondary"
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full"
                >
                  {index + 1}
                </Badge>
                <p className="text-lg leading-relaxed flex-1">{question.text}</p>
              </div>
              
              <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={(value) => handleAnswerChange(question.id, value)}
                className="flex gap-4 ml-12"
              >
                <div className="flex items-center space-x-2 flex-1">
                  <RadioGroupItem 
                    value="true" 
                    id={`${question.id}-true`}
                    data-testid={`radio-true-${index}`}
                  />
                  <Label 
                    htmlFor={`${question.id}-true`}
                    className="flex-1 p-4 rounded-lg border-2 cursor-pointer hover-elevate active-elevate-2"
                  >
                    True
                  </Label>
                </div>
                <div className="flex items-center space-x-2 flex-1">
                  <RadioGroupItem 
                    value="false" 
                    id={`${question.id}-false`}
                    data-testid={`radio-false-${index}`}
                  />
                  <Label 
                    htmlFor={`${question.id}-false`}
                    className="flex-1 p-4 rounded-lg border-2 cursor-pointer hover-elevate active-elevate-2"
                  >
                    False
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg">
        <div className="max-w-3xl mx-auto px-8 py-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {allAnswered 
              ? "All questions answered" 
              : `${Object.keys(answers).length} of ${questions.length} answered`}
          </p>
          <Button
            data-testid="button-submit-quiz"
            size="lg"
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="gap-2 px-12"
          >
            <Send className="w-4 h-4" />
            Submit Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
