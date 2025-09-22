import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/LoginForm";
import { 
  ArrowLeft,
  Mail,
  Phone,
  Chrome,
  AlertCircle,
  UserPlus,
  LogIn
} from "lucide-react";

const AuthSelect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [activeTab, setActiveTab] = useState("login");

  const handleGoogleAuth = () => {
    // Store role if provided
    if (role) {
      localStorage.setItem("prashiskshan_role", role);
    }
    // In production, this would integrate with Supabase Auth
    console.log("Google authentication initiated");
    navigate("/verify-college");
  };

  const handleEmailAuth = () => {
    // Store role if provided
    if (role) {
      localStorage.setItem("prashiskshan_role", role);
    }
    // In production, this would integrate with Supabase Auth
    console.log("Email authentication initiated");
    navigate("/verify-college");
  };

  const handlePhoneAuth = () => {
    // Store role if provided
    if (role) {
      localStorage.setItem("prashiskshan_role", role);
    }
    // In production, this would integrate with Supabase Auth
    console.log("Phone authentication initiated");
    navigate("/verify-college");
  };

  const handleGuestContinue = () => {
    // Limited browsing mode
    navigate("/student/search");
  };

  const handleLoginSuccess = () => {
    // Navigate to appropriate dashboard based on user role
    navigate("/student/home"); // This will be updated based on actual user role
  };

  return (
    <div className="min-h-screen bg-secondary/20 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pt-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/landing")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">
              {role ? `Sign in as ${role}` : "Choose how to sign in"}
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Sign In
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-6">
            <LoginForm onSuccess={handleLoginSuccess} />
          </TabsContent>
          
          <TabsContent value="register" className="mt-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-center">Create Account</CardTitle>
                <p className="text-sm text-muted-foreground text-center">
                  Join the NEP-compliant internship platform
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Registration is currently in development. Please use the demo accounts to explore the platform.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("login")}
                    className="w-full"
                  >
                    Go to Sign In
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        {/* Alternative Auth Methods */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-center text-lg">Alternative Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Sign In */}
            <Button 
              variant="outline" 
              className="w-full h-12 text-left justify-start gap-3"
              onClick={handleGoogleAuth}
            >
              <Chrome className="w-5 h-5" />
              Continue with Google
            </Button>

            {/* College Email */}
            <Button 
              variant="outline" 
              className="w-full h-12 text-left justify-start gap-3"
              onClick={handleEmailAuth}
            >
              <Mail className="w-5 h-5" />
              Use College Email
            </Button>

            {/* Phone */}
            <Button 
              variant="outline" 
              className="w-full h-12 text-left justify-start gap-3"
              onClick={handlePhoneAuth}
            >
              <Phone className="w-5 h-5" />
              Use Phone Number
            </Button>

            <Separator />

            {/* Guest Mode */}
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Just browsing?
              </p>
              <Button 
                variant="ghost" 
                onClick={handleGuestContinue}
                className="text-accent"
              >
                Continue as Guest
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Role Selection */}
        {!role && (
          <Card className="mt-4 shadow-soft">
            <CardContent className="p-4">
              <p className="text-sm text-center text-muted-foreground mb-3">
                New here? Choose your role:
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/auth?role=student")}
                >
                  Student
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/auth?role=faculty")}
                >
                  Faculty
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/auth?role=industry")}
                >
                  Industry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AuthSelect;