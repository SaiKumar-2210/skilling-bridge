import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SplashIntro from "./pages/SplashIntro";
import StudentHome from "./pages/StudentHome";
import FacultyHome from "./pages/FacultyHome";
import Search from "./pages/Search";

// Professional Auth page component
const CoolAuth = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = React.useState('');
  const [loginData, setLoginData] = React.useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Automatically proceed to login form after role selection
    setTimeout(() => {
      // Role selection is complete, show login form
    }, 300);
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const { authService } = await import('./services/authService');
      const result = await authService.login(loginData.email, loginData.password);

      if (result.success) {
        navigate(`/${result.user?.role}/home`);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!loginData.email || !loginData.password) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const { authService } = await import('./services/authService');
      const result = await authService.register({
        email: loginData.email,
        password: loginData.password,
        role: selectedRole.toLowerCase() as 'student' | 'faculty' | 'industry' | 'admin',
        profile: {
          firstName: 'New',
          lastName: 'User',
          phone: '',
          ...(selectedRole === 'Student' && { college: '', department: '', studentId: '', yearOfStudy: '' }),
          ...(selectedRole === 'Faculty' && { college: '', department: '', designation: '' }),
          ...(selectedRole === 'Industry' && { company: '', designation: '' })
        }
      });

      if (result.success) {
        navigate(`/${result.user?.role}/home`);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show login form if role is selected
  if (selectedRole) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite reverse'
        }}></div>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          maxWidth: '450px',
          width: '100%',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '50%',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'white',
              boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)'
            }}>
              P
            </div>
            <h1 style={{
              fontSize: '24px',
              marginBottom: '8px',
              color: '#1e293b',
              fontWeight: '700'
            }}>
              Welcome {selectedRole}
            </h1>
            <p style={{ 
              color: '#64748b', 
              fontSize: '14px',
              margin: 0
            }}>
              Sign in to your {selectedRole.toLowerCase()} account
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                {selectedRole === 'Student' ? 'Student Email' : 
                 selectedRole === 'Faculty' ? 'Faculty Email' : 
                 'Company Email'}
              </label>
              <input
                type="email"
                placeholder={selectedRole === 'Student' ? 'student@college.edu' : 
                           selectedRole === 'Faculty' ? 'faculty@college.edu' : 
                           'contact@company.com'}
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  backgroundColor: '#f9fafb'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.backgroundColor = '#f9fafb';
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  backgroundColor: '#f9fafb'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.backgroundColor = '#f9fafb';
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              style={{
                flex: 1,
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '12px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                opacity: isLoading ? 0.7 : 1
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6';
                }
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
            <button
              onClick={handleRegister}
              disabled={isLoading}
              style={{
                flex: 1,
                backgroundColor: '#10b981',
                color: 'white',
                padding: '12px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                opacity: isLoading ? 0.7 : 1
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#059669';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#10b981';
                }
              }}
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </button>
          </div>

          <button
            onClick={() => setSelectedRole('')}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              color: '#6b7280',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = '#f3f4f6';
              (e.target as HTMLButtonElement).style.borderColor = '#9ca3af';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
              (e.target as HTMLButtonElement).style.borderColor = '#d1d5db';
            }}
          >
            ← Back to Role Selection
          </button>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </div>
    );
  }

  // Role selection screen
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite reverse'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite'
      }}></div>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
        maxWidth: '500px',
        width: '100%',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            borderRadius: '50%',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: 'white',
            boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)'
          }}>
            P
          </div>
          <h1 style={{
            fontSize: '28px',
            marginBottom: '12px',
            color: '#1e293b',
            fontWeight: '700'
          }}>
            Choose Your Role
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#64748b',
            margin: 0,
            lineHeight: '1.5'
          }}>
            Select your role to access the platform
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {[
            { role: 'Student', color: '#3b82f6', bg: '#eff6ff' },
            { role: 'Faculty', color: '#10b981', bg: '#ecfdf5' },
            { role: 'Industry', color: '#f59e0b', bg: '#fffbeb' }
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => handleRoleSelect(item.role)}
              style={{
                backgroundColor: selectedRole === item.role ? item.color : 'white',
                color: selectedRole === item.role ? 'white' : '#374151',
                padding: '16px 24px',
                border: `1px solid ${selectedRole === item.role ? item.color : '#d1d5db'}`,
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
              onMouseOver={(e) => {
                if (selectedRole !== item.role) {
                  (e.target as HTMLButtonElement).style.backgroundColor = item.bg;
                  (e.target as HTMLButtonElement).style.borderColor = item.color;
                }
              }}
              onMouseOut={(e) => {
                if (selectedRole !== item.role) {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'white';
                  (e.target as HTMLButtonElement).style.borderColor = '#d1d5db';
                }
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: selectedRole === item.role ? 'rgba(255,255,255,0.2)' : item.bg,
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                {item.role.charAt(0)}
              </div>
              {item.role}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            color: '#6b7280',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#f3f4f6';
            (e.target as HTMLButtonElement).style.borderColor = '#9ca3af';
          }}
          onMouseOut={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
            (e.target as HTMLButtonElement).style.borderColor = '#d1d5db';
          }}
        >
          ← Back to Home
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

const App = () => {
  console.log("App component rendering...");
  
  return (
    <BrowserRouter>
            <Routes>
            <Route path="/" element={<SplashIntro />} />
        <Route path="/auth" element={<CoolAuth />} />

            {/* Student Routes */}
            <Route path="/student/home" element={<StudentHome />} />
            <Route path="/student/search" element={<Search />} />
        <Route path="/student/applications" element={<StudentHome />} />
        <Route path="/student/logbooks" element={<StudentHome />} />
        <Route path="/student/credentials" element={<StudentHome />} />
        <Route path="/student/profile" element={<StudentHome />} />
        <Route path="/student/internship/:id" element={<StudentHome />} />

            {/* Faculty Routes */}
            <Route path="/faculty/home" element={<FacultyHome />} />
        <Route path="/faculty/approvals" element={<FacultyHome />} />
        <Route path="/faculty/logbooks" element={<FacultyHome />} />
        <Route path="/faculty/credentials" element={<FacultyHome />} />

            {/* Industry Routes */}
        <Route path="/industry/home" element={<FacultyHome />} />
        <Route path="/industry/post" element={<FacultyHome />} />

            {/* Admin Routes */}
        <Route path="/admin/home" element={<FacultyHome />} />

        <Route path="*" element={<SplashIntro />} />
            </Routes>
        </BrowserRouter>
);
};

export default App;