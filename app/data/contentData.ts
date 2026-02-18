import { 
    Home, 
    Info, 
    Wrench, 
    FolderKanban, 
    Target, 
    Heart, 
    Users,
    Clock12,
    Headset,
    MonitorDown,
    ClipboardMinus,
    Cpu,
    Handshake,
    Building2, 
    Sun, 
    Settings, 
    Hotel, 
    Speaker, 
    Brain,
    Moon,
    Video,
    Clapperboard,
    ShieldCheck
} from "lucide-react";


// Common Data (Language Agnostic)
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

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: any;
    overview: string;
    features: string[];
    image: string;
}


// Content Translations
export const content = {
    en: {
        navItems: [
            { name: "Home", icon: Home, href: "#home" },
            { name: "About", icon: Info, href: "#about" },
            { name: "Services", icon: Wrench, href: "#services" },
            { name: "Portfolio", icon: FolderKanban, href: "#portfolio" },
        ],
        hero: {
            title: "Delivering Intelligent Technology Solutions",
            subtitle: "We empower businesses with expert guidance and turnkey solutions across smart automation, ELV systems, and marine technical supplies. Delivering innovative, sustainable operations tailored to your unique needs.",
            regionalOffices: "Three Regional Offices: Saudi Arabia, UAE and Egypt",
            selectOffice: "Select your regional office to explore location-specific services and connect with our local team.",
            selectorTitle: "Regional Branch Selector",
            selectorSubtitle: "Choose your regional office to continue",
            clickPin: "Click a location pin to explore services",
            countrySelector: "Operating in Saudi Arabia, UAE and Egypt",
            chooseCountry: "Choose your country to continue"
        },
        whySmartCloud: {
            title: "Why Choose Smart Cloud?",
            stats: [
                { title: "Successful Projects", count: "30+", icon: Target },
                { title: "Satisfied Clients", count: "100+", icon: Heart },
                { title: "Expert Consultants", count: "50+", icon: Users },
            ],
            experience: {
                years: "10+",
                yearsText: "Years",
                title: "Of Leading Experience",
                desc: "Delivering excellence in smart automation and integrated systems since our inception."
            }
        },
        services: [
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
        ],
        portfolio: [
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
        ],
        homeFeatures: [
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
        ],
        about: {
            title: "About Us",
            subtitle: "Who We Are",
            content: {
                mission: { title: "Our Mission", text: "Your happiness is our success. We create innovative, intelligent solutions to satisfy customers and spread this culture across the region." },
                vision: { title: "Our Vision", text: "To leverage cutting-edge technologies with competitive pricing and exceptional support, becoming a milestone in smart services across the region." },
                values: { title: "Our Values", text: "Customers come first. We commit to finding the best solutions, taking projects seriously, and providing immediate post-project support as standard." }
            }
        },
        contact: {
            title: "Contact Us",
            subtitle: "Get in touch with us",
            name: "Name",
            email: "Email",
            phone: "Phone",
            message: "Message",
            send: "Send Message",
            address: "Riyadh, Saudi Arabia",
            phoneValue: "+966 50 000 0000",
            emailValue: "info@smartcloud.com.sa"
        },
        footer: {
            copyright: "© 2024 Smart Cloud. All rights reserved.",
            links: [
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" }
            ]
        },
        partners: {
            title: "Our Partners",
        },
        certifications: {
            title: "Certifications",
        },
        location: {
            title: "Where You Can Find Us",
            mapPoints: {
                egypt: "Egypt",
                saudi: "Saudi Arabia",
                uae: "UAE"
            }
        },
        common: {
            requestService: "Request Service",
            loading: "Loading..."
        }
    },
    ar: {
        navItems: [
            { name: "الرئيسية", icon: Home, href: "#home" },
            { name: "من نحن", icon: Info, href: "#about" },
            { name: "خدماتنا", icon: Wrench, href: "#services" },
            { name: "أعمالنا", icon: FolderKanban, href: "#portfolio" },
        ],
        hero: {
            title: "تقديم حلول تقنية ذكية",
            subtitle: "نحن نمكن الشركات من خلال التوجيه الخبير والحلول الشاملة عبر الأتمتة الذكية، وأنظمة التيار المنخفض، والتوريدات الفنية البحرية. تقديم عمليات مبتكرة ومستدامة مصممة خصيصًا لاحتياجاتك الفريدة.",
            regionalOffices: "ثلاثة مكاتب إقليمية: المملكة العربية السعودية، الإمارات العربية المتحدة ومصر",
            selectOffice: "اختر مكتبك الإقليمي لاستكشاف الخدمات الخاصة بالموقع والتواصل مع فريقنا المحلي.",
            selectorTitle: "اختيار الفرع الإقليمي",
            selectorSubtitle: "اختر مكتبك الإقليمي للمتابعة",
            clickPin: "انقر فوق دبوس الموقع لاستكشاف الخدمات",
            countrySelector: "نعمل في المملكة العربية السعودية، الإمارات العربية المتحدة ومصر",
            chooseCountry: "اختر دولتك للمتابعة"
        },
        whySmartCloud: {
            title: "لماذا تختار السحابة الذكية؟",
            stats: [
                { title: "مشاريع ناجحة", count: "30+", icon: Target },
                { title: "عملاء راضون", count: "100+", icon: Heart },
                { title: "استشاريون خبراء", count: "50+", icon: Users },
            ],
            experience: {
                years: "+10",
                yearsText: "سنوات",
                title: "من الخبرة الرائدة",
                desc: "تقديم التميز في الأتمتة الذكية والأنظمة المتكاملة منذ بدايتنا."
            }
        },
        services: [
            {
                id: "smart-mosques",
                title: "خدمات المساجد الذكية",
                description: "أنظمة أتمتة المساجد الذكية لتعزيز تجربة العبادة",
                icon: Building2,
                overview: "أنظمة المساجد الذكية التي تدمج الإضاءة والصوت والتحكم في المناخ وإدارة الطاقة لخلق بيئة مثالية للعبادة.",
                features: [
                    "التحكم: أنظمة الإضاءة الذكية والتحكم في المناخ",
                    "التواصل: توزيع صوتي سلس للصلوات",
                    "توفير الطاقة: حلول موفرة للطاقة",
                    "الراحة: إدارة آلية للبيئة"
                ],
                image: "/services/mosque.jpg"
            },
            {
                id: "energy-solar",
                title: "توفير الطاقة والحلول الشمسية",
                description: "حلول الطاقة المستدامة وتكامل الطاقة الشمسية",
                icon: Sun,
                overview: "أنظمة إدارة طاقة شاملة تشمل الطاقة الشمسية والمراقبة الذكية وحلول التحسين لتقليل تكاليف التشغيل.",
                features: [
                    "تركيب وتكامل الألواح الشمسية",
                    "مراقبة الطاقة والتحليلات",
                    "أنظمة توزيع الطاقة الذكية",
                    "استراتيجيات تحسين التكلفة"
                ],
                image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80"
            },
            {
                id: "engineering-consulting",
                title: "الاستشارات الهندسية وتصميم الأنظمة الذكية",
                description: "استشارات هندسية خبيرة وتصميم بنية أنظمة ذكية مخصصة",
                icon: Settings,
                overview: "خدمات هندسية احترافية تشمل تصميم الأنظمة والرسومات الفنية والإشراف على التنفيذ والدعم المستمر.",
                features: [
                    "تصميم بنية الأنظمة الذكية",
                    "المخططات الفنية والرسومات",
                    "الإشراف على التنفيذ",
                    "اختيار المنتج الأمثل والتكامل"
                ],
                image: "/services/consult-engineer.jpg"
            },
            {
                id: "hotels-hospitals",
                title: "حلول للفنادق والمستشفيات",
                description: "أنظمة أتمتة متخصصة لمرافق الضيافة والرعاية الصحية",
                icon: Hotel,
                overview: "حلول ذكية مصممة خصيصًا للفنادق والمستشفيات، لضمان راحة الضيوف والكفاءة التشغيلية وإدارة المرافق بسلاسة.",
                features: [
                    "أتمتة غرف الضيوف",
                    "تحكم مركزي في المرافق",
                    "إدارة الطاقة للمرافق الكبيرة",
                    "أنظمة اتصالات الموظفين"
                ],
                image: "/services/hotel.jpg"
            },
            {
                id: "audio-visual",
                title: "الأنظمة السمعية والبصرية",
                description: "حلول AV احترافية للعروض التقديمية والترفيه والاتصالات",
                icon: Speaker,
                overview: "حلول أنظمة سمعية وبصرية كاملة تشمل السينما المنزلية وغرف المؤتمرات وتوزيع الصوت الاحترافي.",
                features: [
                    "السينما المنزلية وأنظمة الترفيه",
                    "إعداد AV لغرف المؤتمرات",
                    "توزيع صوتي احترافي",
                    "حلول جدران الفيديو وشاشات العرض"
                ],
                image: "/services/meetingroom.jpg"
            },
            {
                id: "smart-buildings-iot",
                title: "المباني الذكية وإنترنت الأشياء والذكاء الاصطناعي",
                description: "أتمتة متقدمة للمباني باستخدام مستشعرات إنترنت الأشياء والذكاء الاصطناعي",
                icon: Brain,
                overview: "حلول مباني ذكية متطورة تدمج أجهزة إنترنت الأشياء وخوارزميات الذكاء الاصطناعي والأنظمة الآلية لتحقيق أداء مثالي للمبنى.",
                features: [
                    "شبكات مستشعرات إنترنت الأشياء",
                    "أتمتة مدعومة بالذكاء الاصطناعي",
                    "الصيانة التنبؤية",
                    "إدارة متكاملة للمبنى"
                ],
                image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200&q=80"
            }
        ],
        portfolio: [
            {
                id: "mamur-mosque",
                title: "جامع المعمور",
                description: "نظام أتمتة ذكي للمسجد",
                icon: Moon,
                overview: "نظام مبنى ذكي شامل مع تحكم متكامل في الأبواب، وأتمتة الإضاءة، وتكييف الهواء، والمراقبة. جميع الأنظمة متزامنة مع أوقات الصلاة لإدارة سلسلة للمرافق.",
                highlights: [
                    "التحكم في الأبواب والدخول والخروج",
                    "نظام التحكم في الإضاءة مع مستشعرات الحركة",
                    "تكامل نظام WIDE",
                    "تكييف الهواء مع تحسين المناخ",
                    "تطبيق الطاقة الشمسية",
                    "التحكم في الستائر",
                    "نظام كاميرات المراقبة والحماية"
                ],
                image: "/portfolio/mamur.webp"
            },
            {
                id: "awab-holdings",
                title: "شركة أواب القابضة",
                description: "أتمتة ذكية للمبنى بالكامل",
                icon: Building2,
                overview: "نظام إدارة مبنى متكامل يغطي الإضاءة والتحكم في المناخ عبر المرفق بأكمله مع سيناريوهات مبتكرة لتوفير الطاقة.",
                highlights: [
                    "نظام التحكم في الإضاءة للمبنى بأكمله",
                    "التحكم في تكييف الهواء مع تحسين الطاقة",
                    "نظام التحكم في الستائر",
                    "نظام كاميرات المراقبة",
                    "التحكم في الدخول والخروج",
                    "نظام غرف مؤتمرات ودردشة فيديو متكامل",
                    "البنية التحتية لشبكة البيانات والمعلومات"
                ],
                image: "/portfolio/awab.jpg"
            },
            {
                id: "nomd-holding",
                title: "شركة نومد القابضة",
                description: "حل متقدم لإدارة المرافق",
                icon: Building2,
                overview: "أتمتة مبنى حديثة توفر إضاءة ذكية وتحكم في المناخ مع سيناريوهات موفرة للطاقة لتحقيق كفاءة تشغيلية مثالية.",
                highlights: [
                    "نظام التحكم في الإضاءة للمبنى بأكمله",
                    "التحكم في تكييف الهواء مع تحسين الطاقة",
                    "نظام التحكم في الستائر",
                    "نظام كاميرات المراقبة",
                    "التحكم في الدخول والخروج",
                    "نظام غرف مؤتمرات ودردشة فيديو متكامل",
                    "البنية التحتية لشبكة البيانات والمعلومات"
                ],
                image: "/portfolio/nomd.jpg"
            },
            {
                id: "conference-room",
                title: "غرفة اجتماعات ومؤتمرات لشركة عبد الله بن سعيدان العقارية",
                description: "أتمتة متقدمة لمرافق المؤتمرات",
                icon: Video,
                overview: "حل احترافي لغرف المؤتمرات مع أنظمة سمعية وبصرية متكاملة وعناصر تحكم ذكية لعروض تقديمية ومؤتمرات فيديو سلسة.",
                highlights: [
                    "نظام التحكم في الإضاءة",
                    "نظام غرف مؤتمرات ودردشة فيديو متكامل",
                    "شبكة البيانات والمعلومات",
                    "نظام التحكم في الستائر",
                    "نظام نقل الشبكة لدعم شاشات متعددة"
                ],
                image: "/portfolio/meeting.jpg"
            },
            {
                id: "outer-theatre",
                title: "المسرح الخارجي لجامعة الأمير سلطان بن عبد العزيز",
                description: "أتمتة المسرح وأنظمة الوسائط",
                icon: Clapperboard,
                overview: "نظام أتمتة مسرح كامل يتميز بإضاءة متكاملة، وتحكم في الصوتيات، وأنظمة عرض خارجية لعروض سمعية وبصرية احترافية.",
                highlights: [
                    "التحكم في الإضاءة والصوتيات",
                    "نظام صوتي خارجي متكامل",
                    "شاشة خارجية (حجم 7م*4م)",
                    "نظام نقل الشبكة لدعم شاشات متعددة"
                ],
                image: "/portfolio/outertheatre.jpg"
            },
            {
                id: "sulai-valley",
                title: "مراقبة وادي السلي",
                description: "حل المراقبة والمتابعة عن بعد",
                icon: ShieldCheck,
                overview: "نظام مراقبة عن بعد يعمل بالطاقة الشمسية مع قدرة نقل بيانات لاسلكية تغطي نطاق 20 كم مع تحكم كامل في الدخول والخروج.",
                highlights: [
                    "الطاقة الشمسية تغذي الكاميرات ونقل البيانات",
                    "نقل لاسلكي للمعلومات على بعد 20 كم مع تحكم عن بعد",
                    "كاميرات مراقبة",
                    "التحكم في الدخول والخروج من وحدة التحكم"
                ],
                image: "/portfolio/sulaivalley.webp"
            },
            {
                id: "princess-modhi",
                title: "جامع الأميرة موضي العنقري الكبير",
                description: "أتمتة ذكية للمسجد الكبير",
                icon: Moon,
                overview: "نظام أتمتة مسجد مرموق مع مزامنة أوقات الصلاة. جميع الأنظمة بما في ذلك الأبواب والإضاءة والتحكم في المناخ والمراقبة تعمل بانسجام مع جداول الصلاة الإسلامية لتعزيز تجربة العبادة.",
                highlights: [
                    "التحكم في الأبواب والدخول والخروج",
                    "نظام التحكم في الإضاءة",
                    "تكامل نظام WIDE",
                    "التحكم في تكييف الهواء",
                    "التحكم في الستائر",
                    "نظام كاميرات المراقبة والحماية",
                    "أتمتة متزامنة مع أوقات الصلاة"
                ],
                image: "/portfolio/princessmodhi.webp"
            }
        ],
        homeFeatures: [
            {
                icon: Cpu,
                alt: "التكامل بين الأنظمة",
                title: "التكامل بين الأنظمة",
                desc: "إمكانية ربط جميع التقنيات وتقديمها للعميل كنظام متكامل وشاشة تحكم واحدة!"
            },
            {
                icon: Handshake,
                alt: "خدمات ما بعد البيع",
                title: "خدمات ما بعد البيع",
                desc: "خدمات دعم وصيانة شاملة لضمان استمرار عمل أنظمتك بأعلى أداء لفترة طويلة بعد التركيب."
            },
            {
                icon: Headset,
                alt: "فهم احتياجات العميل",
                title: "فهم احتياجات العميل",
                desc: "نحن نأخذ الوقت لفهم متطلباتك الفريدة، وتقديم حلول مخصصة تناسب احتياجات عملك تمامًا."
            },
            {
                icon: Clock12,
                alt: "التسليم في الوقت المحدد",
                title: "التسليم في الوقت المحدد",
                desc: "نحن نحترم جدولك الزمني. يلتزم فريقنا بتسليم المشاريع في الموعد المحدد دون المساس بالجودة أو معايير السلامة."
            },
            {
                icon: MonitorDown,
                alt: "تركيب احترافي",
                title: "تركيب احترافي",
                desc: "يضمن فنيونا المعتمدون تركيب كل نظام بدقة وعناية، مع اتباع بروتوكولات السلامة والجودة العالمية."
            },
            {
                icon: ClipboardMinus,
                alt: "التوثيق",
                title: "التوثيق",
                desc: "نحن نقدم توثيقًا كاملاً لجميع الأنظمة المثبتة، بما في ذلك أدلة المستخدم والرسومات الفنية وأدلة الصيانة للرجوع إليها."
            }
        ],
        about: {
            title: "من نحن",
            subtitle: "هويتنا",
            content: {
                mission: { title: "مهمتنا", text: "سعادتكم هي نجاحنا. نحن نبتكر حلولاً ذكية ومبتكرة لإرضاء العملاء ونشر هذه الثقافة في المنطقة." },
                vision: { title: "رؤيتنا", text: "الاستفادة من أحدث التقنيات بأسعار تنافسية ودعم استثنائي، لتصبح علامة فارقة في الخدمات الذكية في جميع أنحاء المنطقة." },
                values: { title: "قيمنا", text: "العملاء يأتون أولاً. نلتزم بإيجاد أفضل الحلول، والتعامل بجدية مع المشاريع، وتقديم الدعم الفوري بعد المشروع كمعيار أساسي." }
            }
        },
        contact: {
            title: "تواصل معنا",
            subtitle: "ابقى على تواصل معنا",
            name: "الاسم",
            email: "البريد الإلكتروني",
            phone: "رقم الهاتف",
            message: "الرسالة",
            send: "إرسال الرسالة",
            address: "الرياض، المملكة العربية السعودية",
            phoneValue: "+966 50 000 0000",
            emailValue: "info@smartcloud.com.sa"
        },
        footer: {
            copyright: "© 2024 السحابة الذكية. جميع الحقوق محفوظة.",
            links: [
                { name: "سياسة الخصوصية", href: "#" },
                { name: "شروط الخدمة", href: "#" }
            ]
        },
        partners: {
            title: "شركاؤنا",
        },
        certifications: {
            title: "شهاداتنا",
        },
        location: {
            title: "أين تجدنا",
            mapPoints: {
                egypt: "مصر",
                saudi: "المملكة العربية السعودية",
                uae: "الإمارات العربية المتحدة"
            }
        },
        common: {
            requestService: "طلب خدمة",
            loading: "جاري التحميل..."
        }
    }
};
