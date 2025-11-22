import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, LogOut } from "lucide-react";

interface HeaderProps {
  role: "instructor" | "student";
  userName: string;
  onLogout: () => void;
}

export default function Header({ role, userName, onLogout }: HeaderProps) {
  return (
    <header className="h-16 border-b flex items-center px-8">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight">True/False Quiz</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {role === "instructor" ? (
              <BookOpen className="w-4 h-4 text-muted-foreground" />
            ) : (
              <GraduationCap className="w-4 h-4 text-muted-foreground" />
            )}
            <div className="text-sm">
              <p className="text-muted-foreground">
                {role === "instructor" ? "Instructor" : "Student"}
              </p>
              <p className="font-medium" data-testid="text-user-name">
                {userName}
              </p>
            </div>
          </div>
          
          <Button
            data-testid="button-logout"
            size="sm"
            variant="outline"
            onClick={onLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
