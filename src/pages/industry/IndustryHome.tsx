import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

const IndustryHome = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <h1 className="text-2xl font-bold mb-6">Industry Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Internship Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage internship postings and applications</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryHome;