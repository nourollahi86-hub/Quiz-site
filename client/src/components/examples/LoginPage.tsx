import LoginPage from "../LoginPage";

export default function LoginPageExample() {
  const handleLogin = (role: "student" | "instructor", name: string) => {
    console.log(`Logged in as ${role}:`, name);
    alert(`Welcome ${name}! You are logged in as ${role}.`);
  };

  return (
    <LoginPage 
      instructorPassword="ABC123"
      onLogin={handleLogin}
    />
  );
}
