/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const basePath = ""; // Servir desde la raíz del dominio
// Solo usar export estático si no se necesita NextAuth (API routes)
const useStaticExport = process.env.USE_STATIC_EXPORT === "true";

const nextConfig = {
  // Solo usar output: "export" si se especifica explícitamente
  // Si no es export estático, usar standalone para Docker
  ...(useStaticExport 
    ? { output: "export" }
    : { output: "standalone" }
  ),
  basePath,
  assetPrefix: basePath,
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true,
    qualities: [75, 100],
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  },
};

export default nextConfig;
