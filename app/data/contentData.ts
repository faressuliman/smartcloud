import { 
    Home, 
    Info, 
    Wrench, 
    FolderKanban, 
    Target, 
    Eye, 
    Heart, 
    Building2, 
    Sun, 
    Settings, 
    Hotel, 
    Speaker, 
    Brain,
    Users,
    Clock12,
    Headset,
    MonitorDown,
    ClipboardMinus,
    Cpu,
    ShieldCheck,
    Handshake
} from "lucide-react";

import {
    Moon,
    Video,
    Clapperboard,
} from "lucide-react";

export const navItems = [
    { name: "Home", icon: Home },
    { name: "About", icon: Info },
    { name: "Services", icon: Wrench },
    { name: "Portfolio", icon: FolderKanban },
];

export const whySmartCloudData = [
    {
        title: "Successful Projects",
        count: "30+",
        icon: Target,
    },
    {
        title: "Satisfied Clients",
        count: "100+",
        icon: Heart,
    },
    {
        title: "Expert Consultants",
        count: "50+",
        icon: Users,
    },
];

export const sliderConfig = {
    partnersAutoPlayInterval: 3000,
    certificationsAutoPlayInterval: 5000,
    homeCardsAutoPlayInterval: 5000,
    whySmartCloudAutoPlayInterval: 3500,
    partnersPerSlide: 7,
    certificationsPerSlide: 5,
};

export const partnerLogos = [
    { id: 1, src: "/partners/1.png" },
    { id: 2, src: "/partners/222.png" },
    { id: 3, src: "/partners/3.png" },
    { id: 4, src: "/partners/4.png" },
    { id: 5, src: "/partners/5.png" },
    { id: 6, src: "/partners/6.png" },
    { id: 7, src: "/partners/7.png" },
    { id: 8, src: "/partners/8.png" },
    { id: 9, src: "/partners/99.png" },
    { id: 10, src: "/partners/10.png" },
    { id: 11, src: "/partners/111.png" },
    { id: 12, src: "/partners/12.png" },
    { id: 13, src: "/partners/13.png" },
    { id: 14, src: "/partners/14.png" },
    { id: 15, src: "/partners/15.png" },
    { id: 16, src: "/partners/16.png" },
    { id: 17, src: "/partners/17.jpg" },
    { id: 18, src: "/partners/18.png" },
    { id: 19, src: "/partners/199.png" },
    { id: 20, src: "/partners/20.png" },
    { id: 21, src: "/partners/211.png" },
    { id: 22, src: "/partners/22.png" },
    { id: 23, src: "/partners/23.png" },
    { id: 24, src: "/partners/24.png" },
    { id: 25, src: "/partners/25.png" },
    { id: 26, src: "/partners/266.png" },
    { id: 27, src: "/partners/27.png" },
    { id: 28, src: "/partners/288.png" },
    { id: 29, src: "/partners/29.png" },
    { id: 30, src: "/partners/30.png" },
    { id: 31, src: "/partners/31.png" },
    { id: 32, src: "/partners/32.png" },
    { id: 33, src: "/partners/33.png" },
    { id: 34, src: "/partners/34.png" },
];

export const certificationLogos = [
    { id: 1, src: "/certifications/1.jpg" },
    { id: 2, src: "/certifications/2.png" },
    { id: 3, src: "/certifications/3.jpg" },
    { id: 4, src: "/certifications/4.jpg" },
    { id: 5, src: "/certifications/5.jpg" },
    { id: 6, src: "/certifications/7.jpg" },
    { id: 7, src: "/certifications/88.png" },
];

export const homeFeatures = [
    {
        icon: Cpu,
        alt: "Integration Between Systems",
        title: "Integration Between Systems",
        desc: "The possibility of linking all the techniques and presented to the client as an integrated system and one controller screen!"
    },
    {
        icon: Handshake,
        alt: "After-Sales Services",
        title: "After-Sales Services",
        desc: "Comprehensive support and maintenance services to ensure your systems continue operating at peak performance long after installation."
    },
    {
        icon: Headset,
        alt: "Understand Client Needs",
        title: "Understand The Client's Needs",
        desc: "We take time to understand your unique requirements, delivering customized solutions that perfectly fit your business needs."
    },
    {
        icon: Clock12,
        alt: "Deliver On Time",
        title: "Deliver On Time",
        desc: "We respect your timeline. Our team is committed to delivering projects on schedule without compromising on quality or safety standards."
    },
    {
        icon: MonitorDown,
        alt: "Professional Installation",
        title: "Professional Installation",
        desc: "Our certified technicians ensure every system is installed with precision and care, following international safety and quality protocols."
    },
    {
        icon: ClipboardMinus,
        alt: "Documentation",
        title: "Documentation",
        desc: "We provide complete documentation for all installed systems, including user manuals, technical drawings, and maintenance guides for your reference."
    }
];

export const aboutContent = {
    mission: "Your happiness is our success. We create innovative, intelligent solutions to satisfy customers and spread this culture across the region.",
    vision: "To leverage cutting-edge technologies with competitive pricing and exceptional support, becoming a milestone in smart services across the region.",
    values: "Customers come first. We commit to finding the best solutions, taking projects seriously, and providing immediate post-project support as standard."
};

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: any;
    overview: string;
    features: string[];
    image: string;
}

export const services: Service[] = [
    {
        id: "smart-mosques",
        title: "Smart Mosque Services",
        description: "Intelligent mosque automation systems for enhanced worship experiences",
        icon: Building2,
        overview: "Smart mosque systems that integrate lighting, audio, climate control, and energy management to create the perfect environment for worship.",
        features: [
            "Control: Smart lighting and climate control systems",
            "Communication: Seamless audio distribution for prayers",
            "Power Saving: Energy-efficient solutions",
            "Comfort: Automated environment management"
        ],
        image: "/services/mosque.jpg"
    },
    {
        id: "energy-solar",
        title: "Energy Saving & Solar Solutions",
        description: "Sustainable energy solutions and solar power integration",
        icon: Sun,
        overview: "Comprehensive energy management systems including solar power, smart monitoring, and optimization solutions to reduce operational costs.",
        features: [
            "Solar panel installation and integration",
            "Energy monitoring and analytics",
            "Smart power distribution systems",
            "Cost optimization strategies"
        ],
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80"
    },
    {
        id: "engineering-consulting",
        title: "Engineering Consulting & Smart Systems Design",
        description: "Expert engineering consultation and custom smart system architecture",
        icon: Settings,
        overview: "Professional engineering services including system design, technical drawings, implementation supervision, and ongoing support.",
        features: [
            "Smart system architecture design",
            "Technical blueprints and schematics",
            "Implementation supervision",
            "Optimal product selection and integration"
        ],
        image: "/services/consult-engineer.jpg"
    },
    {
        id: "hotels-hospitals",
        title: "Solutions for Hotels & Hospitals",
        description: "Specialized automation systems for hospitality and healthcare facilities",
        icon: Hotel,
        overview: "Tailored smart solutions for hotels and hospitals, ensuring guest comfort, operational efficiency, and seamless facility management.",
        features: [
            "Guest room automation",
            "Centralized facility control",
            "Energy management for large facilities",
            "Staff communication systems"
        ],
        image: "/services/hotel.jpg"
    },
    {
        id: "audio-visual",
        title: "Audio & Visual Systems",
        description: "Professional AV solutions for presentations, entertainment, and communication",
        icon: Speaker,
        overview: "Complete audio and visual system solutions including home cinema, conference rooms, and professional audio distribution.",
        features: [
            "Home cinema and entertainment systems",
            "Conference room AV setup",
            "Professional audio distribution",
            "Video wall and display solutions"
        ],
        image: "/services/meetingroom.jpg"
    },
    {
        id: "smart-buildings-iot",
        title: "Smart Buildings, IoT & AI",
        description: "Advanced building automation with IoT sensors and AI intelligence",
        icon: Brain,
        overview: "Cutting-edge smart building solutions integrating IoT devices, AI algorithms, and automated systems for optimal building performance.",
        features: [
            "IoT sensor networks",
            "AI-powered automation",
            "Predictive maintenance",
            "Integrated building management"
        ],
        image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200&q=80"
    }
];

export const portfolio = [
    {
        id: "mamur-mosque",
        title: "Mamur Mosque",
        description: "Smart mosque automation system",
        icon: Moon,
        overview: "Comprehensive smart building system with integrated door control, lighting automation, air conditioning, and surveillance. All systems synchronized with prayer times for seamless facility management.",
        highlights: [
            "Door, entry, and exit control",
            "Lighting system control with motion sensors",
            "WIDE system integration",
            "Air conditioning with climate optimization",
            "Solar energy implementation",
            "Curtains control",
            "Surveillance and protection camera system"
        ],
        image: "/portfolio/mamur.webp"
    },
    {
        id: "awab-holdings",
        title: "Awab Holdings Company",
        description: "Building-wide intelligent automation",
        icon: Building2,
        overview: "Integrated building management system covering lighting and climate control across the entire facility with innovative energy-saving scenarios.",
        highlights: [
            "Lighting control system for entire building",
            "Air conditioner control with energy optimization",
            "Curtain control system",
            "Surveillance camera system",
            "Entry and exit control",
            "Integrated conference room and video chat system",
            "Data and information network infrastructure"
        ],
        image: "/portfolio/awab.jpg"
    },
    {
        id: "nomd-holding",
        title: "NOMD Holding",
        description: "Advanced facility management solution",
        icon: Building2,
        overview: "State-of-the-art building automation providing intelligent lighting and climate control with energy-efficient scenarios for optimal operational efficiency.",
        highlights: [
            "Lighting control system for entire building",
            "Air conditioner control with energy optimization",
            "Curtain control system",
            "Surveillance camera system",
            "Entry and exit control",
            "Integrated conference room and video chat system",
            "Data and information network infrastructure"
        ],
        image: "/portfolio/nomd.jpg"
    },
    {
        id: "conference-room",
        title: "Meeting and Conference Room for Abdullah M. Bin Saedan Real Estate Co.",
        description: "Advanced conference facility automation",
        icon: Video,
        overview: "Professional conference room solution with integrated audio-visual systems and smart controls for seamless presentations and video conferencing.",
        highlights: [
            "Lighting control system",
            "Integrated conference room and video chat system",
            "Data and information network",
            "Curtain control system",
            "Network transfer system for multi-display support"
        ],
        image: "/portfolio/meeting.jpg"
    },
    {
        id: "outer-theatre",
        title: "The Outer Theatre of Prince Sultan Bin Abdulaziz University",
        description: "Theatre automation and media systems",
        icon: Clapperboard,
        overview: "Complete theatre automation system featuring integrated lighting, acoustics control, and external display systems for professional audio-visual presentations.",
        highlights: [
            "Lighting and acoustics control",
            "Integrated external audio system",
            "External display (7m*4m size)",
            "Network transfer system for multi-display support"
        ],
        image: "/portfolio/outertheatre.jpg"
    },
    {
        id: "sulai-valley",
        title: "Sulai Valley Monitoring",
        description: "Remote monitoring and surveillance solution",
        icon: ShieldCheck,
        overview: "Solar-powered remote monitoring system with wireless data transmission capability covering 20km range with complete entry and exit control.",
        highlights: [
            "Solar power feeds cameras and data transmissions",
            "Wireless transfer information 20 km away with remote control",
            "Surveillance cameras",
            "Control of entry and exit of the control unit"
        ],
        image: "/portfolio/sulaivalley.webp"
    },
    {
        id: "princess-modhi",
        title: "Princess Modhi Al Angari Grand Masjid",
        description: "Grand mosque smart automation",
        icon: Moon,
        overview: "Prestigious mosque automation system with prayer time synchronization. All systems including doors, lighting, climate control, and surveillance work in harmony with Islamic prayer schedules for enhanced worship experience.",
        highlights: [
            "Door, entry, and exit control",
            "Lighting system control",
            "WIDE system integration",
            "Air conditioning control",
            "Curtains control",
            "Surveillance and protection camera system",
            "Prayer time synchronized automation"
        ],
        image: "/portfolio/princessmodhi.webp"
    }
];
