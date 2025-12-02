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

// Estructura antigua (mantener por compatibilidad si se usa en otros lugares)
export const Servicebox = [
    {
        icon: getImgPath('/images/services/ux-design-product_1.svg'),
        title: 'Diseño Web',
        description: 'Creamos experiencias de usuario excepcionales mediante investigación profunda, diseño intuitivo y prototipado iterativo. Transformamos ideas complejas en interfaces elegantes y funcionales.',
        subservices: [
            {
                icon: '🌐',
                text: 'Diseño de sitios web modernos, rápidos y personalizados.',
            },
            {
                icon: '⚙️',
                text: 'Sitios autoadministrables con panel fácil de usar.',
            },
            {
                icon: '🛒',
                text: 'Tiendas online (Shopify, Tiendanube, WooCommerce).',
            },
            {
                icon: '⚡',
                text: 'Optimización de velocidad y experiencia de usuario (UX/UI).',
            },
            {
                icon: '📱',
                text: 'Diseño responsive (adaptado a móviles).',
            },
            {
                icon: '🚀',
                text: 'Landing pages para campañas y lanzamientos.',
            },
        ],
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

// Nueva estructura de categorías de servicios (acordeón)
export interface Service {
    name: string
    icon: string
    iconColor?: string
}

export interface ServiceCategory {
    id: string
    title: string
    icon: string
    defaultExpanded: boolean
    services: Service[]
}

export const ServiceCategories: ServiceCategory[] = [
    {
        id: 'design',
        title: 'Diseño Web',
        icon: getImgPath('/images/services/ux-design-product_1.svg'),
        defaultExpanded: false,
        services: [
            {
                name: 'Diseño de sitios web modernos, rápidos y personalizados.',
                icon: '🌐',
                iconColor: 'blue'
            },
            {
                name: 'Sitios autoadministrables con panel fácil de usar.',
                icon: '⚙️',
                iconColor: 'blue'
            },
            {
                name: 'Tiendas online (Shopify, Tiendanube, WooCommerce).',
                icon: '🛒',
                iconColor: 'blue'
            },
            {
                name: 'Optimización de velocidad y experiencia de usuario (UX/UI).',
                icon: '⚡',
                iconColor: 'blue'
            },
            {
                name: 'Diseño responsive (adaptado a móviles).',
                icon: '📱',
                iconColor: 'blue'
            },
            {
                name: 'Landing pages para campañas y lanzamientos.',
                icon: '🚀',
                iconColor: 'blue'
            },
        ]
    },
    {
        id: 'development',
        title: 'Desarrollo a medida',
        icon: getImgPath('/images/services/ux-design-product_2.svg'),
        defaultExpanded: false,
        services: [
            {
                name: 'Desarrollo de aplicaciones web y móviles.',
                icon: '💻',
                iconColor: 'blue'
            },
            {
                name: 'Sistemas personalizados (CRM, ERP, intranets).',
                icon: '🔧',
                iconColor: 'blue'
            },
            {
                name: 'Sistemas de turnos y reservas.',
                icon: '📅',
                iconColor: 'blue'
            },
            {
                name: 'Plataformas para inmobiliarias (carga de propiedades, panel de clientes, buscadores).',
                icon: '🏠',
                iconColor: 'blue'
            },
            {
                name: 'Integraciones con APIs y servicios externos.',
                icon: '🔌',
                iconColor: 'blue'
            },
            {
                name: 'Automatización de procesos y herramientas internas.',
                icon: '⚙️',
                iconColor: 'blue'
            },
            {
                name: 'Dashboards y paneles de administración.',
                icon: '📊',
                iconColor: 'blue'
            },
        ]
    },
    {
        id: 'branding',
        title: 'Branding y identidad visual',
        icon: getImgPath('/images/services/ux-design-product_1.svg'),
        defaultExpanded: false,
        services: [
            {
                name: 'Diseño de logos, paletas de colores y tipografías.',
                icon: '🎨',
                iconColor: 'blue'
            },
            {
                name: 'Manual de marca completo (uso del logo, variantes, reglas, tono de marca).',
                icon: '📖',
                iconColor: 'blue'
            },
            {
                name: 'Kits gráficos para redes sociales (plantillas para posts, historias y banners).',
                icon: '📱',
                iconColor: 'blue'
            },
            {
                name: 'Diseño de tarjetas personales y papelería corporativa.',
                icon: '💼',
                iconColor: 'blue'
            },
            {
                name: 'Rediseño o actualización de identidad visual existente (rebranding).',
                icon: '🔄',
                iconColor: 'blue'
            },
            {
                name: 'Creación de iconografía personalizada.',
                icon: '✨',
                iconColor: 'blue'
            },
        ]
    },
]

export const portfolioinfo = [
    {
        image: getImgPath('/images/portfolio/elebe.jpg'), // Miniatura
        modalImage: getImgPath('/images/portfolio/elebe.jpg'), // Imagen del modal (cambiar por imagen diferente)
        alt: 'Portfolio',
        title: 'Elebe Agencia',
        slug: 'elebe',
        info: 'Sitio web de Elebe Agencia',
        description: 'Diseño y desarrollo de sitio autoadministrable con CRM propio.', // Descripción personalizada para el modal
        website: 'https://elebe.agency/', // URL del sitio web (opcional, dejar vacío si no hay)
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/rank.jpg'),
        modalImage: getImgPath('/images/portfolio/rank.png'),
        alt: 'Portfolio',
        title: 'Rank & style',
        slug: 'rank-style',
        info: 'Rediseño de sitio web',
        description: 'Rediseño y desarrollo de sitio web autoadministrable.',
        website: 'http://rankandstyle.com',
        Class: 'md:mt-24'
    },
    {
        image: getImgPath('/images/portfolio/little.jpg'),
        modalImage: getImgPath('/images/portfolio/little.jpg'),
        alt: 'Portfolio',
        title: 'Little Blue',
        slug: 'little-blue',
        info: 'Sitio web de Little Blue',
        description: 'Diseño web autoadministrable con CRM propio.',
        website: 'https://littleblue.com.ar/',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/instafans.jpg'),
        modalImage: getImgPath('/images/portfolio/insta1.png'),
        alt: 'Portfolio',
        title: 'Instafans',
        slug: 'instafan',
        info: 'Diseño de App & landing page',
        description: 'Diseño de Marca, App & landing page',
        website: 'http://instafans.com',
        Class: 'md:mt-24'
    },

    {
        image: getImgPath('/images/portfolio/nomads.jpg'),
        modalImage: getImgPath('/images/portfolio/nomads.jpg'),
        alt: 'Portfolio',
        title: 'Nomads',
        slug: '',
        info: 'Rediseño de marca  & sitio web',
        description: 'Rediseño de marca  & sitio web',
        website: 'https://mydigitalnomads.com/',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/meta.png'),
        modalImage: getImgPath('/images/portfolio/meta.png'),
        alt: 'Portfolio',
        title: 'Met cleaner',
        slug: 'mecleaner',
        info: 'Rediseño de landing page',
        description: 'Rediseño de landing page en Wordpress',
        website: '',
        Class: 'md:mt-24'
    },
]