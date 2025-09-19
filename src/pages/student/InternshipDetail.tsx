import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Building2,
  Calendar,
  FileText,
  Heart,
  Share,
  CheckCircle,
  Award,
  Mail,
  Phone
} from "lucide-react";

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock internship data - in production this would come from Supabase
  const internship = {
    id: id,
    title: "Frontend Developer Intern",
    company: "TechCorp Solutions",
    verified: true,
    logo: "/placeholder-logo.png",
    location: "Remote",
    duration: "3 months",
    stipend: "₹15,000/month",
    startDate: "2024-02-01",
    deadline: "2024-01-15",
    skills: ["React", "TypeScript", "Tailwind", "Git", "REST APIs"],
    description: `We are looking for a passionate Frontend Developer Intern to join our dynamic team. You'll work on cutting-edge web applications using modern React ecosystem.

This is an excellent opportunity to gain hands-on experience in:
• Building responsive user interfaces
• Working with TypeScript and modern JS
• Collaborating with senior developers
• Following industry best practices
• Contributing to real-world projects

You'll be mentored by experienced developers and have the opportunity to work on projects that impact thousands of users.`,
    responsibilities: [
      "Develop responsive web components using React",
      "Write clean, maintainable TypeScript code",
      "Collaborate with design team on UI implementation", 
      "Participate in code reviews and team meetings",
      "Document code and create technical specifications"
    ],
    requirements: [
      "Currently pursuing Computer Science or related field",
      "Strong knowledge of HTML, CSS, JavaScript",
      "Experience with React framework",
      "Familiarity with version control (Git)",
      "Good communication skills"
    ],
    benefits: [
      "Mentorship from senior developers",
      "Flexible working hours",
      "Learning stipend for courses",
      "Performance-based bonus",
      "Letter of recommendation"
    ],
    mentor: {
      name: "Priya Sharma",
      role: "Senior Frontend Developer",
      email: "priya@techcorp.com",
      phone: "+91 9876543210"
    },
    company_info: {
      about: "TechCorp Solutions is a leading software development company specializing in web and mobile applications for enterprises.",
      employees: "50-100",
      founded: "2018",
      website: "https://techcorp.com"
    }
  };

  const handleApply = () => {
    navigate(`/student/apply/${id}/step1`);
  };

  const handleSave = () => {
    // In production, save to Supabase
    console.log("Saving internship:", id);
  };

  const handleShare = () => {
    // In production, open share dialog
    console.log("Sharing internship:", id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Internship Details</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleSave}>
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6 pb-24">
        {/* Company Header */}
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{internship.title}</h1>
                  {internship.verified && (
                    <Badge className="bg-success/10 text-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <Building2 className="w-4 h-4" />
                  <span className="font-medium">{internship.company}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-accent">{internship.stipend}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Apply by {new Date(internship.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Required */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Skills Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {internship.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>About This Internship</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-muted-foreground">
              {internship.description}
            </div>
          </CardContent>
        </Card>

        {/* Responsibilities */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Key Responsibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {internship.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{responsibility}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {internship.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{requirement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>What You'll Get</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {internship.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Mentor Info */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Your Mentor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="font-semibold">{internship.mentor.name}</div>
                <div className="text-sm text-muted-foreground">{internship.mentor.role}</div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Info */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>About {internship.company}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-muted-foreground">{internship.company_info.about}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Employees:</span>
                  <span className="ml-2 text-muted-foreground">{internship.company_info.employees}</span>
                </div>
                <div>
                  <span className="font-medium">Founded:</span>
                  <span className="ml-2 text-muted-foreground">{internship.company_info.founded}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Apply Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            Ask Question
          </Button>
          <Button onClick={handleApply} className="flex-1 bg-primary hover:bg-primary/90">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;