// src/components/common/HeroSlider.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const slidesData = [
  {
    id: 1,
    subtitleKey: 'hero_slider.slide1_subtitle',
    titleKey: 'hero_slider.slide1_title',
    image: '/images/slider-image-1.png',
    bgColor: 'bg-gray-100',
  },
  {
    id: 2,
    subtitleKey: 'hero_slider.slide2_subtitle',
    titleKey: 'hero_slider.slide2_title',
    image: '/images/slider-image-2.png',
    bgColor: 'bg-white',
  },
  {
    id: 3,
    subtitleKey: 'hero_slider.slide3_subtitle',
    titleKey: 'hero_slider.slide3_title',
    image: '/images/slider-image-3.png',
    bgColor: 'bg-gray-100',
  }
];

const AnimatedButton = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <Link to={to} className="relative inline-block px-10 py-4 overflow-hidden text-sm font-bold tracking-widest uppercase transition-colors duration-300 ease-in-out border-2 text-dark border-dark group">
        <span className="absolute inset-0 w-full h-full transition-transform duration-300 ease-in-out transform -translate-x-full bg-dark group-hover:translate-x-0" aria-hidden="true"></span>
        <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white">{children}</span>
    </Link>
);


const HeroSlider = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? slidesData.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === slidesData.length - 1 ? 0 : prevIndex + 1));
  };
  
  useEffect(() => {
    const slideInterval = setInterval(goToNext, 3000);
    return () => clearInterval(slideInterval); 
  }, []);

  const currentSlide = slidesData[currentIndex];

  return (
    <div className="relative w-full h-[700px] md:h-[700px] overflow-hidden">
        <button onClick={goToPrevious} className="absolute z-20 p-3 transition-colors -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 left-4 md:left-8 bg-opacity-70 hover:bg-opacity-100">
            <FiChevronLeft size={24} />
        </button>
        <button onClick={goToNext} className="absolute z-20 p-3 transition-colors -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 right-4 md:right-8 bg-opacity-70 hover:bg-opacity-100">
            <FiChevronRight size={24} />
        </button>
        
        <AnimatePresence initial={false}>
            <motion.div
                key={currentSlide.id}
                className={`absolute top-0 left-0 w-full h-full ${currentSlide.bgColor}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
            >
                <div className="container h-full px-4 mx-auto">
                    {/* --- ส่วนที่แก้ไข --- */}
                    {/* เปลี่ยนเป็น flex-col-reverse ในมือถือ และ grid ในจอใหญ่ */}
                    <div className="flex flex-col-reverse items-center h-full gap-8 md:grid md:grid-cols-2">
                        
                        {/* Text Content */}
                        <div className="pb-8 text-center md:text-left md:pb-0">
                            <motion.h3 
                              key={`${currentSlide.id}-subtitle`}
                              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                              className="mb-4 text-lg font-semibold tracking-widest uppercase md:text-xl text-primary"
                            >
                              {t(currentSlide.subtitleKey)}
                            </motion.h3>
                            <motion.h1 
                              key={`${currentSlide.id}-title`}
                              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                              className="mb-10 text-4xl font-bold leading-tight md:text-6xl text-dark"
                            >
                              {t(currentSlide.titleKey)}
                            </motion.h1>
                            <motion.div
                              key={`${currentSlide.id}-button`}
                              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                            >
                              <AnimatedButton to="/products">{t('hero_slider.shop_now')}</AnimatedButton>
                            </motion.div>
                        </div>
                        
                        {/* Image Content */}
                        <motion.div 
                          key={`${currentSlide.id}-image`}
                          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                          // ปรับขนาดและความสูงสำหรับมือถือ
                          className="flex items-center justify-center w-full pt-12 h-1/2 md:h-full md:items-end md:pt-0"
                        >
                            <img 
                                src={currentSlide.image} 
                                alt={t(currentSlide.titleKey) || ''}
                                className="object-contain max-w-full max-h-full"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    </div>
  );
};

export default HeroSlider;