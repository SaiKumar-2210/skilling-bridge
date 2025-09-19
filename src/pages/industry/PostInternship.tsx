import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const PostInternship = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <h1 className="text-2xl font-bold mb-6">Post New Internship</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Internship
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Post internship opportunities for students</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostInternship;