import React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const textVariants = cva('', {
  variants: {
    as: {
      p: '',
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tigh',
    },
  },
  defaultVariants: {
    as: 'p',
  },
});

type TextElement = HTMLParagraphElement | HTMLHeadingElement;

export const Text = React.forwardRef<
  TextElement,
  React.HTMLAttributes<TextElement> & VariantProps<typeof textVariants>
>((props, ref) => {
  const Component = props.as || 'p';
  return (
    <Component
      ref={ref}
      className={cn(textVariants({ as: props.as }), props.className)}
    >
      {props.children}
    </Component>
  );
});
Text.displayName = 'Text';
