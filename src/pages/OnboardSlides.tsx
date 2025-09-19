import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Bell, 
  Download, 
  Shield, 
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

const OnboardSlides = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [permissions, setPermissions] = useState({
    notifications: false,
    pwa: false,
    camera: false,
    location: false
  });

  const slides = [
    {
      id: "welcome",
      title: `Welcome, ${role.charAt(0).toUpperCase() + role.slice(1)}!`,
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">You're All Set!</h2>
            <p className="text-muted-foreground">
              Let's personalize your Prashiskshan experience with a quick setup.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "permissions",
      title: "Enable Key Features",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Allow Permissions</h2>
          <div className="space-y-4">
            {/* Notifications */}
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Bell className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Get updates on applications and reminders
                    </p>
                  </div>
                  <Button
                    variant={permissions.notifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePermissionRequest("notifications")}
                  >
                    {permissions.notifications ? "Enabled" : "Enable"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* PWA Install */}
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Download className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Install App</h3>
                    <p className="text-sm text-muted-foreground">
                      Add Prashiskshan to your home screen
                    </p>
                  </div>
                  <Button
                    variant={permissions.pwa ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePermissionRequest("pwa")}
                  >
                    {permissions.pwa ? "Installed" : "Install"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Camera (for logbook photos) */}
            {role === "student" && (
              <Card className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-success" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Camera Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Capture photos for logbook entries
                      </p>
                    </div>
                    <Button
                      variant={permissions.camera ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePermissionRequest("camera")}
                    >
                      {permissions.camera ? "Enabled" : "Enable"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )
    },
    {
      id: "complete",
      title: "Ready to Begin!",
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
            <p className="text-muted-foreground">
              You're ready to start your Prashiskshan journey. 
              {role === "student" && " Find your first internship opportunity!"}
              {role === "faculty" && " Start overseeing student progress!"}
              {role === "industry" && " Post your first internship!"}
              {role === "admin" && " Manage your institution!"}
            </p>
          </div>
        </div>
      )
    }
  ];

  const handlePermissionRequest = async (type: string) => {
    switch (type) {
      case "notifications":
        if ("Notification" in window) {
          const permission = await Notification.requestPermission();
          setPermissions(prev => ({ 
            ...prev, 
            notifications: permission === "granted" 
          }));
        }
        break;
      case "pwa":
        // PWA install prompt would be handled here
        setPermissions(prev => ({ ...prev, pwa: true }));
        break;
      case "camera":
        try {
          await navigator.mediaDevices.getUserMedia({ video: true });
          setPermissions(prev => ({ ...prev, camera: true }));
        } catch (error) {
          console.log("Camera permission denied");
        }
        break;
    }
  };

  const handleComplete = () => {
    // Store onboarding completion
    localStorage.setItem("prashiskshan_onboarded", "true");
    
    // Navigate to role-specific home
    switch (role) {
      case "student":
        navigate("/student/home");
        break;
      case "faculty":
        navigate("/faculty/home");
        break;
      case "industry":
        navigate("/industry/home");
        break;
      case "admin":
        navigate("/admin/home");
        break;
      default:
        navigate("/student/home");
    }
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="min-h-screen bg-secondary/20 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Setup Progress</span>
            <span>{currentSlide + 1} of {slides.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Slide Content */}
        <Card className="shadow-medium min-h-[400px]">
          <CardContent className="p-8">
            {slides[currentSlide].content}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentSlide === slides.length - 1 ? (
            <Button onClick={handleComplete} className="bg-success hover:bg-success/90">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardSlides;