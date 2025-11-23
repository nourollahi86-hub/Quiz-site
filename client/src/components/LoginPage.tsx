import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, LogIn } from "lucide-react";

interface LoginPageProps {
  instructorPassword: string;
  onLogin: (role: "student" | "instructor", name: string) => void;
}

export default function LoginPage({ instructorPassword, onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<"student" | "instructor" | null>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (selectedRole === "instructor") {
      if (!password) {
        setError("Please enter the instructor password");
        return;
      }
      if (password !== instructorPassword) {
        setError("Incorrect password. Please try again.");
        return;
      }
    }

    onLogin(selectedRole!, name.trim());
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Campbell Evaluation Exam</h1>
            <p className="text-muted-foreground">Select your role to continue</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className="cursor-pointer hover-elevate active-elevate-2 transition-all"
              onClick={() => {
                setSelectedRole("student");
                setError("");
              }}
              data-testid="card-student-role"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Student</CardTitle>
                <CardDescription>Take the quiz and submit your answers</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  data-testid="button-select-student"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRole("student");
                    setError("");
                  }}
                >
                  Continue as Student
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover-elevate active-elevate-2 transition-all"
              onClick={() => {
                setSelectedRole("instructor");
                setError("");
              }}
              data-testid="card-instructor-role"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Instructor</CardTitle>
                <CardDescription>Create and manage quiz questions</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  data-testid="button-select-instructor"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRole("instructor");
                    setError("");
                  }}
                >
                  Continue as Instructor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            {selectedRole === "student" ? (
              <GraduationCap className="w-8 h-8 text-primary" />
            ) : (
              <BookOpen className="w-8 h-8 text-primary" />
            )}
          </div>
          <CardTitle>
            {selectedRole === "student" ? "Student Login" : "Instructor Login"}
          </CardTitle>
          <CardDescription>
            {selectedRole === "student" 
              ? "Enter your name to start the quiz" 
              : "Enter your credentials to manage questions"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">
              Your Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              data-testid="input-login-name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="mt-2"
            />
          </div>

          {selectedRole === "instructor" && (
            <div>
              <Label htmlFor="password">
                Password <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                data-testid="input-login-password"
                type="password"
                placeholder="Enter instructor password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="mt-2"
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive" data-testid="text-login-error">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              data-testid="button-back"
              variant="outline"
              onClick={() => {
                setSelectedRole(null);
                setName("");
                setPassword("");
                setError("");
              }}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              data-testid="button-login"
              onClick={handleLogin}
              className="flex-1 gap-2"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
