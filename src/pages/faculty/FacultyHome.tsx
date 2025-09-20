import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  BookOpen, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Search,
  Filter,
  Bell,
  User,
  GraduationCap,
  Award,
  TrendingUp
} from "lucide-react";

const FacultyHome = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in production this would come from Supabase
  const mockStudents = [
    {
      id: "1",
      name: "Priya Sharma",
      studentId: "2023CS001",
      internship: "Frontend Developer at TechCorp",
      status: "in_progress",
      progress: 75,
      lastUpdate: "2024-01-10",
      logbookEntries: 15,
      pendingApprovals: 3
    },
    {
      id: "2",
      name: "Arjun Patel",
      studentId: "2023CS002", 
      internship: "Data Science at Analytics Pro",
      status: "pending_approval",
      progress: 0,
      lastUpdate: "2024-01-08",
      logbookEntries: 0,
      pendingApprovals: 1
    },
    {
      id: "3",
      name: "Sneha Reddy",
      studentId: "2023CS003",
      internship: "Marketing at Brand Builders",
      status: "completed",
      progress: 100,
      lastUpdate: "2024-01-12",
      logbookEntries: 20,
      pendingApprovals: 0
    }
  ];

  const facultyStats = {
    totalStudents: 45,
    pendingApprovals: 12,
    completedInternships: 28,
    averageRating: 4.2
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress": return "bg-primary/10 text-primary";
      case "pending_approval": return "bg-amber-100 text-amber-800";
      case "completed": return "bg-success/10 text-success";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "in_progress": return "In Progress";
      case "pending_approval": return "Pending Approval";
      case "completed": return "Completed";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Faculty Dashboard</h1>
              <p className="text-sm text-muted-foreground">Monitor student progress</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/faculty/notifications")}>
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/faculty/profile")}>
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{facultyStats.totalStudents}</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{facultyStats.pendingApprovals}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{facultyStats.completedInternships}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{facultyStats.averageRating}</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search students, internships..."
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
            onClick={() => navigate("/faculty/approvals")}
          >
            <CheckCircle className="w-6 h-6" />
            Pending Approvals
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex-col gap-2"
            onClick={() => navigate("/faculty/reports")}
          >
            <TrendingUp className="w-6 h-6" />
            Generate Reports
          </Button>
        </div>

        {/* Student List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Student Overview</h2>
            <Button variant="ghost" onClick={() => navigate("/faculty/students")}>
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {mockStudents.map((student) => (
              <Card 
                key={student.id} 
                className="shadow-soft hover:shadow-medium transition-all cursor-pointer card-hover"
                onClick={() => navigate(`/faculty/student/${student.id}`)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{student.name}</h3>
                          <Badge variant="secondary" className={getStatusColor(student.status)}>
                            {getStatusText(student.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <GraduationCap className="w-4 h-4" />
                          <span>{student.studentId}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-primary">{student.progress}%</div>
                        <div className="text-sm text-muted-foreground">Progress</div>
                      </div>
                    </div>

                    {/* Internship Details */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span>{student.internship}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4 text-primary" />
                        {student.logbookEntries} entries
                      </div>
                      {student.pendingApprovals > 0 && (
                        <div className="flex items-center gap-1 text-amber-600">
                          <AlertCircle className="w-4 h-4" />
                          {student.pendingApprovals} pending
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Updated {new Date(student.lastUpdate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Insights */}
        <Card className="shadow-soft bg-gradient-success text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Student Performance</h3>
                <p className="text-white/90 text-sm">
                  85% of your students are meeting internship milestones on time
                </p>
              </div>
              <Button variant="secondary" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="grid grid-cols-5 gap-1">
          <Button variant="ghost" className="h-16 flex-col gap-1 text-success">
            <Users className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/faculty/approvals")}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-xs">Approvals</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/faculty/students")}
          >
            <GraduationCap className="w-5 h-5" />
            <span className="text-xs">Students</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/faculty/reports")}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">Reports</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/faculty/profile")}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default FacultyHome;