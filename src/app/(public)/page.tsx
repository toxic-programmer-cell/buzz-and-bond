import Hero from "@/components/layouts/Hero/Hero";
import AnimatedText from "@/components/layouts/AnimatedText/AnimatedText";
import Services from "@/components/sections/Services";
import Event from "@/components/layouts/EventAndActivity";
import { Pricing, PricingStructure } from "@/components/layouts/PricingSection";
import Testimonial from "@/components/layouts/Testimonial";
import ContactForm from "@/components/layouts/ContactUsForm";

export default function Home() {
  return (
    <>
      <Hero />
      <AnimatedText />
      <Services />
      <Event />
      <Pricing />
      <PricingStructure />
      <Testimonial />
      <ContactForm />
    </>
  );
}
