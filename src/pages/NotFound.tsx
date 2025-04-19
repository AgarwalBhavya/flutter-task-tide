import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-flutter-background">
      <div className="text-center animate-fade-in">
        <div className="bg-white p-8 rounded-3xl shadow-flutter border border-flutter-primary/10 max-w-md">
          <h1 className="text-6xl font-bold text-flutter-primary mb-4">404</h1>
          <p className="text-xl text-flutter-text mb-6">Oops! This page doesn't exist</p>
          <Button 
            asChild
            className="bg-flutter-primary hover:bg-flutter-secondary text-white rounded-xl py-6 h-12 transition-all flutter-button"
          >
            <Link to="/">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
