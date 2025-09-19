import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  Users, 
  Building2, 
  Shield,
  ArrowRight 
} from "lucide-react";

const OnboardRole = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: "student",
      title: "Student",
      description: "Find internships, track learning, earn credentials",
      icon: GraduationCap,
      features: [
        "Browse verified internships",
        "Daily logbook tracking",
        "Get mentor feedback",
        "Earn verifiable credentials"
      ],
      color: "bg-primary"
    },
    {
      id: "faculty",
      title: "Faculty",
      description: "Oversee students, approve credits, ensure quality",
      icon: Users,
      features: [
        "Review student applications",
        "Monitor internship progress",
        "Approve academic credits",
        "Mentor guidance"
      ],
      color: "bg-success"
    },
    {
      id: "industry",
      title: "Industry Partner",
      description: "Post internships, mentor students, hire talent",
      icon: Building2,
      features: [
        "Post internship opportunities",
        "Review applications",
        "Mentor interns",
        "Build talent pipeline"
      ],
      color: "bg-accent"
    },
    {
      id: "admin",
      title: "College Admin",
      description: "Manage institution, set policies, oversee compliance",
      icon: Shield,
      features: [
        "Institutional dashboard",
        "Policy management",
        "Compliance monitoring",
        "Analytics & reports"
      ],
      color: "bg-primary"
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    // Store role selection
    localStorage.setItem("prashiskshan_role", roleId);
    navigate(`/onboard-slides?role=${roleId}`);
  };

  return (
    <div className="min-h-screen bg-secondary/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-3xl font-bold mb-4">Choose Your Role</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select how you'll be using Prashiskshan to get a personalized experience 
            designed for your specific needs.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.id} 
                className="shadow-medium hover:shadow-strong transition-all duration-300 cursor-pointer group"
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${role.color} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{role.title}</CardTitle>
                      <p className="text-muted-foreground">{role.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto shadow-soft">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Not sure which role?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You can always change your role later in settings. Most users 
                start with the role that matches their primary function.
              </p>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OnboardRole;