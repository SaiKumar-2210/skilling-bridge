import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTransition from "@/components/PageTransition";

// Import pages
import SplashIntro from "./pages/SplashIntro";
import LandingTour from "./pages/LandingTour";
import AuthSelect from "./pages/AuthSelect";
import CollegeVerify from "./pages/CollegeVerify";
import OnboardRole from "./pages/OnboardRole";
import OnboardSlides from "./pages/OnboardSlides";

// Student pages
import StudentHome from "./pages/student/StudentHome";
import Search from "./pages/student/Search";
import InternshipDetail from "./pages/student/InternshipDetail";
import ApplyStep1 from "./pages/student/ApplyStep1";
import ApplyStep2 from "./pages/student/ApplyStep2";
import MyApplications from "./pages/student/MyApplications";
import LogbookNew from "./pages/student/LogbookNew";
import LogbookList from "./pages/student/LogbookList";
import Credential from "./pages/student/Credential";
import Profile from "./pages/student/Profile";

// Faculty pages
import FacultyHome from "./pages/faculty/FacultyHome";
import FacultyApprovals from "./pages/faculty/FacultyApprovals";

// Industry pages
import IndustryHome from "./pages/industry/IndustryHome";
import PostInternship from "./pages/industry/PostInternship";

// Admin pages
import AdminHome from "./pages/admin/AdminHome";

// Shared
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <PageTransition>
          <Routes>
            {/* Unauthenticated Flow */}
            <Route path="/" element={<SplashIntro />} />
            <Route path="/landing" element={<LandingTour />} />
            <Route path="/auth" element={<AuthSelect />} />
            <Route path="/verify-college" element={<CollegeVerify />} />
            <Route path="/onboard" element={<OnboardRole />} />
            <Route path="/onboard-slides" element={<OnboardSlides />} />

            {/* Student Routes */}
            <Route path="/student/home" element={<StudentHome />} />
            <Route path="/student/search" element={<Search />} />
            <Route path="/student/internship/:id" element={<InternshipDetail />} />
            <Route path="/student/apply/:id/step1" element={<ApplyStep1 />} />
            <Route path="/student/apply/:id/step2" element={<ApplyStep2 />} />
            <Route path="/student/applications" element={<MyApplications />} />
            <Route path="/student/logbook/new" element={<LogbookNew />} />
            <Route path="/student/logbook" element={<LogbookList />} />
            <Route path="/student/credential/:id" element={<Credential />} />
            <Route path="/student/profile" element={<Profile />} />

            {/* Faculty Routes */}
            <Route path="/faculty/home" element={<FacultyHome />} />
            <Route path="/faculty/approvals" element={<FacultyApprovals />} />

            {/* Industry Routes */}
            <Route path="/industry/home" element={<IndustryHome />} />
            <Route path="/industry/post" element={<PostInternship />} />

            {/* Admin Routes */}
            <Route path="/admin/home" element={<AdminHome />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;