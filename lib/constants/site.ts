export const siteConfig = {
  name: "VETCOM Communication",
  tagline: "Connecting People. Powering Possibilities.",
  description:
    "Ghanaian-owned telecommunications, ICT, and engineering solutions company delivering innovative, reliable communication infrastructure and technology services.",
  url: "https://www.vetcomcommunication.com",
  email: "info@vetcomcommunication.com",
  address: {
    street: "Opposite EP Church, Ogbojo, East Legon",
    city: "Accra",
    country: "Ghana",
    digitalAddress: "GA-061-8775",
  },
  phones: {
    office: "+233 30 295 5581",
    mobile: ["+233 24 649 4049", "+233 20 170 5444"],
  },
  social: {
    facebook: "https://facebook.com/vetcomcommunication",
    linkedin: "https://linkedin.com/company/vetcomcommunication",
    instagram: "https://instagram.com/vetcomcommunication",
    twitter: "https://twitter.com/vetcomcommunication",
  },
} as const;

export const about = {
  intro:
    "VETCOM Communication is a Ghanaian-owned telecommunications, ICT, and engineering solutions company delivering innovative, reliable infrastructure that keeps businesses, institutions, and communities connected.",
  paragraphs: [
    "VETCOM Communication is a Ghanaian-owned telecommunications, ICT, and engineering solutions company dedicated to delivering innovative, reliable, and cost-effective communication infrastructure and technology services. We provide comprehensive solutions that enable businesses, institutions, and communities to stay connected, secure, and technologically advanced.",
    "Our team combines technical expertise with industry best practices to design, install, maintain, and support communication systems that meet international standards. We are committed to excellence, professionalism, integrity, and customer satisfaction in every project we undertake.",
    "As technology continues to evolve, VETCOM Communication remains focused on providing cutting-edge solutions that enhance operational efficiency, improve connectivity, and drive sustainable growth for our clients.",
  ],
  vision:
    "To become Ghana's leading telecommunications and ICT solutions provider, recognized for innovation, quality, and customer satisfaction across Africa.",
  mission:
    "To deliver world-class telecommunications, ICT, and engineering solutions through innovation, professionalism, integrity, and excellent customer service while building lasting partnerships with our clients.",
  commitment:
    "At VETCOM Communication, we believe that communication is the foundation of growth. We are committed to delivering dependable telecommunications and ICT solutions that empower businesses, strengthen institutions, and connect communities. Our goal is to build lasting relationships by consistently providing quality services that exceed client expectations.",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const serviceCategories = [
  {
    id: "telecom-infrastructure",
    title: "Telecommunications Infrastructure",
    items: [
      "Fibre Optic Installation",
      "Structured Cabling Systems",
      "Network Design & Installation",
      "Wireless Network Deployment",
      "Radio & Microwave Installation",
      "Telecom Site Surveys",
      "Tower Equipment Installation",
      "Preventive & Corrective Maintenance",
    ],
  },
  {
    id: "ict-solutions",
    title: "ICT Solutions",
    items: [
      "Computer Networking",
      "CCTV Surveillance Systems",
      "Access Control Systems",
      "Biometric Systems",
      "Wi-Fi Solutions",
      "Server Installation",
      "Data Centre Solutions",
      "Cloud Services",
      "IT Support & Maintenance",
    ],
  },
  {
    id: "nca-regulatory",
    title: "NCA Regulatory Services",
    items: [
      "Telecommunications Licensing Support",
      "NCA Regulatory Compliance Consultancy",
      "Frequency Authorization Assistance",
      "Telecommunications Equipment Type Approval",
      "ISP Registration Support",
      "Technical Documentation Preparation",
      "Communications Regulatory Advisory Services",
    ],
  },
  {
    id: "security-solutions",
    title: "Security Solutions",
    items: [
      "CCTV Installation",
      "Electric Fence Systems",
      "Intruder Alarm Systems",
      "Video Intercom Systems",
      "Smart Home & Office Security",
    ],
  },
  {
    id: "power-solutions",
    title: "Power Solutions",
    items: [
      "Solar Power Systems",
      "Inverter Installation",
      "UPS Installation",
      "Telecom Backup Power Systems",
    ],
  },
  {
    id: "equipment-supply",
    title: "Communication Equipment Supply",
    items: [
      "Routers & Switches",
      "Fibre Optic Accessories",
      "Radio Communication Equipment",
      "Network Accessories",
      "Office ICT Equipment",
      "Telecom Tools & Materials",
    ],
  },
  {
    id: "managed-services",
    title: "Managed Services",
    items: [
      "Network Monitoring",
      "Preventive Maintenance",
      "Technical Support Contracts",
      "Telecom Project Management",
      "Facility Maintenance",
    ],
  },
  {
    id: "consultancy",
    title: "Consultancy Services",
    items: [
      "ICT Consultancy",
      "Telecom Engineering Consultancy",
      "Digital Transformation Solutions",
      "Smart Office Solutions",
      "Technology Procurement & Advisory",
    ],
  },
] as const;

export const industries = [
  "Telecommunication Companies",
  "Government Institutions",
  "Financial Institutions",
  "Educational Institutions",
  "Healthcare Facilities",
  "Construction Companies",
  "Real Estate Developers",
  "Hotels & Hospitality",
  "Oil & Gas Companies",
  "Mining Companies",
  "Manufacturing Industries",
  "NGOs and Development Organizations",
  "Small & Medium Enterprises (SMEs)",
] as const;

export const coreValues = [
  { title: "Integrity", description: "Honest, transparent dealings in every engagement." },
  { title: "Excellence", description: "Quality workmanship that meets international standards." },
  { title: "Innovation", description: "Cutting-edge solutions for evolving technology needs." },
  { title: "Professionalism", description: "Qualified experts delivering reliable service." },
  { title: "Customer Focus", description: "Solutions tailored to exceed client expectations." },
  { title: "Partnership", description: "Building lasting relationships with every client." },
] as const;

export const homeStats = [
  { label: "Core Service Areas", value: "8+" },
  { label: "Industries Served", value: "13" },
  { label: "Client-Focused Values", value: "6" },
] as const;

export const whyChooseUs = [
  "Experienced and qualified professionals",
  "Reliable and timely service delivery",
  "Competitive pricing",
  "Quality workmanship",
  "Customer-focused solutions",
  "Compliance with industry standards",
  "Innovative technologies",
  "Strong after-sales support",
  "Long-term client partnerships",
] as const;
