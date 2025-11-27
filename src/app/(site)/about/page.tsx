
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import Counter from "@/components/Home/Counter";
import Progresswork from "@/components/Home/WorkProgress";
export const metadata: Metadata = {
    title: "Acerca de | SP Solutions",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Inicio" },
    { href: "/about", text: "Acerca de" },
  ];
  return (
    <>
      <HeroSub
        title="Acerca de Nosotros"
        description="Conoce más sobre SP Solutions, nuestro equipo de expertos y nuestra pasión por crear soluciones tecnológicas innovadoras que transforman negocios."
        breadcrumbLinks={breadcrumbLinks}
      />
       <Counter isColorMode={true} />
       <Progresswork isColorMode={true} />
    </>
  );
};

export default page;
