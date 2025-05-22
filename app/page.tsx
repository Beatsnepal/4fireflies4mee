'use client';
import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { BeatsSection } from '../components/BeatsSection';
import { MixingMasteringSection } from '../components/MixingMasteringSection';
import { FounderSection } from '../components/FounderSection';
import { BeatUploadModal } from '../components/BeatUploadModal';
import { JoinServiceModal } from '../components/JoinServiceModal';

export default function HomePage() {
  const [isBeatUploadOpen, setIsBeatUploadOpen] = useState(false);
  const [isJoinServiceOpen, setIsJoinServiceOpen] = useState(false);

  return (
    <>
      <Navbar onUploadClick={() => setIsBeatUploadOpen(true)} />

      <main className="flex-grow">
        <Hero />
        <BeatsSection onUploadClick={() => setIsBeatUploadOpen(true)} />
        <MixingMasteringSection onJoinClick={() => setIsJoinServiceOpen(true)} />
        <FounderSection />
      </main>

      <Footer />

      <BeatUploadModal isOpen={isBeatUploadOpen} onClose={() => setIsBeatUploadOpen(false)} />
      <JoinServiceModal
  isOpen={isJoinServiceOpen}
  onClose={() => setIsJoinServiceOpen(false)}
  onSubmit={() => {}}
/>

    </>
  );
}
