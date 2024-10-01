'use client'
import { Container } from 'react-bootstrap';
import React from 'react';
import Image from 'next/image'; // Importing the Image component for Next.js
import LoginBg from '/public/CoupleBand4_old2.png'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="position-relative min-vh-100 d-flex flex-row align-items-center">
      {/* Background Image */}
      <Image
        fill
        className="bg-image" // Use this class for positioning
        src={LoginBg} // Path to your background image
        alt="Kisna Logo" // Proper alt text
        style={{ objectFit: 'cover' }} // Ensures the image covers the entire area
      />
      
      <Container className="position-relative z-index-1"> {/* Ensure children are above the image */}
        {children}
      </Container>

      <style jsx>{`
        .bg-image {
          z-index: -1; // Send the image to the back
          opacity: 0.7; // Adjust opacity if needed
        }
      `}</style>
    </div>
  );
}
