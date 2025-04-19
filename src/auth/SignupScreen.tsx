
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "./auth-service";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      // This would normally be a real signup call
      await signup(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-flutter-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-flutter-primary mb-2">Task Tide</h1>
          <p className="text-flutter-text text-opacity-70">Create your account</p>
        </div>

        <Card className="border-flutter-primary/10 shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-flutter-tertiary">Create Account</CardTitle>
            <CardDescription className="text-center">Sign up to get started with Task Tide</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-500 text-sm mb-4">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-flutter-text">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl border-flutter-primary/20 focus:border-flutter-primary"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-flutter-text">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl border-flutter-primary/20 focus:border-flutter-primary"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium text-flutter-text">
                  Confirm Password
                </label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="rounded-xl border-flutter-primary/20 focus:border-flutter-primary"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-flutter-primary hover:bg-flutter-secondary text-white rounded-xl py-2 h-12 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-flutter-text text-opacity-70">
              Already have an account?{" "}
              <a
                onClick={() => navigate("/login")}
                className="text-flutter-primary hover:underline cursor-pointer font-medium"
              >
                Sign In
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignupScreen;
