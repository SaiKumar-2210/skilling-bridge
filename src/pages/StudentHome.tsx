import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    loadUserData();
    loadInternships();
    loadApplications();

    // Handle window resize
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (!mobile) {
        setSidebarOpen(true); // Auto-open sidebar on desktop
      } else {
        setSidebarOpen(false); // Auto-close sidebar on mobile
      }
    };

    // Set initial state based on screen size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadUserData = async () => {
    try {
      const { authService } = await import('../services/authService');
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
      navigate('/auth');
    }
  };

  const loadInternships = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/internships?limit=6');
      const data = await response.json();
      if (data.success) {
        setInternships(data.data);
      }
    } catch (error) {
      console.error('Error loading internships:', error);
    }
  };

  const loadApplications = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('http://localhost:5000/api/applications/my', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { authService } = await import('../services/authService');
      await authService.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'find', label: 'Find Internship', icon: '🔍' },
    { id: 'applications', label: 'My Applications', icon: '📝' },
    { id: 'logbook', label: 'Logbook', icon: '📖' },
    { id: 'certificates', label: 'Certificates', icon: '🏆' },
    { id: 'reports', label: 'Reports', icon: '📊' },
    { id: 'community', label: 'Community', icon: '👥' }
  ];

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#64748b'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #e2e8f0',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '280px' : '0',
        background: 'white',
        borderRight: '1px solid #e2e8f0',
        padding: sidebarOpen ? '24px 0' : '0',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        zIndex: 40,
        transition: 'all 0.3s ease',
        left: 0,
        top: 0
      }}>
        {/* Logo */}
        <div style={{
          padding: sidebarOpen ? '0 24px 32px' : '0',
          borderBottom: sidebarOpen ? '1px solid #e2e8f0' : 'none',
          marginBottom: sidebarOpen ? '24px' : '0',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            opacity: sidebarOpen ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              P
            </div>
            <div>
              <h1 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1e293b',
                margin: 0,
                lineHeight: '1.2'
              }}>
                Prashiskshan
              </h1>
              <p style={{
                fontSize: '12px',
                color: '#64748b',
                margin: 0,
                lineHeight: '1.2'
              }}>
                Student Portal
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ 
          padding: sidebarOpen ? '0 12px' : '0',
          opacity: sidebarOpen ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false); // Close sidebar on mobile after selection
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                marginBottom: '4px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: activeTab === item.id ? '#eff6ff' : 'transparent',
                color: activeTab === item.id ? '#1d4ed8' : '#64748b',
                textAlign: 'left'
              }}
              onMouseOver={(e) => {
                if (activeTab !== item.id) {
                  e.target.style.backgroundColor = '#f8fafc';
                  e.target.style.color = '#475569';
                }
              }}
              onMouseOut={(e) => {
                if (activeTab !== item.id) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#64748b';
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Info */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          right: '24px',
          padding: '16px',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          opacity: sidebarOpen ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#3b82f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {user?.profile?.firstName?.charAt(0) || 'U'}
            </div>
            <div>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#1e293b'
              }}>
                {user?.profile?.firstName} {user?.profile?.lastName}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#64748b'
              }}>
                {user?.profile?.college || 'Student'}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#dc2626';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#ef4444';
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 30
          }}
        />
      )}

      {/* Main Content */}
      <div style={{
        marginLeft: !isMobile ? (sidebarOpen ? '280px' : '0') : '0',
        flex: 1,
        padding: '24px',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Mobile Header */}
        <div style={{
          display: isMobile ? 'flex' : 'none',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px',
          padding: '16px',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '16px' }}>☰</span>
          </button>
          <div>
            <h1 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b',
              margin: 0,
              lineHeight: '1.2'
            }}>
              Student Dashboard
            </h1>
            <p style={{
              fontSize: '12px',
              color: '#64748b',
              margin: 0,
              lineHeight: '1.2'
            }}>
              Welcome back, {user?.profile?.firstName}
            </p>
          </div>
        </div>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          marginBottom: '24px',
          display: isMobile ? 'none' : 'block'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1e293b',
            margin: '0 0 8px 0'
          }}>
            Welcome back, {user?.profile?.firstName}!
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#64748b',
            margin: 0
          }}>
            Track your internship journey and discover new opportunities
          </p>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              {[
                { label: 'Applications', value: applications.length, color: '#3b82f6', bg: '#eff6ff' },
                { label: 'Accepted', value: applications.filter(app => app.status === 'accepted').length, color: '#10b981', bg: '#ecfdf5' },
                { label: 'Available', value: internships.length, color: '#f59e0b', bg: '#fffbeb' },
                { label: 'Credits', value: '12', color: '#8b5cf6', bg: '#f3e8ff' }
              ].map((stat, index) => (
                <div key={index} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: stat.bg,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        background: stat.color,
                        borderRadius: '4px'
                      }}></div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '4px'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#64748b',
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Main Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '24px'
            }}>
              {/* Ongoing Internship Progress */}
              <div style={{
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '20px',
                  borderBottom: '1px solid #e2e8f0',
                  background: '#f8fafc'
                }}>
                  <h2 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: 0
                  }}>
                    Ongoing Internship Progress
                  </h2>
                </div>
                <div style={{ padding: '20px' }}>
                  {applications.filter(app => app.status === 'accepted').length > 0 ? (
                    <div>
                      <div style={{
                        fontSize: '14px',
                        color: '#64748b',
                        marginBottom: '12px'
                      }}>
                        You have an active internship
                      </div>
                      <div style={{
                        background: '#ecfdf5',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #d1fae5'
                      }}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#065f46',
                          marginBottom: '4px'
                        }}>
                          Progress: 65%
                        </div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          background: '#d1fae5',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: '65%',
                            height: '100%',
                            background: '#10b981',
                            borderRadius: '3px'
                          }}></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      textAlign: 'center',
                      padding: '40px',
                      color: '#64748b'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: '#f1f5f9',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        fontSize: '20px'
                      }}>
                        📈
                      </div>
                      <p style={{ margin: 0, fontSize: '14px' }}>No active internship</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Apply to get started</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Logbook Quick Add */}
              <div style={{
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '20px',
                  borderBottom: '1px solid #e2e8f0',
                  background: '#f8fafc'
                }}>
                  <h2 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: 0
                  }}>
                    Logbook Quick Add
                  </h2>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#64748b',
                    marginBottom: '16px'
                  }}>
                    Add today's progress entry
                  </div>
                  <textarea
                    placeholder="What did you learn today?"
                    style={{
                      width: '100%',
                      height: '80px',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '14px',
                      resize: 'none',
                      outline: 'none',
                      marginBottom: '12px'
                    }}
                  />
                  <button
                    onClick={() => setActiveTab('logbook')}
                    style={{
                      width: '100%',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#2563eb';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = '#3b82f6';
                    }}
                  >
                    Add Entry
                  </button>
                </div>
              </div>

              {/* Recommended Internships */}
              <div style={{
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                gridColumn: 'span 2'
              }}>
                <div style={{
                  padding: '20px',
                  borderBottom: '1px solid #e2e8f0',
                  background: '#f8fafc'
                }}>
                  <h2 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: 0
                  }}>
                    AI Recommended Internships
                  </h2>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: '4px 0 0 0'
                  }}>
                    Based on your profile and interests
                  </p>
                </div>
                <div style={{
                  padding: '20px',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  {internships.slice(0, 3).map((internship, index) => (
                    <div key={index} style={{
                      padding: '16px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      marginBottom: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#3b82f6';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    onClick={() => navigate(`/student/internship/${internship._id}`)}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '8px'
                      }}>
                        <h3 style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1e293b',
                          margin: 0
                        }}>
                          {internship.title}
                        </h3>
                        <span style={{
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: '500',
                          backgroundColor: '#fef3c7',
                          color: '#d97706'
                        }}>
                          AI Recommended
                        </span>
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#64748b',
                        marginBottom: '8px'
                      }}>
                        {internship.company} • {internship.location}
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#10b981'
                        }}>
                          ₹{internship.stipend.amount.toLocaleString()}/month
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: '#64748b'
                        }}>
                          {internship.duration} weeks
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{
                  padding: '16px 20px',
                  borderTop: '1px solid #e2e8f0',
                  background: '#f8fafc'
                }}>
                  <button
                    onClick={() => setActiveTab('find')}
                    style={{
                      width: '100%',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#2563eb';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = '#3b82f6';
                    }}
                  >
                    View All Recommendations
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Tab Content */}
        {activeTab !== 'dashboard' && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '40px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}>
              {sidebarItems.find(item => item.id === activeTab)?.icon}
            </div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '8px'
            }}>
              {sidebarItems.find(item => item.id === activeTab)?.label}
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              margin: 0
            }}>
              This feature is coming soon. Stay tuned!
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default StudentHome;