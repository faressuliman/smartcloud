import { Home, Info, Wrench, FolderKanban, Target, Eye, Heart } from "lucide-react";

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

import { Users } from "lucide-react";

export const homeFeatures = [
    {
        src: "/services/integrationn.png",
        alt: "Integration Between Systems",
        title: "Integration Between Systems",
        desc: "The possibility of linking all the techniques and presented to the client as an integrated system and one controller screen!"
    },
    {
        src: "/common/after-sales.png",
        alt: "After-Sales Services",
        title: "After-Sales Services",
        desc: "Comprehensive support and maintenance services to ensure your systems continue operating at peak performance long after installation."
    },
    {
        src: "/services/client-needs.png",
        alt: "Understand Client Needs",
        title: "Understand The Client's Needs",
        desc: "We take time to understand your unique requirements, delivering customized solutions that perfectly fit your business needs."
    },
    {
        src: "/services/deliver.png",
        alt: "Deliver On Time",
        title: "Deliver On Time",
        desc: "We respect your timeline. Our team is committed to delivering projects on schedule without compromising on quality or safety standards."
    },
    {
        src: "/services/installationnn.jpg",
        alt: "Professional Installation",
        title: "Professional Installation",
        desc: "Our certified technicians ensure every system is installed with precision and care, following international safety and quality protocols."
    },
    {
        src: "/services/documentt.png",
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
