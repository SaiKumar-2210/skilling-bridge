import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, CheckCircle, Clock } from "lucide-react";

const CollegeVerify = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (!otp) return;
    
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      navigate("/onboard");
    }, 1500);
  };

  const detectCollegeDomain = (email: string) => {
    const domain = email.split("@")[1];
    if (domain === "student.iitd.ac.in") return "IIT Delhi";
    if (domain === "bits-pilani.ac.in") return "BITS Pilani";
    if (domain === "gmail.com") return null;
    return "Auto-detected College";
  };

  const collegeName = email ? detectCollegeDomain(email) : null;

  return (
    <div className="min-h-screen bg-secondary/20 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pt-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/auth")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Verify College</h1>
            <p className="text-muted-foreground">
              Confirm your academic affiliation
            </p>
          </div>
        </div>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              College Email Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!otpSent ? (
              <>
                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email">College Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.name@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {collegeName && (
                    <div className="flex items-center gap-2 text-sm text-success">
                      <CheckCircle className="w-4 h-4" />
                      Detected: {collegeName}
                    </div>
                  )}
                  {email && !collegeName && (
                    <p className="text-sm text-amber-600">
                      We'll verify this domain with your college admin
                    </p>
                  )}
                </div>

                <Button 
                  onClick={handleSendOTP}
                  disabled={!email || isLoading}
                  className="w-full"
                >
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </Button>
              </>
            ) : (
              <>
                {/* OTP Input */}
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-success">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Code sent to {email}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="otp">6-Digit Verification Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="text-center text-lg tracking-widest"
                    />
                  </div>

                  <Button 
                    onClick={handleVerifyOTP}
                    disabled={otp.length !== 6 || isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Verifying..." : "Verify & Continue"}
                  </Button>

                  <Button 
                    variant="ghost" 
                    onClick={() => setOtpSent(false)}
                    className="w-full"
                  >
                    Use Different Email
                  </Button>
                </div>
              </>
            )}

            {/* Alternative Verification */}
            <div className="border-t pt-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Alternative Verification</p>
                    <p className="text-muted-foreground">
                      If your college email doesn't work, contact your admin 
                      for manual verification approval.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollegeVerify;