import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function OverlayLayer({
  children,
  onClick,
  className = '',
}: Props) {
  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-black/50 transition-opacity ${className}`}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Escape' && onClick?.()}
      role='presentation'
      aria-hidden
    >
      <div
        className='flex items-center justify-center p-4'
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal
      >
        {children}
      </div>
    </div>
  );
}
