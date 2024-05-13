import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { BreadCrumbs } from '../models/BreadCrumb';
import { Text, cn } from '@sjfl/ui';

type PageProps = { className?: string } & (
  | {
      title: string;
    }
  | {
      breadcrumbs: BreadCrumbs;
    }
);

export const Page = ({ children, ...props }: PropsWithChildren<PageProps>) => {
  const hasTitle = 'title' in props;
  const hasBreadcrumbs = 'breadcrumbs' in props;
  return (
    <section
      className={cn('grid grid-rows-[auto,1fr] gap-4 h-full', props.className)}
    >
      {hasTitle && <Text as="h1">{props.title}</Text>}
      {hasBreadcrumbs && (
        <div className="flex gap-4">
          {props.breadcrumbs.map((crumb, i) => {
            if ('link' in crumb) {
              return (
                <span className="flex gap-4" key={i}>
                  <Link to={crumb.link} className="underline">
                    <Text as="h1">{crumb.title}</Text>
                  </Link>
                  <Text as={'h1'}> {'>'} </Text>
                </span>
              );
            } else {
              return (
                <Text key={i} as="h1">
                  {crumb.title}
                </Text>
              );
            }
          })}
        </div>
      )}
      {children}
    </section>
  );
};
