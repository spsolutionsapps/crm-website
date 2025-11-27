import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Contact/OfficeLocation";
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Contacto | SP Solutions",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Inicio" },
    { href: "/contact", text: "Contacto" },
  ];
  return (
    <>
      <HeroSub
        title="Contáctanos"
        description="Estamos aquí para ayudarte. Ponte en contacto con nuestro equipo y descubre cómo podemos transformar tu proyecto en realidad."
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactInfo />
      <ContactForm />
      <Location />
    </>
  );
};

export default page;
