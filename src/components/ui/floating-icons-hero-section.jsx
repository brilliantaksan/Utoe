import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { BlurFade } from '@/components/ui/blur-fade';

const Icon = ({ mouseX, mouseY, iconData, index }) => {
  const ref = React.useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
        );

        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2)
          );
          const force = (1 - distance / 150) * 50;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      key={iconData.id}
      style={{
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('absolute', iconData.className)}
    >
      <motion.div
        className="flex h-16 w-16 items-center justify-center rounded-3xl border border-black/5 bg-white/80 p-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md md:h-20 md:w-20"
        animate={{
          y: [0, -8, 0, 8, 0],
          x: [0, 6, 0, -6, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <iconData.icon className="h-8 w-8 text-[#6F8F88] md:h-10 md:w-10" />
      </motion.div>
    </motion.div>
  );
};

const FloatingIconsHero = React.forwardRef(
  ({
    className,
    title,
    subtitle,
    ctaText,
    ctaHref,
    icons,
    showSignIn = true,
    signInText = 'Sign in',
    signInHref = '/sign-in',
    ...props
  }, ref) => {
    const mouseX = React.useRef(0);
    const mouseY = React.useRef(0);

    const handleMouseMove = (event) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    };

    return (
      <section
        ref={ref}
        onMouseMove={handleMouseMove}
        className={cn(
          'relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden bg-[#F4EFE9]',
          className
        )}
        {...props}
      >
        <div className="absolute inset-0">
          <div className="absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-[#F2CC8F]/40 blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-[#8FBFB6]/25 blur-3xl" />
          <div className="absolute left-1/2 top-[20%] h-64 w-64 -translate-x-1/2 rounded-full bg-white/40 blur-2xl" />
        </div>

        <div className="absolute inset-0 h-full w-full">
          {icons.map((iconData, index) => (
            <Icon
              key={iconData.id}
              mouseX={mouseX}
              mouseY={mouseY}
              iconData={iconData}
              index={index}
            />
          ))}
        </div>

        <div className="relative z-10 px-4 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-2 text-sm font-medium text-[#7A7A7A] shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#8FBFB6]" />
            Trust-centered visual hiring for startup teams
          </div>
          <BlurFade delay={0.1}>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-[#3A3A3A] md:text-7xl">
              <span className="bg-gradient-to-b from-[#3A3A3A] to-[#7A7A7A] bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
          </BlurFade>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[#7A7A7A]">{subtitle}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] px-8 py-6 text-base font-semibold text-white shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition hover:shadow-[0_14px_36px_rgba(0,0,0,0.14)]"
            >
              <a href={ctaHref}>{ctaText}</a>
            </Button>
            {showSignIn && (
              <Link
                href={signInHref}
                className="rounded-full border border-black/10 bg-white/80 px-6 py-3 text-sm font-semibold text-[#6F8F88] shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition hover:shadow-[0_14px_36px_rgba(0,0,0,0.14)]"
              >
                {signInText}
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }
);

FloatingIconsHero.displayName = 'FloatingIconsHero';

export { FloatingIconsHero };
