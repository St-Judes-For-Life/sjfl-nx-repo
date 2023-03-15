import { cva, VariantProps } from 'class-variance-authority';
import { LayoutGroup, motion } from 'framer-motion';
import { FC } from 'react';
import logo from '../../../assets/sjfl_logo.png';

const logoVariations = cva('', {
  variants: {
    size: {
      small: ['h-[10vh]'],
      medium: ['h-[20vh]'],
      large: ['h-[30vh]'],
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export const Logo: FC<VariantProps<typeof logoVariations>> = ({ size }) => {
  return (
    <LayoutGroup id="logo">
      <motion.img
        className={logoVariations({ size })}
        src={logo}
        alt="logo"
        layoutId="logo"
      />
    </LayoutGroup>
  );
};
