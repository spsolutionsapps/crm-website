
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import Counter from "@/components/Home/Counter";
import Progresswork from "@/components/Home/WorkProgress";
import Services from "@/components/Home/Services";
export const metadata: Metadata = {
    title: "Servicios | SP Solutions",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Inicio" },
    { href: "/services", text: "Servicios" },
  ];
  return (
    <>
      <HeroSub
        title="Servicios"
        description="Ofrecemos una amplia gama de servicios tecnológicos diseñados para impulsar el crecimiento de tu negocio y mejorar tu presencia digital."
        breadcrumbLinks={breadcrumbLinks}
      />
      <Services/>
    </>
  );
};

export default page;
