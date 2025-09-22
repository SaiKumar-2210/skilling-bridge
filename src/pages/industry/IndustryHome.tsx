import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Building2, 
  Plus, 
  Users, 
  MapPin,
  Clock,
  DollarSign,
  Search,
  Filter,
  Bell,
  User,
  TrendingUp,
  Award,
  CheckCircle,
  LogOut
} from "lucide-react";

const IndustryHome = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in production this would come from Supabase
  const mockInternships = [
    {
      id: "1",
      title: "Frontend Developer Intern",
      department: "Engineering",
      status: "active",
      applications: 24,
      hired: 3,
      location: "Remote",
      duration: "3 months",
      stipend: "₹15,000/month",
      postedDate: "2024-01-05",
      deadline: "2024-01-25"
    },
    {
      id: "2",
      title: "Data Science Intern",
      department: "Analytics",
      status: "active",
      applications: 18,
      hired: 2,
      location: "Bangalore",
      duration: "6 months",
      stipend: "₹20,000/month",
      postedDate: "2024-01-08",
      deadline: "2024-01-28"
    },
    {
      id: "3",
      title: "Marketing Intern",
      department: "Marketing",
      status: "closed",
      applications: 12,
      hired: 1,
      location: "Mumbai",
      duration: "4 months",
      stipend: "₹12,000/month",
      postedDate: "2023-12-15",
      deadline: "2024-01-10"
    }
  ];

  const industryStats = {
    activePostings: 8,
    totalApplications: 156,
    hiredInterns: 12,
    averageRating: 4.5
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success";
      case "closed": return "bg-muted";
      case "draft": return "bg-amber-100 text-amber-800";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active";
      case "closed": return "Closed";
      case "draft": return "Draft";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">
                Welcome, {user?.profile.firstName || 'Industry Partner'}!
              </h1>
              <p className="text-sm text-muted-foreground">Manage your internship program</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/industry/notifications")}>
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/industry/profile")}>
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={logout} title="Logout">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{industryStats.activePostings}</div>
              <div className="text-sm text-muted-foreground">Active Postings</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{industryStats.totalApplications}</div>
              <div className="text-sm text-muted-foreground">Applications</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{industryStats.hiredInterns}</div>
              <div className="text-sm text-muted-foreground">Hired Interns</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{industryStats.averageRating}</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search internships, applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12"
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
            onClick={() => navigate("/industry/post")}
          >
            <Plus className="w-6 h-6" />
            Post New Internship
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex-col gap-2"
            onClick={() => navigate("/industry/applications")}
          >
            <Users className="w-6 h-6" />
            Review Applications
          </Button>
        </div>

        {/* Internship List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Your Internships</h2>
            <Button variant="ghost" onClick={() => navigate("/industry/postings")}>
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {mockInternships.map((internship) => (
              <Card 
                key={internship.id} 
                className="shadow-soft hover:shadow-medium transition-all cursor-pointer card-hover"
                onClick={() => navigate(`/industry/internship/${internship.id}`)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{internship.title}</h3>
                          <Badge variant="secondary" className={getStatusColor(internship.status)}>
                            {getStatusText(internship.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building2 className="w-4 h-4" />
                          <span>{internship.department}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-accent">{internship.applications}</div>
                        <div className="text-sm text-muted-foreground">Applications</div>
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
                        {internship.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {internship.stipend}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-success">
                        <CheckCircle className="w-4 h-4" />
                        {internship.hired} hired
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Deadline: {new Date(internship.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <Card className="shadow-soft bg-gradient-accent text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Program Performance</h3>
                <p className="text-white/90 text-sm">
                  Your internship program has a 92% satisfaction rate among students
                </p>
              </div>
              <Button variant="secondary" size="sm">
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="grid grid-cols-5 gap-1">
          <Button variant="ghost" className="h-16 flex-col gap-1 text-accent">
            <Building2 className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/industry/post")}
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs">Post</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/industry/applications")}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Applications</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/industry/analytics")}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">Analytics</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/industry/profile")}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default IndustryHome;