import { getImgPath } from "@/utils/image";

export const menuItems = [
    { name: "Inicio", href: "#home" },
    { name: "Acerca de", href: "#about" },
    { name: "Servicios", href: "#services" },
    { name: "Portafolio", href: "#portfolio" },
    { name: "Testimonios", href: "#testimonials" },
    { name: "Blog", href: "/#blog" },
];

export const count = [
    {
        icon: getImgPath("/images/counter/star.svg"),
        value: "4.86",
        description: "De 5 estrellas de 3896 reseñas en la plataforma de Google",
    },
    {
        icon: getImgPath("/images/counter/admin.svg"),
        value: "364",
        description: "Testimonios de clientes recibidos en el año 2024",
    },
    {
        icon: getImgPath("/images/counter/bag.svg"),
        value: "45M+",
        description: "Ingresos generados a través de nuevos proyectos y marketing",
    },
];

export const Progress = [
    { title: 'Investigación y Pruebas UX', Progress: 95 },
    { title: 'Gestión de Productos', Progress: 84 },
    { title: 'Diseño UI y Visual', Progress: 90 }
];

export const Servicebox = [
    {
        icon: getImgPath('/images/services/ux-design-product_1.svg'),
        title: 'Diseño UX y de Productos',
        description: 'Creamos experiencias de usuario excepcionales mediante investigación profunda, diseño intuitivo y prototipado iterativo. Transformamos ideas complejas en interfaces elegantes y funcionales.',
    },
    {
        icon: getImgPath('/images/services/perfomance-optimization.svg'),
        title: 'Optimización de Rendimiento',
        description: 'Mejoramos la velocidad, eficiencia y escalabilidad de tus aplicaciones web y móviles. Implementamos las mejores prácticas para garantizar un rendimiento óptimo en todos los dispositivos.',
    },
    {
        icon: getImgPath('/images/services/ux-design-product_2.svg'),
        title: 'Desarrollo Web y Móvil',
        description: 'Desarrollamos aplicaciones web y móviles de alta calidad utilizando tecnologías modernas. Desde sitios web responsivos hasta aplicaciones nativas e híbridas, cubrimos todas tus necesidades digitales.',
    },
]

export const portfolioinfo = [
    {
        image: getImgPath('/images/portfolio/conectalia.jpg'),
        alt: 'Portfolio',
        title: 'Conectalia',
        slug: 'conectalia',
        info: 'Sitio web de Conectalia',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/rank.jpg'),
        alt: 'Portfolio',
        title: 'Rank & style',
        slug: 'rank-style',
        info: 'Rediseño de sitio web',
        Class: 'md:mt-24'
    },
    {
        image: getImgPath('/images/portfolio/little.jpg'),
        alt: 'Portfolio',
        title: 'Little Blue',
        slug: 'little-blue',
        info: 'Sitio web de Little Blue',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/instafans.jpg'),
        alt: 'Portfolio',
        title: 'Instafans',
        slug: 'instafans',
        info: 'Diseño de App & landing page',
        Class: 'md:mt-24'
    },

    {
        image: getImgPath('/images/portfolio/nomads.jpg'),
        alt: 'Portfolio',
        title: 'Nomads',
        slug: 'Rediseño de marca  & sitio web',
        info: 'Sitio web de Nomads',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/meta.png'),
        alt: 'Portfolio',
        title: 'Meta cleaner',
        slug: 'meta-cleaner',
        info: 'Rediseño de landing page',
        Class: 'md:mt-24'
    },
   
    
]