import Header from "../Header";

export default function HeaderExample() {
  return (
    <Header 
      role="instructor"
      userName="John Doe"
      onLogout={() => {
        console.log("Logout clicked");
        alert("Logged out!");
      }} 
    />
  );
}
