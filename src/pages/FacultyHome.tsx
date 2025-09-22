import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
    loadStudents();
    loadApplications();
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

  const loadStudents = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('http://localhost:5000/api/users/students', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setStudents(data.data);
      }
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const loadApplications = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('http://localhost:5000/api/applications', {
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
            borderTop: '3px solid #10b981',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          Loading faculty dashboard...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            F
          </div>
          <div>
            <h1 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b',
              margin: 0,
              lineHeight: '1.2'
            }}>
              Faculty Dashboard
            </h1>
            <p style={{
              fontSize: '12px',
              color: '#64748b',
              margin: 0,
              lineHeight: '1.2'
            }}>
              Welcome back, Dr. {user?.profile?.firstName}
            </p>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button
            onClick={() => navigate('/faculty/profile')}
            style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = '#cbd5e1';
              e.target.style.color = '#475569';
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.color = '#64748b';
            }}
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: '#ef4444',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
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
      </header>

      {/* Main Content */}
      <main style={{
        padding: '24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {[
            { label: 'Students', value: students.length, color: '#10b981', bg: '#ecfdf5' },
            { label: 'Applications', value: applications.length, color: '#3b82f6', bg: '#eff6ff' },
            { label: 'Pending Reviews', value: applications.filter(app => app.status === 'pending').length, color: '#f59e0b', bg: '#fffbeb' },
            { label: 'Logbooks', value: '0', color: '#8b5cf6', bg: '#f3e8ff' }
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

        {/* Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px'
        }}>
          {/* Student Management */}
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
                Student Management
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: '4px 0 0 0'
              }}>
                {students.length} students registered
              </p>
            </div>
            <div style={{
              padding: '20px',
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              {students.length === 0 ? (
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
                    👥
                  </div>
                  <p style={{ margin: 0, fontSize: '14px' }}>No students registered yet</p>
                </div>
              ) : (
                students.map((student, index) => (
                  <div key={index} style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '12px'
                  }}>
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1e293b',
                      margin: '0 0 8px 0'
                    }}>
                      {student.profile.firstName} {student.profile.lastName}
                    </h3>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b',
                      marginBottom: '8px'
                    }}>
                      {student.profile.college} • {student.profile.department}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: '#64748b'
                    }}>
                      Student ID: {student.profile.studentId}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Application Reviews */}
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
                Application Reviews
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: '4px 0 0 0'
              }}>
                Review and approve applications
              </p>
            </div>
            <div style={{
              padding: '20px',
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              {applications.length === 0 ? (
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
                    📝
                  </div>
                  <p style={{ margin: 0, fontSize: '14px' }}>No applications to review</p>
                </div>
              ) : (
                applications.map((application, index) => (
                  <div key={index} style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '12px'
                  }}>
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1e293b',
                      margin: '0 0 8px 0'
                    }}>
                      {application.internship?.title}
                    </h3>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b',
                      marginBottom: '8px'
                    }}>
                      {application.student?.profile.firstName} {application.student?.profile.lastName}
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: 
                          application.status === 'accepted' ? '#dcfce7' :
                          application.status === 'rejected' ? '#fef2f2' :
                          application.status === 'pending' ? '#fef3c7' :
                          '#e0f2fe',
                        color:
                          application.status === 'accepted' ? '#166534' :
                          application.status === 'rejected' ? '#dc2626' :
                          application.status === 'pending' ? '#d97706' :
                          '#0369a1'
                      }}>
                        {application.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        color: '#64748b'
                      }}>
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Faculty Actions */}
        <div style={{
          marginTop: '32px',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px'
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1e293b',
            margin: '0 0 16px 0'
          }}>
            Faculty Actions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            {[
              { label: 'Review Applications', action: () => navigate('/faculty/approvals'), color: '#10b981' },
              { label: 'Review Logbooks', action: () => navigate('/faculty/logbooks'), color: '#3b82f6' },
              { label: 'Verify Credentials', action: () => navigate('/faculty/credentials'), color: '#f59e0b' },
              { label: 'Generate Reports', action: () => navigate('/faculty/reports'), color: '#8b5cf6' }
            ].map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = action.color;
                  e.target.style.color = action.color;
                  e.target.style.boxShadow = `0 2px 4px ${action.color}20`;
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.color = '#475569';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FacultyHome;