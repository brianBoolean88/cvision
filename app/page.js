import Image from "next/image";
import React from "react";
import HeroSection from "@/app/components/HeroSection.jsx";
import FeaturesSection from "@/app/components/FeaturesSection.jsx";
import Footer from "@/app/components/Footer.jsx";
import FileUpload from "./components/FileUpload";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <FileUpload />
      <Footer />
    </div>
  );
}
