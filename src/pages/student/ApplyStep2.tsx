import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const ApplyStep2 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Apply - Step 2</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Final Review</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Review and submit your application</p>
            <Button 
              onClick={() => navigate("/student/applications")}
              className="w-full"
            >
              Submit Application
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyStep2;