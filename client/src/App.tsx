import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import InstructorView from "@/components/InstructorView";
import StudentView from "@/components/StudentView";
import LoginPage from "@/components/LoginPage";
import { type Question } from "@shared/schema";

// Fixed instructor password
const INSTRUCTOR_PASSWORD = "ZQY0H4";

interface AuthState {
  isAuthenticated: boolean;
  role: "instructor" | "student" | null;
  name: string;
}

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    name: "",
  });
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleLogin = (role: "instructor" | "student", name: string) => {
    setAuthState({
      isAuthenticated: true,
      role,
      name,
    });
    console.log(`User logged in as ${role}:`, name);
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      role: null,
      name: "",
    });
    console.log("User logged out");
  };

  const handleStudentSubmit = (studentName: string, answers: Record<string, boolean>) => {
    console.log("Quiz submitted:", { studentName, answers });
    // TODO: Send to Google Sheets via backend API
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {!authState.isAuthenticated ? (
          <LoginPage 
            instructorPassword={INSTRUCTOR_PASSWORD}
            onLogin={handleLogin}
          />
        ) : (
          <div className="min-h-screen flex flex-col">
            <Header 
              role={authState.role!}
              userName={authState.name}
              onLogout={handleLogout}
            />
            <main className="flex-1">
              {authState.role === "instructor" ? (
                <InstructorView questions={questions} onQuestionsChange={setQuestions} />
              ) : (
                <StudentView 
                  questions={questions} 
                  onSubmit={handleStudentSubmit}
                  studentName={authState.name}
                />
              )}
            </main>
          </div>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
