// shared/ui/Button/Button.tsx
import { cn } from "@/shared/lib/cn";
import {
  forwardRef,
  ButtonHTMLAttributes,
  useState, useCallback,
  useMemo
} from 'react';
import './BaseButton.css';

type TButtonSize = 'sm' | 'md' | 'lg';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: TButtonSize;
  children: React.ReactNode;
}

const sizeVariants: Record<TButtonSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const baseStyles =
  'btn-base inline-flex items-center justify-center font-bold tracking-tight cursor-pointer select-none transition-all disabled:opacity-50 disabled:cursor-not-allowed';

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      size = 'md',
      className,
      children,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onTouchCancel,
      ...props
    },
    ref
  ) => {
    const [isActive, setIsActive] = useState(false);

    // Обработчики мыши
    const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsActive(true);
        onMouseDown?.(e);
      },
      [onMouseDown]
    );

    const handleMouseUp = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsActive(false);
        onMouseUp?.(e);
      },
      [onMouseUp]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsActive(false);
        onMouseLeave?.(e);
      },
      [onMouseLeave]
    );

    // Обработчики тача
    const handleTouchStart = useCallback(
      (e: React.TouchEvent<HTMLButtonElement>) => {
        setIsActive(true);
        onTouchStart?.(e);
      },
      [onTouchStart]
    );

    const handleTouchEnd = useCallback(
      (e: React.TouchEvent<HTMLButtonElement>) => {
        setIsActive(false);
        onTouchEnd?.(e);
      },
      [onTouchEnd]
    );

    const handleTouchCancel = useCallback(
      (e: React.TouchEvent<HTMLButtonElement>) => {
        setIsActive(false);
        onTouchCancel?.(e);
      },
      [onTouchCancel]
    );

    // Мемоизация класса
    const classes = useMemo(
      () => cn(baseStyles, sizeVariants[size], isActive && 'btn-base--active', className),
      [size, isActive, className]
    );

    return (
      <button
        ref={ref}
        className={classes}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';