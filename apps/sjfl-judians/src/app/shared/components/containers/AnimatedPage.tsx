import classNames from 'classnames';
import { motion } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';

const pageVariants = {
  initital: {
    opacity: 0,
    x: '100%',
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: '-100%',
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 1,
};

export const AnimatedPage: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  const location = useLocation();
  console.log(location);

  return (
    <motion.div
      key={location.pathname}
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
      className={classNames('min-h-screen bg-lightGray', className)}
    >
      {children}
    </motion.div>
  );
};
