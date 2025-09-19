import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search as SearchIcon, 
  Filter,
  ArrowLeft,
  MapPin,
  Clock,
  Building2,
  Heart,
  Share
} from "lucide-react";

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    duration: "",
    stipend: "",
    skills: []
  });

  // Mock search results
  const searchResults = [
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
      description: "Build modern web applications using React and TypeScript...",
      saved: false
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
      description: "Work on real-world data science projects...",
      saved: true
    },
    {
      id: "3",
      title: "UI/UX Design Intern",
      company: "Design Studio",
      verified: true,
      location: "Delhi",
      duration: "4 months",
      stipend: "₹18,000/month",
      skills: ["Figma", "User Research", "Prototyping"],
      deadline: "2024-01-18",
      description: "Create amazing user experiences for mobile and web...",
      saved: false
    }
  ];

  const handleSave = (internshipId: string) => {
    // In production, this would save to Supabase
    console.log("Saving internship:", internshipId);
  };

  const handleShare = (internshipId: string) => {
    // In production, this would open share dialog
    console.log("Sharing internship:", internshipId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="flex items-center gap-4 p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/student/home")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search internships, companies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12"
              autoFocus
            />
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="px-4 pb-4">
          <div className="flex gap-2 overflow-x-auto">
            <Badge variant="outline" className="whitespace-nowrap">All</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Remote</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Tech</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Verified</Badge>
            <Badge variant="outline" className="whitespace-nowrap">High Stipend</Badge>
          </div>
        </div>
      </header>

      <div className="p-4">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">
            {searchResults.length} internships found
          </h2>
          <Button variant="outline" size="sm">
            Sort by: Relevance
          </Button>
        </div>

        {/* Search Results */}
        <div className="space-y-4 pb-20">
          {searchResults.map((internship) => (
            <Card 
              key={internship.id} 
              className="shadow-soft hover:shadow-medium transition-all"
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => navigate(`/student/internship/${internship.id}`)}
                    >
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
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleSave(internship.id)}
                      >
                        <Heart 
                          className={`w-5 h-5 ${
                            internship.saved 
                              ? "fill-red-500 text-red-500" 
                              : "text-muted-foreground"
                          }`} 
                        />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleShare(internship.id)}
                      >
                        <Share className="w-5 h-5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>

                  {/* Stipend and Duration */}
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-accent">{internship.stipend}</div>
                    <div className="text-sm text-muted-foreground">{internship.duration}</div>
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

                  {/* Apply Button */}
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/student/apply/${internship.id}/step1`)}
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="grid grid-cols-5 gap-1">
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/student/home")}
          >
            <SearchIcon className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" className="h-16 flex-col gap-1 text-primary">
            <SearchIcon className="w-5 h-5" />
            <span className="text-xs">Search</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/student/applications")}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-xs">My Apps</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/student/logbook/new")}
          >
            <Clock className="w-5 h-5" />
            <span className="text-xs">Log</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 flex-col gap-1"
            onClick={() => navigate("/student/profile")}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Search;