const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const User = require('./models/User');
const Internship = require('./models/Internship');
const Application = require('./models/Application');
const Logbook = require('./models/Logbook');
const Credential = require('./models/Credential');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB for seeding'))
.catch(err => console.error('❌ MongoDB connection error:', err));

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Internship.deleteMany({});
    await Application.deleteMany({});
    await Logbook.deleteMany({});
    await Credential.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create users
    const users = await User.create([
      // Admin
      {
        email: 'admin@prashiskshan.com',
        password: 'admin123',
        role: 'admin',
        profile: {
          firstName: 'Admin',
          lastName: 'User',
          phone: '+91 9876543210',
          company: 'Prashiskshan',
          designation: 'System Administrator'
        },
        isVerified: true
      },
      // Students
      {
        email: 'student1@example.com',
        password: 'student123',
        role: 'student',
        profile: {
          firstName: 'Raj',
          lastName: 'Kumar',
          phone: '+91 9876543211',
          college: 'IIT Delhi',
          department: 'Computer Science',
          studentId: '2023CS001',
          yearOfStudy: '3rd Year'
        },
        isVerified: true
      },
      {
        email: 'student2@example.com',
        password: 'student123',
        role: 'student',
        profile: {
          firstName: 'Priya',
          lastName: 'Sharma',
          phone: '+91 9876543212',
          college: 'IIT Bombay',
          department: 'Electronics',
          studentId: '2023EE002',
          yearOfStudy: '2nd Year'
        },
        isVerified: true
      },
      {
        email: 'student3@example.com',
        password: 'student123',
        role: 'student',
        profile: {
          firstName: 'Amit',
          lastName: 'Singh',
          phone: '+91 9876543213',
          college: 'IIT Madras',
          department: 'Mechanical',
          studentId: '2023ME003',
          yearOfStudy: '4th Year'
        },
        isVerified: true
      },
      // Faculty
      {
        email: 'faculty1@example.com',
        password: 'faculty123',
        role: 'faculty',
        profile: {
          firstName: 'Dr. Neha',
          lastName: 'Gupta',
          phone: '+91 9876543214',
          college: 'IIT Delhi',
          department: 'Computer Science',
          designation: 'Professor'
        },
        isVerified: true
      },
      {
        email: 'faculty2@example.com',
        password: 'faculty123',
        role: 'faculty',
        profile: {
          firstName: 'Prof. Ravi',
          lastName: 'Verma',
          phone: '+91 9876543215',
          college: 'IIT Bombay',
          department: 'Electronics',
          designation: 'Associate Professor'
        },
        isVerified: true
      },
      // Industry
      {
        email: 'industry1@techcorp.com',
        password: 'industry123',
        role: 'industry',
        profile: {
          firstName: 'Suresh',
          lastName: 'Patel',
          phone: '+91 9876543216',
          company: 'TechCorp Solutions',
          designation: 'HR Manager'
        },
        isVerified: true
      },
      {
        email: 'industry2@innovate.com',
        password: 'industry123',
        role: 'industry',
        profile: {
          firstName: 'Meera',
          lastName: 'Jain',
          phone: '+91 9876543217',
          company: 'InnovateTech',
          designation: 'Project Manager'
        },
        isVerified: true
      },
      {
        email: 'industry3@startup.com',
        password: 'industry123',
        role: 'industry',
        profile: {
          firstName: 'Vikram',
          lastName: 'Reddy',
          phone: '+91 9876543218',
          company: 'StartupHub',
          designation: 'CTO'
        },
        isVerified: true
      }
    ]);

    console.log(`👥 Created ${users.length} users`);

    // Create internships
    const internships = await Internship.create([
      {
        title: 'Full Stack Development Intern',
        description: 'Join our dynamic team to work on cutting-edge web applications using React, Node.js, and MongoDB. You will be involved in all aspects of development from frontend to backend.',
        company: 'TechCorp Solutions',
        location: 'Bangalore',
        type: 'hybrid',
        duration: 12,
        stipend: {
          amount: 15000,
          currency: 'INR',
          type: 'paid'
        },
        skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
        requirements: ['Computer Science background', 'Basic knowledge of web development', 'Good problem-solving skills'],
        responsibilities: ['Develop web applications', 'Write clean code', 'Collaborate with team', 'Learn new technologies'],
        benefits: ['Mentorship', 'Certificate', 'Job opportunity', 'Flexible hours'],
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-05-01'),
        applicationDeadline: new Date('2024-01-25'),
        maxApplications: 50,
        currentApplications: 0,
        status: 'active',
        postedBy: users.find(u => u.email === 'industry1@techcorp.com')._id,
        category: 'Software Development',
        tags: ['Web Development', 'Full Stack', 'React', 'Node.js']
      },
      {
        title: 'Data Science Intern',
        description: 'Work on real-world data science projects including data analysis, machine learning model development, and data visualization. Perfect for students interested in AI/ML.',
        company: 'InnovateTech',
        location: 'Mumbai',
        type: 'remote',
        duration: 16,
        stipend: {
          amount: 20000,
          currency: 'INR',
          type: 'paid'
        },
        skills: ['Python', 'Machine Learning', 'Data Analysis', 'Pandas', 'NumPy', 'Scikit-learn'],
        requirements: ['Statistics background', 'Python programming', 'Mathematics knowledge'],
        responsibilities: ['Analyze datasets', 'Build ML models', 'Create visualizations', 'Write reports'],
        benefits: ['Research experience', 'Publication opportunity', 'Industry exposure'],
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-06-30'),
        applicationDeadline: new Date('2024-02-20'),
        maxApplications: 30,
        currentApplications: 0,
        status: 'active',
        postedBy: users.find(u => u.email === 'industry2@innovate.com')._id,
        category: 'Data Science',
        tags: ['Machine Learning', 'Python', 'Data Analysis', 'AI']
      },
      {
        title: 'Mobile App Development Intern',
        description: 'Develop mobile applications for iOS and Android platforms using React Native. Work on user interface design and app functionality.',
        company: 'StartupHub',
        location: 'Delhi',
        type: 'onsite',
        duration: 8,
        stipend: {
          amount: 12000,
          currency: 'INR',
          type: 'paid'
        },
        skills: ['React Native', 'JavaScript', 'iOS', 'Android', 'UI/UX'],
        requirements: ['Mobile development interest', 'JavaScript knowledge', 'Design sense'],
        responsibilities: ['Build mobile apps', 'Design interfaces', 'Test applications', 'Deploy apps'],
        benefits: ['App store experience', 'Portfolio building', 'Startup culture'],
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-03-15'),
        applicationDeadline: new Date('2024-01-10'),
        maxApplications: 25,
        currentApplications: 0,
        status: 'active',
        postedBy: users.find(u => u.email === 'industry3@startup.com')._id,
        category: 'Mobile Development',
        tags: ['React Native', 'Mobile', 'iOS', 'Android']
      },
      {
        title: 'Cybersecurity Intern',
        description: 'Learn about cybersecurity practices, vulnerability assessment, and security implementation. Work on real security projects and learn from experts.',
        company: 'SecureTech',
        location: 'Pune',
        type: 'hybrid',
        duration: 10,
        stipend: {
          amount: 18000,
          currency: 'INR',
          type: 'paid'
        },
        skills: ['Cybersecurity', 'Network Security', 'Ethical Hacking', 'Linux'],
        requirements: ['Computer Science background', 'Security interest', 'Linux knowledge'],
        responsibilities: ['Security testing', 'Vulnerability assessment', 'Documentation', 'Research'],
        benefits: ['Security certification', 'Industry training', 'Expert mentorship'],
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-06-15'),
        applicationDeadline: new Date('2024-03-20'),
        maxApplications: 20,
        currentApplications: 0,
        status: 'active',
        postedBy: users.find(u => u.email === 'industry1@techcorp.com')._id,
        category: 'Cybersecurity',
        tags: ['Security', 'Ethical Hacking', 'Network Security']
      },
      {
        title: 'UI/UX Design Intern',
        description: 'Create beautiful and user-friendly interfaces for web and mobile applications. Work with design tools and learn user research methodologies.',
        company: 'DesignStudio',
        location: 'Chennai',
        type: 'remote',
        duration: 14,
        stipend: {
          amount: 10000,
          currency: 'INR',
          type: 'paid'
        },
        skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research', 'Prototyping'],
        requirements: ['Design background', 'Creative thinking', 'Tool knowledge'],
        responsibilities: ['Create designs', 'User research', 'Prototyping', 'Collaboration'],
        benefits: ['Design portfolio', 'Mentorship', 'Creative freedom'],
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-05-30'),
        applicationDeadline: new Date('2024-02-05'),
        maxApplications: 15,
        currentApplications: 0,
        status: 'active',
        postedBy: users.find(u => u.email === 'industry2@innovate.com')._id,
        category: 'Design',
        tags: ['UI/UX', 'Design', 'Figma', 'User Research']
      }
    ]);

    console.log(`💼 Created ${internships.length} internships`);

    // Create some applications
    const applications = await Application.create([
      {
        student: users.find(u => u.email === 'student1@example.com')._id,
        internship: internships[0]._id,
        coverLetter: 'I am very interested in this Full Stack Development internship. I have been learning React and Node.js for the past year and have built several projects. I am eager to apply my skills in a real-world environment and learn from experienced developers.',
        resume: {
          url: 'https://example.com/resume1.pdf',
          filename: 'raj_kumar_resume.pdf',
          originalName: 'Raj Kumar Resume.pdf'
        },
        portfolio: {
          url: 'https://rajkumar.dev',
          description: 'My portfolio showcasing web development projects'
        },
        status: 'accepted'
      },
      {
        student: users.find(u => u.email === 'student2@example.com')._id,
        internship: internships[1]._id,
        coverLetter: 'As an Electronics student with a passion for data science, I am excited about this opportunity. I have completed several online courses in Python and machine learning and have worked on data analysis projects.',
        resume: {
          url: 'https://example.com/resume2.pdf',
          filename: 'priya_sharma_resume.pdf',
          originalName: 'Priya Sharma Resume.pdf'
        },
        status: 'under_review'
      },
      {
        student: users.find(u => u.email === 'student3@example.com')._id,
        internship: internships[2]._id,
        coverLetter: 'I am a Mechanical Engineering student with a strong interest in mobile app development. I have been learning React Native and have built a few mobile apps. I am excited to work in a startup environment.',
        resume: {
          url: 'https://example.com/resume3.pdf',
          filename: 'amit_singh_resume.pdf',
          originalName: 'Amit Singh Resume.pdf'
        },
        status: 'shortlisted'
      }
    ]);

    console.log(`📝 Created ${applications.length} applications`);

    // Create some logbooks
    const logbooks = await Logbook.create([
      {
        student: users.find(u => u.email === 'student1@example.com')._id,
        internship: internships[0]._id,
        title: 'Week 1 - Project Setup and Learning',
        week: 1,
        date: new Date('2024-02-01'),
        tasksCompleted: [
          {
            task: 'Environment Setup',
            description: 'Set up development environment with React, Node.js, and MongoDB',
            hoursSpent: 8
          },
          {
            task: 'Code Review',
            description: 'Reviewed existing codebase and documentation',
            hoursSpent: 6
          }
        ],
        skillsLearned: [
          {
            skill: 'React Hooks',
            proficiency: 'intermediate'
          },
          {
            skill: 'MongoDB Queries',
            proficiency: 'beginner'
          }
        ],
        challenges: [
          {
            challenge: 'Understanding complex state management',
            solution: 'Studied Redux patterns and practiced with small projects',
            outcome: 'Successfully implemented state management in practice task'
          }
        ],
        achievements: [
          {
            achievement: 'Completed first feature implementation',
            impact: 'Contributed to user authentication module'
          }
        ],
        reflection: 'First week was challenging but exciting. I learned a lot about modern web development practices and got familiar with the codebase. Looking forward to contributing more in the coming weeks.',
        status: 'approved',
        submittedAt: new Date('2024-02-07'),
        reviewedAt: new Date('2024-02-08'),
        reviewedBy: users.find(u => u.email === 'industry1@techcorp.com')._id,
        feedback: 'Great work on the first week! Your code quality is good and you are learning quickly. Keep up the good work!',
        rating: 4
      }
    ]);

    console.log(`📖 Created ${logbooks.length} logbooks`);

    // Create some credentials
    const credentials = await Credential.create([
      {
        student: users.find(u => u.email === 'student1@example.com')._id,
        internship: internships[0]._id,
        company: 'TechCorp Solutions',
        title: 'Full Stack Development Intern',
        duration: 12,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-05-01'),
        skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
        achievements: [
          'Developed user authentication system',
          'Implemented responsive UI components',
          'Optimized database queries',
          'Collaborated with cross-functional team'
        ],
        performance: {
          rating: 4.5,
          feedback: 'Excellent performance throughout the internship. Showed great initiative and technical skills.',
          strengths: ['Quick learner', 'Good problem solver', 'Team player'],
          areasForImprovement: ['Code documentation', 'Testing practices']
        },
        certificate: {
          url: 'https://example.com/certificates/techcorp_intern_2024.pdf',
          issuedAt: new Date('2024-05-01'),
          validUntil: new Date('2025-05-01'),
          credentialId: 'PRS-20240501-ABC123DEF'
        },
        status: 'verified',
        verifiedBy: users.find(u => u.email === 'industry1@techcorp.com')._id,
        verifiedAt: new Date('2024-05-02')
      }
    ]);

    console.log(`🏆 Created ${credentials.length} credentials`);

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`👥 Users: ${users.length}`);
    console.log(`💼 Internships: ${internships.length}`);
    console.log(`📝 Applications: ${applications.length}`);
    console.log(`📖 Logbooks: ${logbooks.length}`);
    console.log(`🏆 Credentials: ${credentials.length}`);

    console.log('\n🔑 Test Accounts:');
    console.log('Admin: admin@prashiskshan.com / admin123');
    console.log('Student: student1@example.com / student123');
    console.log('Faculty: faculty1@example.com / faculty123');
    console.log('Industry: industry1@techcorp.com / industry123');

  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();

