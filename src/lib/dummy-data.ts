const blogs: BlogPost[] = [
    {
      id: 1,
      slug: 'react-server-components',
      title: 'Understanding React Server Components',
      content:
        'React Server Components offer a way to build faster, more scalable applications by splitting rendering between the client and server...',
      images: [
        {
          id: 1,
          image:
            'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?auto=format&fit=crop&w=1170&q=80',
          publicId: 'rsc-image-1',
        },
      ],
      author: 'Henok Lantu',
      category: 'React',
      tags: ['React', 'Server Components', 'Next.js'],
      type: 'tutorial',
      readingTime: '6 min',
      updatedAt: '2023-07-01',
      createdAt: '2023-06-29',
      isFeatured: true,
      published: true,
    },
    {
      id: 2,
      slug: 'why-tailwind',
      title: 'Why Tailwind CSS is Better for Developers',
      content:
        'Tailwind CSS helps developers build beautiful UIs without leaving the HTML, speeding up development with utility-first classes...',
      author: 'Henok Lantu',
      category: 'CSS',
      tags: ['Tailwind', 'CSS', 'UI Design'],
      type: 'opinion',
      readingTime: '4 min',
      updatedAt: '2023-06-25',
      createdAt: '2023-06-24',
      isFeatured: false,
      published: true,
    },
    {
      id: 3,
      slug: 'how-to-use-usememo',
      title: 'How and When to Use useMemo in React',
      content:
        'The useMemo hook helps improve performance by memoizing expensive calculations, but it should be used wisely...',
      author: 'Henok Lantu',
      category: 'React',
      tags: ['React', 'Hooks', 'Performance'],
      type: 'guide',
      readingTime: '5 min',
      updatedAt: '2023-06-21',
      createdAt: '2023-06-20',
      isFeatured: false,
      published: true,
    },
  ]

export default blogs


const allProjects = [
  {
    id: '1',
    title: "Ai Mentor Plus ai course generator platform",
    description: "A platform for creating and sharing AI course content for students.",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    image: "/ai-mentor.png",
    github: "https://github.com/henokhackz/ai-mentor",
    live: "https://ai-mentor-plus.vercel.app/",
    featured: true,
    status: "100% Finished",
    caseStudy: {
      problem: "Manually designing AI courses requires significant time and technical effort, creating a barrier for educators and independent learners.",
      solution: "Ai Mentor Plus simplifies course creation by generating structured AI curricula using a course title and minimal input.",
      features: [
        "AI-driven course and module generation",
        "User-friendly dashboard for managing learning content",
        "Responsive and accessible UI with dark mode",
        "Next.js App Router and Tailwind-powered design",
      ],
      role: "Full Stack Developer (AI integration, frontend, backend, UI design)",
      lessons: [
        "Learned prompt engineering for OpenAI APIs",
        "Enhanced skill in building AI-first products",
        "Optimized dynamic rendering in Next.js",
      ]
    }
  },
  {
    id: '2',
    title: "Zembil E-commerce App",
    description: "A full-featured ecommerce platform with admin dashboard, payment integration (Stripe, PayPal), and responsive UI.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn", "PostgreSQL", "Prisma", "Stripe", "PayPal"],
    image: "/zembil.png",
    github: "https://github.com/henokhackz/zembil",
    live: "https://zembil-self.vercel.app/",
    featured: true,
    status: "100% Finished",
    caseStudy: {
      problem: "Ethiopian online shopping platforms often lack modern features, user-friendly interfaces, and global payment options.",
      solution: "Zembil provides a scalable e-commerce experience with payment integrations, admin tools, and a responsive customer UI.",
      features: [
        "Stripe and PayPal checkout integration",
        "Admin dashboard with product and order control",
        "Dark/light mode UI",
        "Fully typed TypeScript + Prisma backend",
      ],
      role: "Full Stack Developer (Payments, dashboard, data modeling)",
      lessons: [
        "Implemented secure checkout with Stripe webhooks",
        "Built and optimized a scalable PostgreSQL schema",
        "Improved accessibility and mobile responsiveness",
      ]
    }
  },
  {
    id: '3',
    title: "Lost and Found",
    description: "A platform for lost and found items, where users can post lost items and search for found items.",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    image: "/lost-and-found.png",
    github: "https://github.com/henokhackz/lost-and-found",
    live: "https://lost-and-found-murex.vercel.app/",
    featured: true,
    status: "100% Finished",
    caseStudy: {
      problem: "There is no digital system in universities or communities for managing lost and found items efficiently.",
      solution: "A community-driven platform that allows users to report and search for lost or found items in real-time.",
      features: [
        "Post creation with item image and description",
        "Search and filter functionality",
        "Contact info for item claim",
      ],
      role: "Solo Developer (design, UI logic, deployment)",
      lessons: [
        "Learned real-world use of dynamic routing",
        "Practiced UX principles for form-heavy interfaces",
        "Improved page performance on Next.js",
      ]
    }
  },
  {
    id: '4',
    title: "Smart Dorm and Cafe Management System",
    description: "Automates dorm assignments, tracks equipment, and supports Excel data import for admins.",
    technologies: ["Next.js", "React Query", "ExcelJS", "Tailwind CSS"],
    image: "/dorm.jpg",
    github: "https://github.com/henokhackz/quick-bite",
    live: "https://quick-bite-indol-omega.vercel.app/",
    featured: true,
    status: "100% Finished",
    caseStudy: {
      problem: "University dorm and cafeteria management is traditionally manual, error-prone, and inefficient.",
      solution: "A smart system that automates dorm assignments, equipment tracking, and cafeteria attendance via QR codes.",
      features: [
        "Excel import for student data and dorm assignments",
        "QR code-based attendance system",
        "Role-based access control",
        "Real-time data sync with React Query",
      ],
      role: "Lead Developer (architecture, ExcelJS integration, QR logic)",
      lessons: [
        "Learned to integrate ExcelJS for data import/export",
        "Handled complex UI logic using React Query and mutations",
        "Designed a scalable access-control system",
      ]
    }
  },
  {
    id: '5',
    title: "WiseHub",
    description: "A book lovers community that lets users enjoy reading while listening to music in real-time.",
    technologies: ["React", "Firebase", "Firestore", "JavaScript"],
    image: "/wisehub.png",
    github: "https://github.com/lantumo0001/wise-hub",
    live: "https://wise-hub.vercel.app/",
    featured: false,
    status: "100% Finished",
    caseStudy: {
      problem: "Readers often want to combine music with reading in a social and interactive space.",
      solution: "WiseHub synchronizes music and reading in a web-based community for book lovers.",
      features: [
        "Real-time reading rooms",
        "Firebase authentication",
        "Music player integration",
        "Firestore-based chat and sync",
      ],
      role: "Frontend Developer (UI logic, Firestore setup)",
      lessons: [
        "Practiced Firebase real-time features",
        "Built custom music controls in React",
        "Designed state-driven UI with React Context",
      ]
    }
  },
  {
    id: '6',
    title: "Feedback Management Portal",
    description: "Internal tool for Ethio Telecom to analyze employee feedback via dashboards and charts.",
    technologies: ["React", "Chart.js", "Node.js", "Express", "MongoDB"],
    image: "/ethio-voice.png",
    github: "https://github.com/henokhackz/ethio-voice",
    live: "https://ethio-voice.vercel.app/",
    featured: false,
    status: "100% Finished",
    caseStudy: {
      problem: "Manual collection and analysis of employee feedback in large organizations leads to poor decision-making.",
      solution: "Ethio Voice portal simplifies feedback analysis with visual insights and structured feedback data.",
      features: [
        "Custom admin charts via Chart.js",
        "Feedback sentiment scoring",
        "MongoDB schema for scalable data handling",
        "Role-based login",
      ],
      role: "Full Stack Developer (Node.js API, MongoDB, frontend charts)",
      lessons: [
        "Used Chart.js for dynamic data visualization",
        "Created RESTful Express APIs",
        "Improved skills in building admin dashboards",
      ]
    }
  },
  {
    id: '7',
    title: "Fedel AI",
    description: "Helps users learn English by leveraging subtitles from movies and series.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/fedel-ai.png",
    github: "https://github.com/henokhackz/fidel-ai",
    live: "https://fedel-ai.vercel.app",
    featured: true,
    status: "In Progress",
    caseStudy: {
      problem: "Language learners struggle to retain vocabulary and expressions without engaging, contextual resources.",
      solution: "Fedel AI extracts subtitles, classifies vocabulary by difficulty, and generates quizzes and examples.",
      features: [
        "Subtitle upload and parsing",
        "Vocabulary categorization using AI",
        "Quiz generator with scoring",
        "Clean, mobile-first UI",
      ],
      role: "Sole Developer (AI prompt, parser, quiz engine)",
      lessons: [
        "Developed a pipeline for SRT file processing",
        "Integrated OpenAI for categorization",
        "Built dynamic quiz logic from text data",
      ]
    }
  },
  {
    id: '8',
    title: "Instagram Clone",
    description: "A clone of Instagram built using React and Firebase for real-time data and authentication.",
    technologies: ["React", "Firebase", "JavaScript", "CSS"],
    image: "/instagram.png",
    github: "https://github.com/lantumo0001/instagram-clone-app",
    live: "https://snap-share-app.vercel.app/",
    featured: false,
    status: "100% Finished",
    caseStudy: {
      problem: "To learn real-time data handling, authentication, and UI interactions using modern stacks.",
      solution: "A pixel-perfect Instagram clone with real-time post updates, like, and comment features.",
      features: [
        "Firebase Auth & Firestore real-time DB",
        "Photo upload and post creation",
        "Like/comment with instant update",
        "User profile pages",
      ],
      role: "Frontend Developer (state management, auth, image upload)",
      lessons: [
        "Built a full auth flow with Firebase",
        "Handled image uploads to Firebase Storage",
        "Improved styling techniques using plain CSS",
      ]
    }
  },
  {
    id: '9',
    title: "Amazon Clone",
    description: "E-commerce website replicating core features of Amazon, built for high scalability and performance.",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    image: "/amazon-new.png",
    github: "https://github.com/henokhackz/next-ecommerce",
    live: "https://amazon-clone.vercel.app",
    featured: false,
    status: "100% Finished",
    caseStudy: {
      problem: "Recreating a complex e-commerce workflow to improve system design and frontend performance.",
      solution: "A performant Amazon clone with cart, checkout, and product listing features.",
      features: [
        "Responsive product pages and search bar",
        "Cart, checkout, and dynamic pricing",
        "Optimized image loading with Next.js",
      ],
      role: "Full Stack Developer (routing, UI state, cart logic)",
      lessons: [
        "Learned modular layout patterns in Next.js",
        "Practiced cart logic and dynamic pricing display",
        "Used Tailwind to build complex UIs fast",
      ]
    }
  },
  {
    id: '10',
    title: "Wolkite University E-Learning Platform",
    description: "A comprehensive e-learning platform for Wolkite University built with Laravel and Tailwind CSS.",
    technologies: ["Laravel", "Tailwind CSS", "PHP", "MySQL"],
    image: "/e-learning.png",
    github: "https://github.com/henokhackz/wolkite-elearning",
    live: "https://elearning.wolkiteuniversity.edu",
    featured: false,
    status: "100% Finished",
    caseStudy: {
      problem: "Wolkite University needed a modern LMS system to support digital learning and resource sharing.",
      solution: "A Laravel-based platform with course uploads, student dashboards, and secure login.",
      features: [
        "Instructor & student roles",
        "Video and document sharing",
        "Tailwind-powered responsive design",
        "MySQL for course management",
      ],
      role: "Backend and Frontend Developer",
      lessons: [
        "Built user-based access control with Laravel",
        "Designed a responsive UI using Tailwind",
        "Improved MySQL and PHP development skills",
      ]
    }
  },
  {
    id: '11',
    title: "Form Genie AI",
    description: "Helps users create forms with AI-powered form generation and data validation.",
    technologies: ["Next.js", "Tailwind CSS", "javascript", "Prisma"],
    image: "/form-genie.png",
    github: "https://github.com/henokhackz/form_genie",
    live: "https://form-genie-nu.vercel.app/",
    featured: true,
    status: "100% Finished",
    caseStudy: {
      problem: "Form Genie AI helps users create forms with AI-powered form generation and data validation.",
      solution: "A platform for creating and sharing AI generated form content.",
      features: [
        "AI-driven form and module generation",
        "User-friendly dashboard for managing form content",
        "Tailwind-powered responsive design",
        "Prisma for form management",
      ],
      role: "Backend and Frontend Developer",
      lessons: [
        "Built user-based access control with Next.js",
        "Designed a responsive UI using Tailwind",
        "Improved Prisma and javascript development skills",
      ]
    }
  },
];


export {allProjects}