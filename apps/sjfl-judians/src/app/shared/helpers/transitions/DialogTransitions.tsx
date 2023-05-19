import Slide, { SlideProps } from '@mui/material/Slide';
import { forwardRef, PropsWithChildren } from 'react';

export const SlideUp = forwardRef(
  ({ children, ...props }: PropsWithChildren<SlideProps>, ref) => {
    return (
      <Slide direction="up" ref={ref} {...props}>
        {children}
      </Slide>
    );
  }
);
export const SlideFromRight = forwardRef(
  ({ children, ...props }: PropsWithChildren<SlideProps>, ref) => {
    return (
      <Slide direction="right" ref={ref} {...props}>
        {children}
      </Slide>
    );
  }
);
