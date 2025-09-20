import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Users, 
  Building2, 
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Bell,
  User,
  Settings,
  BarChart3
} from "lucide-react";

const AdminHome = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in production this would come from Supabase
  const mockInstitutions = [
    {
      id: "1",
      name: "IIT Delhi",
      type: "IIT",
      students: 1250,
      faculty: 45,
      activeInternships: 89,
      status: "active",
      compliance: 95,
      lastSync: "2024-01-12"
    },
    {
      id: "2",
      name: "BITS Pilani",
      type: "Private",
      students: 2100,
      faculty: 78,
      activeInternships: 156,
      status: "active",
      compliance: 92,
      lastSync: "2024-01-11"
    },
    {
      id: "3",
      name: "NIT Trichy",
      type: "NIT",
      students: 980,
      faculty: 32,
      activeInternships: 67,
      status: "pending_verification",
      compliance: 88,
      lastSync: "2024-01-10"
    }
  ];

  const adminStats = {
    totalInstitutions: 156,
    totalStudents: 45000,
    totalFaculty: 1200,
    totalInternships: 2800,
    complianceRate: 94,
    pendingVerifications: 8
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success";
      case "pending_verification": return "bg-amber-100 text-amber-800";
      case "suspended": return "bg-destructive/10 text-destructive";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active";
      case "pending_verification": return "Pending Verification";
      case "suspended": return "Suspended";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Platform management & compliance</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/notifications")}>
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/profile")}>
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{adminStats.totalInstitutions}</div>
              <div className="text-sm text-muted-foreground">Institutions</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{adminStats.totalStudents.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{adminStats.totalFaculty.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Faculty</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{adminStats.totalInternships.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Internships</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{adminStats.complianceRate}%</div>
              <div className="text-sm text-muted-foreground">Compliance</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{adminStats.pendingVerifications}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search institutions, users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12"
          />
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-16 flex-col gap-2"
            onClick={() => navigate("/admin/verifications")}
          >
            <CheckCircle className="w-6 h-6" />
            Verify Institutions
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex-col gap-2"
            onClick={() => navigate("/admin/compliance")}
          >
            <Shield className="w-6 h-6" />
            Compliance Reports
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex-col gap-2"
            onClick={() => navigate("/admin/analytics")}
          >
            <BarChart3 className="w-6 h-6" />
            Platform Analytics
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex-col gap-2"
            onClick={() => navigate("/admin/settings")}
          >
            <Settings className="w-6 h-6" />
            System Settings
          </Button>
        </div>

        {/* Institution List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Institution Overview</h2>
            <Button variant="ghost" onClick={() => navigate("/admin/institutions")}>
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {mockInstitutions.map((institution) => (
              <Card 
                key={institution.id} 
                className="shadow-soft hover:shadow-medium transition-all cursor-pointer card-hover"
                onClick={() => navigate(`/admin/institution/${institution.id}`)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{institution.name}</h3>
                          <Badge variant="secondary" className={getStatusColor(institution.status)}>
                            {getStatusText(institution.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building2 className="w-4 h-4" />
                          <span>{institution.type}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-primary">{institution.compliance}%</div>
                        <div className="text-sm text-muted-foreground">Compliance</div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        <span>{institution.students.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-success" />
                        <span>{institution.faculty} faculty</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        <span>{institution.activeInternships} internships</span>
                      </div>
                    </div>

                    {/* Last Sync */}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Last sync: {new Date(institution.lastSync).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* System Health */}
        <Card className="shadow-soft bg-gradient-primary text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">System Health</h3>
                <p className="text-white/90 text-sm">
                  Platform is running smoothly with 99.9% uptime and 94% NEP compliance rate
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
          <Button variant="ghost" className="h-16 flex-col gap-1 text-primary">
            <Shield className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/admin/verifications")}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-xs">Verify</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/admin/compliance")}
          >
            <Shield className="w-5 h-5" />
            <span className="text-xs">Compliance</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/admin/analytics")}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">Analytics</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/admin/settings")}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default AdminHome;