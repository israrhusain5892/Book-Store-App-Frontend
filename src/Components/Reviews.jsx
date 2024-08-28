import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/autoplay'; // Import autoplay styles
import { EffectCreative, Autoplay } from 'swiper/modules'; // Import Autoplay module
import Card from "./Cards"; // Updated to import Card

export default function Dummy() {
  const cardData = [
    { img: 'https://img.freepik.com/premium-photo/stunning-stylish-indian-girl-with-beautiful-sari-ai-generated_874192-2346.jpg', des: 'The Book Vault offers an extensive collection of books across various genres. I found all my favorite titles with ease!', name: 'John Doe', ratings: 5 },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6eG3sd7-ng0v0aw4H4KR7y8fEMYrzLfK9_A&s', des: 'Shopping at The Book Vault was a delightful experience. Their premium book selection and customer service are top-notch.', name: 'Jane Smith', ratings: 5 },
    { img: 'https://static.toiimg.com/photo/101325414/101325414.jpg', des: 'The Book Vault’s personalized recommendations helped me discover amazing new books. The website is user-friendly and easy to navigate.', name: 'Emily Johnson', ratings: 4 },
    { img: 'https://cdn.pixabay.com/photo/2024/02/12/17/23/ai-generated-8569065_960_720.jpg', des: 'I saved a lot of money on my favorite books thanks to The Book Vault’s great deals and discounts. Highly recommend!', name: 'Michael Brown', ratings: 4 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <header className="w-full py-6 bg-white shadow-md text-center">
        <h1 className="text-4xl font-semibold text-gray-900">The Book Vault</h1>
        <p className="text-lg text-gray-500 mt-2">Discover Your Next Favorite Book</p>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-8 text-gray-800">Our Happy Clients</h2>
          <Swiper
            grabCursor={true}
            effect={'creative'}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400],
              },
              next: {
                translate: ['100%', 0, 0],
              },
            }}
            modules={[EffectCreative, Autoplay]} // Add Autoplay module
            autoplay={{ delay: 2000, disableOnInteraction: false }} // Configure autoplay
            speed={1200}
            className="mySwiper"
          >
            {cardData.map((card, index) => (
              <SwiperSlide key={index} className="swiper-slide flex items-center justify-center">
                <Card img={card.img} des={card.des} name={card.name} ratings={card.ratings} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </main>
      
    </div>
  );
}
