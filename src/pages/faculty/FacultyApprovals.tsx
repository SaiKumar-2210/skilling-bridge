import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const FacultyApprovals = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <h1 className="text-2xl font-bold mb-6">Pending Approvals</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Student Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Review and approve student applications</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyApprovals;