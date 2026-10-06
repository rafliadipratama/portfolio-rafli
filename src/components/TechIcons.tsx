import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
  color?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-5 h-5', color }) => {
  const normalized = name.toLowerCase().trim();

  // 1. Laravel
  if (normalized.includes('laravel')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || '#F43F5E'} aria-hidden="true">
        <path d="M22.5 13.9 19.3 12l3.2-1.9c.3-.2.5-.5.5-.9s-.2-.7-.5-.9L13.7 2.5c-.3-.2-.7-.2-1 0L1.9 8.3c-.3.2-.5.5-.5.9s.2.7.5.9l3.2 1.9-3.2 1.9c-.3.2-.5.5-.5.9s.2.7.5.9l8.8 5.8c.2.1.3.2.5.2s.4-.1.5-.2l8.8-5.8c.3-.2.5-.5.5-.9s-.2-.7-.5-.9zM12.7 4.1l7.6 5-3.4 2-7.6-5 3.4-2zm-7.6 5 3.4-2 7.6 5-3.4 2-7.6-5zm-1.5 5.2 3.4-2 7.6 5-3.4 2-7.6-5zm8.9 5.8-7.6-5 3.4-2 7.6 5-3.4 2zm1-2 7.6-5 3.4 2-7.6 5-3.4-2zm3.4-3.2-7.6-5 3.4-2 7.6 5-3.4 2z" />
      </svg>
    );
  }

  // 2. React
  if (normalized.includes('react')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color || '#38BDF8'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="2.2" fill={color || '#38BDF8'} />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" />
      </svg>
    );
  }

  // 3. TypeScript
  if (normalized.includes('typescript') || normalized === 'ts') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="22" height="22" x="1" y="1" rx="4" fill="#3178C6" />
        <path fill="#ffffff" d="M11.5 8.5H6.5v2h1.6v6h2v-6h1.4v-2zm3.2 5.5c.6.4 1.3.6 2 .6.8 0 1.2-.3 1.2-.7 0-.4-.3-.6-1.1-.9-1.3-.5-2.2-1.1-2.2-2.3 0-1.3 1-2.3 2.6-2.3.8 0 1.5.2 2.1.6l-.6 1.6c-.5-.3-1-.5-1.5-.5-.7 0-1.1.3-1.1.7 0 .4.3.6 1.2.9 1.4.5 2.1 1.2 2.1 2.3 0 1.4-1.1 2.3-2.8 2.3-.9 0-1.8-.3-2.5-.7l.6-1.6z" />
      </svg>
    );
  }

  // 4. JavaScript
  if (normalized.includes('javascript') || normalized === 'js') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="22" height="22" x="1" y="1" rx="4" fill="#F7DF1E" />
        <path fill="#000000" d="M7 16.5c.7.4 1.5.7 2.4.7 1.4 0 2.3-.7 2.3-2.4v-6h-2v5.9c0 .8-.4 1.1-1 1.1-.4 0-.9-.1-1.2-.3l-.5 1zm7.4 0c1 .5 2.1.8 3.2.8 2 0 3.2-1 3.2-2.7 0-1.5-.9-2.3-2.4-2.9-1-.4-1.4-.7-1.4-1.2 0-.5.4-.8 1.2-.8.8 0 1.5.2 2 .5l.6-1.7c-.6-.4-1.5-.6-2.5-.6-2 0-3.3 1.1-3.3 2.7 0 1.4.9 2.3 2.4 2.9 1 .4 1.4.7 1.4 1.3 0 .6-.5 1-1.4 1-.9 0-1.8-.3-2.4-.7l-.6 1.7z" />
      </svg>
    );
  }

  // 5. PHP
  if (normalized.includes('php')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || '#818CF8'} aria-hidden="true">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-5.7 13.5H4.8l1.4-6.9h2.3c1.3 0 2.2.7 2 1.9-.3 1.5-1.5 2.5-2.8 2.5H6.6l-.3 1.5zm1.5-3.2h.9c.7 0 1.3-.5 1.5-1.2.1-.6-.2-1-.8-1H8.6l-.8 2.2zm7.1 3.2h-1.5l1.4-6.9h1.5l-.5 2.5h1.8c1.3 0 2.2.7 2 1.9-.3 1.5-1.5 2.5-2.8 2.5h-1.1l-.8 2.5zm1.5-4.2h.9c.7 0 1.3-.5 1.5-1.2.1-.6-.2-1-.8-1h-.8l-.8 2.2zm-2.8 4.2h-1.5l1.4-6.9h1.5l-1.4 6.9z" />
      </svg>
    );
  }

  // 6. MySQL / Relational Database
  if (normalized.includes('mysql') || normalized.includes('database') || normalized.includes('sql')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || '#38BDF8'} aria-hidden="true">
        <path d="M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 2.5c4.69 0 8 1.56 8 2s-3.31 2-8 2-8-1.56-8-2 3.31-2 8-2zm8 13c0 .44-3.31 2-8 2s-8-1.56-8-2v-2.25c2.09 1.18 5.09 1.75 8 1.75s5.91-.57 8-1.75V17.5zm0-4.25c0 .44-3.31 2-8 2s-8-1.56-8-2v-2.25c2.09 1.18 5.09 1.75 8 1.75s5.91-.57 8-1.75v2.25z" />
      </svg>
    );
  }

  // 7. Tailwind CSS
  if (normalized.includes('tailwind')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || '#38BDF8'} aria-hidden="true">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    );
  }

  // 8. Alpine.js
  if (normalized.includes('alpine')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || '#2DD4BF'} aria-hidden="true">
        <path d="m23.12 10.45-6.52 6.53L12 12.37l4.6-4.61 6.52 2.69zm-13.04 0L14.7 15l-4.62 4.62L.88 10.45l6.52-6.53 4.6 4.61-1.92 1.92z" />
      </svg>
    );
  }

  // 9. HTML5
  if (normalized.includes('html')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || '#F97316'} aria-hidden="true">
        <path d="m3 2 1.8 18.2L12 22l7.2-1.8L21 2H3zm14.8 5.5H8.2l.2 2.5h9l-.6 6.8-4.8 1.4-4.8-1.4-.3-3.6h2.4l.2 1.9 2.5.7 2.5-.7.3-3H6l-.7-7.8h12.8l-.3 2.5z" />
      </svg>
    );
  }

  // 10. Git
  if (normalized === 'git' || normalized.includes('version control')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || '#F43F5E'} aria-hidden="true">
        <path d="M21.6 10.9 13.1 2.4c-.6-.6-1.5-.6-2.1 0l-2 2 2.6 2.6c.6-.2 1.3 0 1.8.5.5.5.6 1.2.5 1.8l2.5 2.5c.6-.2 1.3 0 1.8.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.6-.6-.7-1.4-.4-2.1L12.5 10v4.8c.4.3.7.8.7 1.4 0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8c0-.6.3-1.1.7-1.4V9.6c-.4-.3-.7-.8-.7-1.4 0-.6.2-1.2.7-1.6L7.4 4 2.4 9c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.6.1-2.2z" />
      </svg>
    );
  }

  // 11. GitLab
  if (normalized.includes('gitlab')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || '#F97316'} aria-hidden="true">
        <path d="m22.65 14.39-8.32-8.32a.75.75 0 0 0-1.06 0L4.95 14.39a.75.75 0 0 0-.05.99l8.32 10.4a.75.75 0 0 0 1.16 0l8.32-10.4a.75.75 0 0 0-.05-.99Z" />
        <path d="m12 .75 2.8 8.62H9.2L12 .75Z" />
      </svg>
    );
  }

  // 12. Linux & Nginx
  if (normalized.includes('linux')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || '#FACC15'} aria-hidden="true">
        <path d="M12 2C9.5 2 8 3.8 8 6.5v4c0 1.2-.5 2-1.5 2.5-.5.2-.8.8-.7 1.3.3 1.2 1.4 1.8 2.2 1.4 1.3-.7 2-2 2-3.7V6.5C10 4.8 10.9 4 12 4s2 0.8 2 2.5v5.5c0 1.7.7 3 2 3.7.8.4 1.9-.2 2.2-1.4.1-.5-.2-1.1-.7-1.3-1-.5-1.5-1.3-1.5-2.5v-4C16 3.8 14.5 2 12 2zm-5 13.5c-1.7 0-3 1.3-3 3 0 1.4 1.8 2.5 4 2.5 1.5 0 2.8-.5 3.5-1.3-1.2-.6-2.2-1.8-2.5-3.2-.7-.6-1.3-1-2-1zm10 0c-.7 0-1.3.4-2 1-.3 1.4-1.3 2.6-2.5 3.2.7.8 2 1.3 3.5 1.3 2.2 0 4-1.1 4-2.5 0-1.7-1.3-3-3-3z" />
      </svg>
    );
  }

  if (normalized.includes('nginx')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || '#10B981'} aria-hidden="true">
        <path d="M12 2 3.5 6.9v10.2L12 22l8.5-4.9V6.9L12 2zm5 13.5-1.5.9-4.5-6.5v5.6h-2V8.5l1.5-.9 4.5 6.5V8.5h2v7z" />
      </svg>
    );
  }

  // 13. Figma
  if (normalized.includes('figma')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || '#A855F7'} aria-hidden="true">
        <path d="M8 2h4v4H8a2 2 0 0 1-2-2c0-1.1.9-2 2-2zm4 4h4a2 2 0 0 1 2 2c0 1.1-.9 2-2 2h-4V6zm0 4h4a2 2 0 0 1 2 2c0 1.1-.9 2-2 2h-4v-4zm-4 0h4v4H8a2 2 0 0 1-2-2c0-1.1.9-2 2-2zm0 4h4v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4z" />
      </svg>
    );
  }

  // 14. RESTful API / API Endpoints
  if (normalized.includes('api') || normalized.includes('endpoint')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color || '#10B981'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="8" x="2" y="2" rx="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
        <path d="M13 6h5" />
        <path d="M13 18h5" />
      </svg>
    );
  }

  // 15. Spatie RBAC & Security
  if (normalized.includes('shield') || normalized.includes('rbac') || normalized.includes('security') || normalized.includes('auth')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color || '#EAB308'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  // 16. Antigravity CLI & Statuslines
  if (normalized.includes('terminal') || normalized.includes('cli') || normalized.includes('statusline')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color || '#00F0FF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" x2="20" y1="19" y2="19" />
      </svg>
    );
  }

  // 17. Autonomous AI Agents / CPU
  if (normalized.includes('agent') || normalized.includes('cpu') || normalized.includes('ai')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color || '#FF007F'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="16" height="16" x="4" y="4" rx="2" />
        <rect width="6" height="6" x="9" y="9" rx="1" />
        <path d="M9 1v3" />
        <path d="M15 1v3" />
        <path d="M9 20v3" />
        <path d="M15 20v3" />
        <path d="M20 9h3" />
        <path d="M20 15h3" />
        <path d="M1 9h3" />
        <path d="M1 15h3" />
      </svg>
    );
  }

  // 18. Knowledge Graphs (Graphify)
  if (normalized.includes('graph') || normalized.includes('network')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color || '#FFE600'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="8.5" x2="15.5" y1="7.5" y2="16.5" />
        <line x1="9" x2="15" y1="6" y2="6" />
        <line x1="6" x2="6" y1="9" y2="15" />
        <line x1="18" x2="18" y1="9" y2="15" />
      </svg>
    );
  }

  // 19. Clean Code & Refactoring
  if (normalized.includes('code') || normalized.includes('refactor') || normalized.includes('clean')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color || '#00FF9D'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" x2="10" y1="4" y2="20" />
      </svg>
    );
  }

  // Fallback generic code icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color || '#94A3B8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
};
