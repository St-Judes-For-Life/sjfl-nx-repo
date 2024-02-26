export type BreadCrumbWithLink = { title: string; link: string };
export type BreadCrumbWithoutLink = { title: string };

export type BreadCrumbs = [...BreadCrumbWithLink[], BreadCrumbWithoutLink];
