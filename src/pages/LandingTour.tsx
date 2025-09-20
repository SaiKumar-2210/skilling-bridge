import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Award, 
  Users, 
  BookOpen, 
  ArrowRight,
  CheckCircle
} from "lucide-react";

const LandingTour = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "NEP Compliance",
      description: "Fully aligned with National Education Policy 2020 guidelines for internships and practical learning."
    },
    {
      icon: Award,
      title: "Verifiable Credentials",
      description: "Blockchain-based certificates that employers can instantly verify and trust."
    },
    {
      icon: Users,
      title: "Faculty Oversight",
      description: "Built-in faculty approval and mentorship system ensures quality learning outcomes."
    },
    {
      icon: BookOpen,
      title: "Offline-First",
      description: "Track your daily progress even without internet. Syncs automatically when connected."
    }
  ];

  const benefits = [
    "Find verified internship opportunities",
    "Track daily learning with digital logbooks", 
    "Get mentor feedback and faculty approval",
    "Earn industry-recognized credentials",
    "Build your professional portfolio"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-primary">Prashiskshan</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Transform Your Internship Experience
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The only NEP-compliant platform that connects students, faculty, and industry 
            for meaningful internship experiences with verifiable outcomes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-primary hover:bg-primary/90 btn-smooth"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/landing#demo")}
              className="btn-smooth"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Prashiskshan?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-soft card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Everything You Need for Success
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button 
                size="lg" 
                className="mt-8 bg-accent hover:bg-accent/90 btn-smooth"
                onClick={() => navigate("/auth")}
              >
                Start Your Journey
              </Button>
            </div>
            <div className="bg-gradient-accent rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Begin?</h3>
              <p className="mb-6">
                Join thousands of students already building their careers 
                through verified internship experiences.
              </p>
              <div className="space-y-3">
                <Button 
                  variant="secondary"
                  className="w-full bg-white text-accent hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate("/auth?role=student")}
                >
                  Join as Student
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-2 border-white/80 text-white hover:bg-white/20 hover:border-white transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate("/auth?role=faculty")}
                >
                  Join as Faculty
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-2 border-white/80 text-white hover:bg-white/20 hover:border-white transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate("/auth?role=industry")}
                >
                  Join as Industry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingTour;