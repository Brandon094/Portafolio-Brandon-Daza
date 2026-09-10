import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary'
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 rounded-full font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-white !text-black hover:bg-opacity-90 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-neon-purple active:scale-95",
    secondary: "bg-cyber-purple !text-white hover:bg-opacity-90 shadow-neon-purple active:scale-95",
    outline: "bg-transparent border border-white/20 !text-white hover:bg-white/5 active:scale-95"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;
