import React, { useState } from 'react';
import './gallery.css';

function HexagonImageGallery() {
  
  return (
    <>
      <div className="flex justify-center">
        <div className="hexagon-grid">
          <div className="hexagon center-image" >
            <img
              src="https://media.gettyimages.com/id/615970090/photo/hollywood-ca-stan-lee-attends-the-premiere-of-disney-and-marvel-studios-doctor-strange-on.jpg?s=612x612&w=0&k=20&c=vdMgQD-OXG1y_z53Fb-3ky5TEoVdrZJRLmH37J6LZyA="
              alt="Stan Lee"
            />
          </div>
          <div className="hexagon side-image top-left" >
            <img
              src="https://media.gettyimages.com/id/1371458561/photo/eric-arthur-blair-better-known-by-his-pen-name-george-orwell-was-an-influential-english.jpg?s=612x612&w=0&k=20&c=OjBfseN1pFI1wG0_t0FbttCUUPP_RVcQ-knsoG6vBwQ="
              alt="George Orwell"
            />
          </div>
          <div className="hexagon side-image top-right">
            <img
              src="https://media.gettyimages.com/id/1388460912/photo/london-england-j-k-rowling-attends-fantastic-beasts-the-secrets-of-dumbledore-world-premiere.jpg?s=612x612&w=0&k=20&c=wM6Wce4EgXSfixXOF1oSaPtJ-kWvhvWQAuq2FP35tQQ="
              alt="J.K. Rowling"
            />
          </div>
          <div className="hexagon side-image middle-left" >
            <img
              src="https://media.gettyimages.com/id/3231209/photo/american-author-f-scott-fitzgerald-wearing-a-tweed-suit.jpg?s=612x612&w=0&k=20&c=JRC1R_AQYEYiwLEZ-d1A5xhqIfLcP7lI0CXHRDTpOaU="
              alt="F. Scott Fitzgerald"
            />
          </div>
          <div className="hexagon side-image middle-right">
            <img
              src="https://media.gettyimages.com/id/515218472/photo/photograph-of-charles-dickens-seated-undated-photograph.jpg?s=612x612&w=0&k=20&c=-RYsrXVlq3AIhaWfUVq-7fT0NUzDUURWJ4t1bloxN-k="
              alt="Charles Dickens"
            />
          </div>
          <div className="hexagon side-image bottom-left" >
            <img
              src="https://media.gettyimages.com/id/171072893/photo/jane-austen-portrait-of-the-english-novelist-as-a-young-woman-16-december-1775-18-july-1817.jpg?s=612x612&w=0&k=20&c=HufZI2X9rRm32oP9bubaRrqW9DcquT8N_FaS_Zq2Uso="
              alt="Jane Austen"
            />
          </div>
          <div className="hexagon side-image bottom-right" >
            <img
              src="https://media.gettyimages.com/id/145459445/photo/kenya-author-ernest-hemingway-poses-for-a-portrait-while-on-a-big-game-hunt-in-september-1952.jpg?s=612x612&w=0&k=20&c=yFhNVfq8KsnIygNpvncFzpXrc8PGafaQSC9FJK0kOYk="
              alt="Ernest Hemingway"
            />
          </div>
        </div>
       
      </div>
    </>
  );
}

export default HexagonImageGallery;