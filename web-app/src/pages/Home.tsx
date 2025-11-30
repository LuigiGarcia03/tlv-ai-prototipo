import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { Features } from '../components/Features/Features';
import { DesktopCTA } from '../components/DesktopCTA/DesktopCTA';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <DesktopCTA />
    </>
  );
};