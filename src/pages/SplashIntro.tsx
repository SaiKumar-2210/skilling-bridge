import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Award, Sparkles, Star, Users, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SplashIntro = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);

  // Removed auto-redirect to keep this as the main landing page

  const features = [
    {
      icon: BookOpen,
      text: "Track your internship journey",
      color: "text-blue-400"
    },
    {
      icon: Award,
      text: "Earn verifiable credentials",
      color: "text-yellow-400"
    },
    {
      icon: GraduationCap,
      text: "Faculty-verified learning",
      color: "text-green-400"
    },
    {
      icon: Users,
      text: "Connect with industry leaders",
      color: "text-purple-400"
    },
    {
      icon: TrendingUp,
      text: "Build your professional network",
      color: "text-pink-400"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="max-w-md mx-auto space-y-8 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div 
          className="space-y-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <GraduationCap className="w-10 h-10 text-white" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full opacity-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Prashiskshan
          </motion.h1>
          
          <motion.p 
            className="text-white/90 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            NEP-Compliant Internship Platform
          </motion.p>
        </motion.div>

        {/* Animated Features Carousel */}
        <motion.div 
          className="space-y-6 min-h-[120px] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              className="flex items-center gap-4 text-white/90"
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.div
                className={`w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm ${features[currentFeature].color}`}
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {React.createElement(features[currentFeature].icon, { className: "w-6 h-6" })}
              </motion.div>
              <span className="text-lg font-medium">{features[currentFeature].text}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Feature Indicators */}
        <motion.div 
          className="flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {features.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentFeature ? 'bg-white' : 'bg-white/30'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={() => navigate("/auth")}
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold btn-smooth relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Get Started
              </span>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="outline"
              onClick={() => navigate("/auth")}
              className="w-full border-2 border-white text-white hover:bg-white hover:text-primary btn-smooth relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Star className="w-4 h-4" />
                Watch Demo
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Stats */}
        <motion.div 
          className="flex justify-center space-x-8 text-white/70 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-white">10K+</div>
            <div>Students</div>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-white">500+</div>
            <div>Companies</div>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-white">95%</div>
            <div>Success Rate</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashIntro;