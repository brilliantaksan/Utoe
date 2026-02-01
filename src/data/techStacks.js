// Tech stack definitions with color coding for visual clustering

export const techStackColors = {
  // Frontend
  React: "#61DAFB",
  Vue: "#42B883",
  Angular: "#DD0031",
  Svelte: "#FF3E00",
  
  // Backend
  Node: "#339933",
  Python: "#3776AB",
  Go: "#00ADD8",
  Rust: "#CE422B",
  Java: "#007396",
  Ruby: "#CC342D",
  
  // Mobile
  ReactNative: "#61DAFB",
  Flutter: "#02569B",
  Swift: "#FA7343",
  Kotlin: "#7F52FF",
  
  // Data/ML
  ML: "#FF6F00",
  AI: "#FF6F00",
  TensorFlow: "#FF6F00",
  PyTorch: "#EE4C2C",
  
  // Infrastructure
  Docker: "#2496ED",
  Kubernetes: "#326CE5",
  AWS: "#FF9900",
  GCP: "#4285F4",
  
  // Database
  PostgreSQL: "#336791",
  MongoDB: "#47A248",
  Redis: "#DC382D",
  
  // Other
  WebAssembly: "#654FF0",
  Blockchain: "#F0B90B",
  GraphQL: "#E10098",
  TypeScript: "#3178C6",
  WebGL: "#990000"
};

export const techStackCategories = {
  frontend: ["React", "Vue", "Angular", "Svelte", "TypeScript"],
  backend: ["Node", "Python", "Go", "Rust", "Java", "Ruby"],
  mobile: ["ReactNative", "Flutter", "Swift", "Kotlin"],
  data: ["ML", "AI", "TensorFlow", "PyTorch"],
  infra: ["Docker", "Kubernetes", "AWS", "GCP"],
  database: ["PostgreSQL", "MongoDB", "Redis"],
  other: ["WebAssembly", "Blockchain", "GraphQL", "WebGL"]
};

export const allTechStacks = Object.keys(techStackColors);

export const getTechColor = (tech) => {
  return techStackColors[tech] || "#6B7280"; // Default gray
};

export const getTechCategory = (tech) => {
  for (const [category, techs] of Object.entries(techStackCategories)) {
    if (techs.includes(tech)) return category;
  }
  return "other";
};
