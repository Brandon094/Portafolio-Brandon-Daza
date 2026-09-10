import React from 'react';

interface NeonLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  onClick?: () => void;
}

const NeonLink: React.FC<NeonLinkProps> = ({ children, href, className = '', target, onClick }) => {
  return (
    <a
      href={href}
      className={`text-hacker-blue no-underline transition-all duration-300 hover:text-hacker-green hover:shadow-[0_0_5px_theme(colors.hacker-green)] ${className}`}
      target={target}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default NeonLink;
