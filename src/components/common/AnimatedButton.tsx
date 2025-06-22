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
      className="relative inline-block px-8 py-3 overflow-hidden font-bold tracking-wider uppercase transition-colors duration-300 ease-in-out border-2 text-dark border-dark group"
    >
      <span
        className="absolute inset-0 w-full h-full transition-transform duration-300 ease-in-out transform -translate-x-full bg-dark group-hover:translate-x-0"
        aria-hidden="true"
      ></span>
      
      <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white">
        {children}
      </span>
    </Link>
  );
};

export default AnimatedButton;