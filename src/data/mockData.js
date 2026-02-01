// Mock student data for demo - realistic profiles with real projects

export const students = [
  {
    id: 1,
    name: "Yuki Tanaka",
    email: "yuki.tanaka@example.com",
    location: "Tokyo",
    githubUrl: "https://github.com/yukitanaka",
    bio: "Full-stack developer passionate about Rust and WebAssembly. Building high-performance web applications.",
    availability: "available",
    techStack: ["Rust", "React", "WebAssembly", "Docker"],
    projects: [
      {
        id: 101,
        title: "Real-time Chat Engine",
        description: "Built a WebSocket-based chat system with Rust backend handling 10k+ concurrent connections. React frontend with real-time message sync.",
        techStack: ["Rust", "WebAssembly", "React", "WebSocket"],
        impact: "Handles 10,000+ concurrent users with <50ms latency",
        githubUrl: "https://github.com/yukitanaka/chat-engine"
      },
      {
        id: 102,
        title: "WASM Image Processor",
        description: "Image manipulation library compiled to WebAssembly for browser-based editing. 10x faster than pure JavaScript.",
        techStack: ["Rust", "WebAssembly", "TypeScript"],
        impact: "Used by 5k+ developers, 50k+ npm downloads",
        githubUrl: "https://github.com/yukitanaka/wasm-image"
      }
    ]
  },
  {
    id: 2,
    name: "Sakura Yamamoto",
    email: "sakura.y@example.com",
    location: "Osaka",
    githubUrl: "https://github.com/sakuray",
    bio: "ML engineer focused on computer vision and edge AI. Bootcamp grad with strong Python and TensorFlow skills.",
    availability: "available",
    techStack: ["Python", "TensorFlow", "ML", "Docker"],
    projects: [
      {
        id: 201,
        title: "Real-time Object Detection",
        description: "Built a mobile-optimized object detection model using TensorFlow Lite. Runs on-device with 30fps performance.",
        techStack: ["Python", "TensorFlow", "ML", "Kotlin"],
        impact: "Deployed in 3 production apps, 95% accuracy",
        githubUrl: "https://github.com/sakuray/object-detect"
      },
      {
        id: 202,
        title: "Dataset Augmentation Tool",
        description: "Automated image augmentation pipeline for training data generation. Reduced manual labeling time by 70%.",
        techStack: ["Python", "ML", "Docker"],
        impact: "Open-sourced, 2k+ GitHub stars",
        githubUrl: "https://github.com/sakuray/augment-tool"
      }
    ]
  },
  {
    id: 3,
    name: "Kenji Sato",
    email: "kenji.sato@example.com",
    location: "Tokyo",
    githubUrl: "https://github.com/kenjisato",
    bio: "Infrastructure engineer specializing in Kubernetes and cloud-native architectures. Ex-intern at tech startup.",
    availability: "open",
    techStack: ["Kubernetes", "Go", "AWS", "Docker"],
    projects: [
      {
        id: 301,
        title: "K8s Auto-Scaler",
        description: "Custom Kubernetes operator for intelligent auto-scaling based on business metrics, not just CPU/memory.",
        techStack: ["Go", "Kubernetes", "AWS"],
        impact: "Reduced cloud costs by 40% for 3 companies",
        githubUrl: "https://github.com/kenjisato/k8s-scaler"
      },
      {
        id: 302,
        title: "Multi-Cloud Deployment Tool",
        description: "CLI tool for deploying applications across AWS, GCP, and Azure with unified configuration.",
        techStack: ["Go", "AWS", "GCP", "Docker"],
        impact: "Used internally by 50+ engineers",
        githubUrl: "https://github.com/kenjisato/multi-deploy"
      }
    ]
  },
  {
    id: 4,
    name: "Aiko Nakamura",
    email: "aiko.n@example.com",
    location: "Kyoto",
    githubUrl: "https://github.com/aikonakamura",
    bio: "Frontend specialist with a design background. Love building beautiful, accessible React applications.",
    availability: "available",
    techStack: ["React", "TypeScript", "Node", "GraphQL"],
    projects: [
      {
        id: 401,
        title: "Component Library",
        description: "Built a fully accessible React component library with TypeScript. Follows WCAG 2.1 AA standards.",
        techStack: ["React", "TypeScript", "Storybook"],
        impact: "Adopted by 10+ projects, 100% accessibility score",
        githubUrl: "https://github.com/aikonakamura/ui-lib"
      },
      {
        id: 402,
        title: "GraphQL Client Generator",
        description: "Code generation tool that creates type-safe React hooks from GraphQL schemas automatically.",
        techStack: ["TypeScript", "GraphQL", "Node"],
        impact: "Reduced boilerplate code by 60%",
        githubUrl: "https://github.com/aikonakamura/gql-gen"
      }
    ]
  },
  {
    id: 5,
    name: "Hiroshi Takahashi",
    email: "hiroshi.t@example.com",
    location: "Tokyo",
    githubUrl: "https://github.com/hiroshit",
    bio: "Blockchain developer building DeFi protocols. Strong Rust and Solidity background.",
    availability: "not-looking",
    techStack: ["Rust", "Blockchain", "Solidity", "Node"],
    projects: [
      {
        id: 501,
        title: "DeFi Lending Protocol",
        description: "Smart contract system for decentralized lending with automated liquidation. Audited and deployed on mainnet.",
        techStack: ["Solidity", "Rust", "Blockchain"],
        impact: "$2M+ total value locked, zero security incidents",
        githubUrl: "https://github.com/hiroshit/defi-lend"
      }
    ]
  },
  {
    id: 6,
    name: "Mei Chen",
    email: "mei.chen@example.com",
    location: "Tokyo",
    githubUrl: "https://github.com/meichen",
    bio: "International student from Taiwan. Full-stack developer with strong React and Python skills.",
    availability: "available",
    techStack: ["React", "Python", "PostgreSQL", "AWS"],
    projects: [
      {
        id: 601,
        title: "E-commerce Platform",
        description: "Built a full-stack e-commerce site with React frontend and Python/FastAPI backend. Stripe integration for payments.",
        techStack: ["React", "Python", "PostgreSQL", "AWS"],
        impact: "Processed 1000+ orders, $50k+ in sales",
        githubUrl: "https://github.com/meichen/ecommerce"
      },
      {
        id: 602,
        title: "Inventory Management System",
        description: "Real-time inventory tracking with barcode scanning and automated reordering.",
        techStack: ["React", "Python", "PostgreSQL"],
        impact: "Reduced stockouts by 80%",
        githubUrl: "https://github.com/meichen/inventory"
      }
    ]
  },
  {
    id: 7,
    name: "Ryo Suzuki",
    email: "ryo.suzuki@example.com",
    location: "Fukuoka",
    githubUrl: "https://github.com/ryosuzuki",
    bio: "Mobile developer specializing in Flutter. Building cross-platform apps for startups.",
    availability: "open",
    techStack: ["Flutter", "Dart", "Firebase", "Node"],
    projects: [
      {
        id: 701,
        title: "Fitness Tracking App",
        description: "Cross-platform fitness app with workout tracking, social features, and AI-powered recommendations.",
        techStack: ["Flutter", "Firebase", "ML"],
        impact: "10k+ downloads, 4.5★ rating on app stores",
        githubUrl: "https://github.com/ryosuzuki/fitness-app"
      }
    ]
  },
  {
    id: 8,
    name: "Emi Watanabe",
    email: "emi.w@example.com",
    location: "Tokyo",
    githubUrl: "https://github.com/emiwatanabe",
    bio: "Backend engineer passionate about distributed systems and microservices. Go enthusiast.",
    availability: "available",
    techStack: ["Go", "Kubernetes", "PostgreSQL", "Redis"],
    projects: [
      {
        id: 801,
        title: "Microservices Framework",
        description: "Built a lightweight microservices framework in Go with built-in service discovery and load balancing.",
        techStack: ["Go", "Kubernetes", "Redis"],
        impact: "Used by 5 production services, 99.9% uptime",
        githubUrl: "https://github.com/emiwatanabe/micro-go"
      },
      {
        id: 802,
        title: "Distributed Cache System",
        description: "Redis-based distributed caching layer with automatic invalidation and replication.",
        techStack: ["Go", "Redis", "Docker"],
        impact: "Reduced database load by 70%",
        githubUrl: "https://github.com/emiwatanabe/dist-cache"
      }
    ]
  },
  {
    id: 9,
    name: "Takeshi Ito",
    email: "takeshi.ito@example.com",
    location: "Sapporo",
    githubUrl: "https://github.com/takeshiito",
    bio: "Data engineer building ETL pipelines and data warehouses. Python and SQL expert.",
    availability: "available",
    techStack: ["Python", "PostgreSQL", "AWS", "Docker"],
    projects: [
      {
        id: 901,
        title: "Real-time Analytics Pipeline",
        description: "Built a streaming data pipeline processing 1M+ events per day with Apache Kafka and Python.",
        techStack: ["Python", "Kafka", "PostgreSQL", "AWS"],
        impact: "Reduced data latency from hours to seconds",
        githubUrl: "https://github.com/takeshiito/analytics-pipeline"
      }
    ]
  },
  {
    id: 10,
    name: "Yui Kobayashi",
    email: "yui.k@example.com",
    location: "Tokyo",
    githubUrl: "https://github.com/yuikobayashi",
    bio: "Full-stack developer with a focus on developer tools. Building CLI tools and VS Code extensions.",
    availability: "open",
    techStack: ["TypeScript", "Node", "React", "Rust"],
    projects: [
      {
        id: 1001,
        title: "VS Code Extension",
        description: "Built a VS Code extension for automated code refactoring with 50k+ installs.",
        techStack: ["TypeScript", "Node"],
        impact: "50,000+ active users, 4.8★ rating",
        githubUrl: "https://github.com/yuikobayashi/vscode-refactor"
      },
      {
        id: 1002,
        title: "CLI Build Tool",
        description: "Fast build tool written in Rust, 10x faster than Webpack for large projects.",
        techStack: ["Rust", "Node", "TypeScript"],
        impact: "Reduced build time from 5min to 30sec",
        githubUrl: "https://github.com/yuikobayashi/fast-build"
      }
    ]
  },
  {
    id: 11,
    name: "Daiki Yamada",
    email: "daiki.y@example.com",
    location: "Nagoya",
    githubUrl: "https://github.com/daikiyamada",
    bio: "iOS developer building native Swift apps. Strong UI/UX design sense.",
    availability: "available",
    techStack: ["Swift", "iOS", "Firebase", "GraphQL"],
    projects: [
      {
        id: 1101,
        title: "Social Networking App",
        description: "Built a location-based social app with real-time messaging and photo sharing.",
        techStack: ["Swift", "Firebase", "GraphQL"],
        impact: "5k+ users, featured on App Store",
        githubUrl: "https://github.com/daikiyamada/social-app"
      }
    ]
  },
  {
    id: 12,
    name: "Hana Fujimoto",
    email: "hana.f@example.com",
    location: "Tokyo",
    githubUrl: "https://github.com/hanafujimoto",
    bio: "DevOps engineer automating everything. Terraform and CI/CD specialist.",
    availability: "available",
    techStack: ["AWS", "Terraform", "Docker", "Python"],
    projects: [
      {
        id: 1201,
        title: "Infrastructure as Code",
        description: "Built reusable Terraform modules for AWS infrastructure with automated testing.",
        techStack: ["Terraform", "AWS", "Docker"],
        impact: "Reduced deployment time by 80%",
        githubUrl: "https://github.com/hanafujimoto/terraform-modules"
      }
    ]
  },
  {
    id: 13,
    name: "Sora Kim",
    email: "sora.kim@example.com",
    location: "Tokyo",
    githubUrl: "https://github.com/sorakim",
    bio: "International student from Korea. Game developer using Unity and C#.",
    availability: "open",
    techStack: ["Unity", "CSharp", "WebGL", "Node"],
    projects: [
      {
        id: 1301,
        title: "Multiplayer Puzzle Game",
        description: "Built a real-time multiplayer puzzle game with Unity and WebGL. Custom networking layer.",
        techStack: ["Unity", "CSharp", "WebGL", "Node"],
        impact: "100k+ plays, 4.6★ rating",
        githubUrl: "https://github.com/sorakim/puzzle-game"
      }
    ]
  },
  {
    id: 14,
    name: "Kaito Matsumoto",
    email: "kaito.m@example.com",
    location: "Osaka",
    githubUrl: "https://github.com/kaitomatsumoto",
    bio: "Backend engineer building APIs and microservices. Node.js and GraphQL expert.",
    availability: "available",
    techStack: ["Node", "GraphQL", "PostgreSQL", "Docker"],
    projects: [
      {
        id: 1401,
        title: "GraphQL API Gateway",
        description: "Built a unified GraphQL gateway aggregating 10+ microservices with caching and rate limiting.",
        techStack: ["Node", "GraphQL", "Redis", "Docker"],
        impact: "Reduced API response time by 60%",
        githubUrl: "https://github.com/kaitomatsumoto/gql-gateway"
      }
    ]
  },
  {
    id: 15,
    name: "Rina Tanaka",
    email: "rina.t@example.com",
    location: "Tokyo",
    githubUrl: "https://github.com/rinatanaka",
    bio: "Frontend developer specializing in animations and interactive experiences. Three.js enthusiast.",
    availability: "available",
    techStack: ["React", "TypeScript", "ThreeJS", "WebGL"],
    projects: [
      {
        id: 1501,
        title: "3D Product Visualizer",
        description: "Built an interactive 3D product viewer using Three.js with realistic lighting and materials.",
        techStack: ["React", "ThreeJS", "WebGL", "TypeScript"],
        impact: "Increased conversion rate by 35%",
        githubUrl: "https://github.com/rinatanaka/3d-viewer"
      }
    ]
  },
  {
    id: 16,
    name: "Shun Nakano",
    email: "shun.n@example.com",
    location: "Fukuoka",
    githubUrl: "https://github.com/shunnakano",
    bio: "Security engineer focused on web application security. Penetration testing and secure coding.",
    availability: "not-looking",
    techStack: ["Python", "Go", "Docker", "AWS"],
    projects: [
      {
        id: 1601,
        title: "Security Scanner",
        description: "Built an automated security scanner for web applications detecting OWASP Top 10 vulnerabilities.",
        techStack: ["Python", "Go", "Docker"],
        impact: "Found 200+ vulnerabilities across 50+ apps",
        githubUrl: "https://github.com/shunnakano/sec-scanner"
      }
    ]
  },
  {
    id: 17,
    name: "Mio Hayashi",
    email: "mio.h@example.com",
    location: "Tokyo",
    githubUrl: "https://github.com/miohayashi",
    bio: "Full-stack developer building SaaS products. Vue.js and Ruby on Rails background.",
    availability: "available",
    techStack: ["Vue", "Ruby", "PostgreSQL", "AWS"],
    projects: [
      {
        id: 1701,
        title: "Project Management SaaS",
        description: "Built a project management tool with real-time collaboration and Gantt charts.",
        techStack: ["Vue", "Ruby", "PostgreSQL", "Redis"],
        impact: "50+ paying customers, $10k MRR",
        githubUrl: "https://github.com/miohayashi/pm-saas"
      }
    ]
  },
  {
    id: 18,
    name: "Haruto Ishikawa",
    email: "haruto.i@example.com",
    location: "Tokyo",
    githubUrl: "https://github.com/harutoishikawa",
    bio: "Android developer building native Kotlin apps. Material Design expert.",
    availability: "open",
    techStack: ["Kotlin", "Android", "Firebase", "GraphQL"],
    projects: [
      {
        id: 1801,
        title: "News Aggregator App",
        description: "Built a personalized news app with ML-powered recommendations and offline reading.",
        techStack: ["Kotlin", "Android", "ML", "Firebase"],
        impact: "20k+ downloads, 4.4★ rating",
        githubUrl: "https://github.com/harutoishikawa/news-app"
      }
    ]
  },
  {
    id: 19,
    name: "Nana Yoshida",
    email: "nana.y@example.com",
    location: "Kyoto",
    githubUrl: "https://github.com/nanayoshida",
    bio: "Data scientist building predictive models. Python and machine learning specialist.",
    availability: "available",
    techStack: ["Python", "ML", "TensorFlow", "PostgreSQL"],
    projects: [
      {
        id: 1901,
        title: "Churn Prediction Model",
        description: "Built a machine learning model predicting customer churn with 92% accuracy.",
        techStack: ["Python", "ML", "TensorFlow"],
        impact: "Reduced churn by 25%, saved $500k annually",
        githubUrl: "https://github.com/nanayoshida/churn-model"
      }
    ]
  },
  {
    id: 20,
    name: "Kenta Mori",
    email: "kenta.m@example.com",
    location: "Tokyo",
    githubUrl: "https://github.com/kentamori",
    bio: "Full-stack developer with startup experience. Building MVPs fast with modern tech stack.",
    availability: "available",
    techStack: ["React", "Node", "MongoDB", "AWS"],
    projects: [
      {
        id: 2001,
        title: "Marketplace Platform",
        description: "Built a two-sided marketplace with payments, reviews, and real-time chat in 6 weeks.",
        techStack: ["React", "Node", "MongoDB", "Stripe"],
        impact: "Launched to 1000+ users, $20k GMV in first month",
        githubUrl: "https://github.com/kentamori/marketplace"
      },
      {
        id: 2002,
        title: "Booking System",
        description: "Calendar-based booking system with automated reminders and payment processing.",
        techStack: ["React", "Node", "PostgreSQL", "AWS"],
        impact: "Handles 500+ bookings per month",
        githubUrl: "https://github.com/kentamori/booking"
      }
    ]
  }
];

export const getStudentById = (id) => {
  return students.find(s => s.id === parseInt(id));
};

export const filterStudents = (filters) => {
  return students.filter(student => {
    // Filter by tech stack
    if (filters.techStack && filters.techStack.length > 0) {
      const hasMatchingTech = student.techStack.some(tech => 
        filters.techStack.includes(tech)
      );
      if (!hasMatchingTech) return false;
    }

    // Filter by availability
    if (filters.availability && filters.availability.length > 0) {
      if (!filters.availability.includes(student.availability)) return false;
    }

    return true;
  });
};
