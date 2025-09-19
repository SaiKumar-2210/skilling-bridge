import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Award } from "lucide-react";

const SplashIntro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect after 3 seconds if user doesn't interact
    const timer = setTimeout(() => {
      navigate("/landing");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto space-y-8">
        {/* Logo */}
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Prashiskshan</h1>
          <p className="text-white/90 text-lg">NEP-Compliant Internship Platform</p>
        </div>

        {/* Key Features Carousel */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-white/90">
            <BookOpen className="w-6 h-6 text-accent" />
            <span>Track your internship journey</span>
          </div>
          <div className="flex items-center gap-4 text-white/90">
            <Award className="w-6 h-6 text-accent" />
            <span>Earn verifiable credentials</span>
          </div>
          <div className="flex items-center gap-4 text-white/90">
            <GraduationCap className="w-6 h-6 text-accent" />
            <span>Faculty-verified learning</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-4">
          <Button 
            onClick={() => navigate("/landing")}
            className="w-full bg-accent hover:bg-accent/90 text-white font-semibold"
          >
            Get Started
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate("/landing")}
            className="w-full border-white/30 text-white hover:bg-white/10"
          >
            Watch Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplashIntro;