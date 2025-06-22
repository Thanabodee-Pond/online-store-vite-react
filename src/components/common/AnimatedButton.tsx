// src/components/common/AnimatedButton.tsx

import { Link } from 'react-router-dom';
import React from 'react';

interface AnimatedButtonProps {
  to: string;
  children: React.ReactNode;
}

const AnimatedButton = ({ to, children }: AnimatedButtonProps) => {
  return (
    <Link
      to={to}
      // 1. เราจะใช้ group เพื่อควบคุม ::before (ที่จำลองด้วย span) ตอน hover
      // และใช้ relative + overflow-hidden เพื่อเป็นกรอบให้กับอนิเมชัน
      className="relative inline-block px-8 py-3 overflow-hidden font-bold tracking-wider uppercase transition-colors duration-300 ease-in-out border-2 text-dark border-dark group"
    >
      {/* 2. สร้าง span เพื่อเป็นพื้นหลังที่วิ่งเข้ามา */}
      {/* - มันจะถูกซ่อนไว้ทางซ้าย (-translate-x-full) และจะเลื่อนเข้ามาเมื่อ hover ที่ group */}
      <span
        className="absolute inset-0 w-full h-full transition-transform duration-300 ease-in-out transform -translate-x-full bg-dark group-hover:translate-x-0"
        aria-hidden="true"
      ></span>
      
      {/* 3. ทำให้ตัวหนังสืออยู่ด้านบนสุด และเปลี่ยนสีเมื่อ hover */}
      <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white">
        {children}
      </span>
    </Link>
  );
};

export default AnimatedButton;