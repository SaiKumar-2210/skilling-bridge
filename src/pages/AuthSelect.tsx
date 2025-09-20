import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Mail,
  Phone,
  Chrome,
  AlertCircle
} from "lucide-react";

const AuthSelect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

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

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
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

            {/* College Email Info */}
            <div className="bg-accent/10 p-3 rounded-lg">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-accent">Why college email?</p>
                  <p className="text-muted-foreground">
                    We verify your academic affiliation to ensure NEP compliance 
                    and connect you with the right opportunities.
                  </p>
                </div>
              </div>
            </div>

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