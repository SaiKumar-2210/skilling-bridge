import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  BookOpen, 
  Award, 
  MapPin,
  Clock,
  Building2,
  Star,
  Filter,
  Bell,
  User
} from "lucide-react";

const StudentHome = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in production this would come from Supabase
  const mockInternships = [
    {
      id: "1",
      title: "Frontend Developer Intern",
      company: "TechCorp Solutions",
      verified: true,
      location: "Remote",
      duration: "3 months",
      stipend: "₹15,000/month",
      skills: ["React", "TypeScript", "Tailwind"],
      deadline: "2024-01-15",
      description: "Build modern web applications using React and TypeScript..."
    },
    {
      id: "2", 
      title: "Data Science Intern",
      company: "Analytics Pro",
      verified: true,
      location: "Bangalore",
      duration: "6 months",
      stipend: "₹20,000/month",
      skills: ["Python", "Machine Learning", "SQL"],
      deadline: "2024-01-20",
      description: "Work on real-world data science projects..."
    },
    {
      id: "3",
      title: "Marketing Intern",
      company: "Brand Builders",
      verified: false,
      location: "Mumbai",
      duration: "4 months",
      stipend: "₹12,000/month",
      skills: ["Digital Marketing", "Content", "Analytics"],
      deadline: "2024-01-25",
      description: "Support marketing campaigns and content creation..."
    }
  ];

  const userStats = {
    applications: 5,
    saved: 12,
    inProgress: 1
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Good morning!</h1>
              <p className="text-sm text-muted-foreground">Find your next opportunity</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/student/notifications")}>
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/student/profile")}>
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{userStats.applications}</div>
              <div className="text-sm text-muted-foreground">Applications</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{userStats.saved}</div>
              <div className="text-sm text-muted-foreground">Saved</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{userStats.inProgress}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search internships, companies, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12"
            onFocus={() => navigate("/student/search")}
          />
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-16 flex-col gap-2"
            onClick={() => navigate("/student/applications")}
          >
            <BookOpen className="w-6 h-6" />
            My Applications
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex-col gap-2"
            onClick={() => navigate("/student/logbook/new")}
          >
            <Plus className="w-6 h-6" />
            Quick Log Entry
          </Button>
        </div>

        {/* Recommended Internships */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recommended for You</h2>
            <Button variant="ghost" onClick={() => navigate("/student/search")}>
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {mockInternships.map((internship) => (
              <Card 
                key={internship.id} 
                className="shadow-soft hover:shadow-medium transition-all cursor-pointer"
                onClick={() => navigate(`/student/internship/${internship.id}`)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{internship.title}</h3>
                          {internship.verified && (
                            <Badge variant="secondary" className="bg-success/10 text-success">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building2 className="w-4 h-4" />
                          <span>{internship.company}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-accent">{internship.stipend}</div>
                        <div className="text-sm text-muted-foreground">{internship.duration}</div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {internship.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Apply by {new Date(internship.deadline).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {internship.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Description Preview */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {internship.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Continue Learning Section */}
        <Card className="shadow-soft bg-gradient-accent text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Continue Learning</h3>
                <p className="text-white/90 text-sm">
                  Complete micro-courses to boost your profile
                </p>
              </div>
              <Button variant="secondary" size="sm">
                Start Course
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="grid grid-cols-5 gap-1">
          <Button variant="ghost" className="h-16 flex-col gap-1 text-primary">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/student/search")}
          >
            <Search className="w-5 h-5" />
            <span className="text-xs">Search</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/student/applications")}
          >
            <Star className="w-5 h-5" />
            <span className="text-xs">My Apps</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/student/logbook/new")}
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs">Log</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/student/profile")}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default StudentHome;