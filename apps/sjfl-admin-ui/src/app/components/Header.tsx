import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetContent,
  SheetTrigger,
  useMediaQuery,
} from '@sjfl/ui';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks/useAuth';
import { LinkItem } from './LinkItem';

export const Header = () => {
  const { logOut } = useAuth();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [navSheetOpen, setNavSheetOpen] = useState(false);

  const handleNavigation = () => {
    setNavSheetOpen(false);
  };
  const handleLogout = () => {
    logOut();
  };

  return (
    <header className="p-3 pr-8">
      <nav className="flex gap-8 items-center justify-between">
        {!isDesktop && (
          <Sheet open={navSheetOpen} onOpenChange={setNavSheetOpen}>
            <SheetTrigger asChild>
              <Button variant={'ghost'} className="md:hidden">
                <MenuIcon size={32} />
              </Button>
            </SheetTrigger>
            <SheetContent side={'left'}>
              <div className="flex flex-col gap-5 mt-20">
                <Navigation onNav={handleNavigation} />
              </div>
            </SheetContent>
          </Sheet>
        )}

        <Link to={'/'}>
          <img className="h-20" src="/logo.png" alt="sjfl logo" />
        </Link>

        <div className="gap-5 justify-center items-center hidden md:flex">
          <Navigation />
        </div>

        <div className="flex gap-4 justify-center items-center md:ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

const Navigation = ({ onNav: handleNav }: { onNav?: VoidFunction }) => {
  return (
    <>
      <LinkItem to="/" onClick={handleNav}>
        Overview
      </LinkItem>
      <LinkItem to="/aid" onClick={handleNav}>
        Aid
      </LinkItem>
      <LinkItem to="/counselling" onClick={handleNav}>
        Counselling
      </LinkItem>
      <LinkItem to="/judians" onClick={handleNav}>
        Judians
      </LinkItem>
      <LinkItem to="/settings" onClick={handleNav}>
        Settings
      </LinkItem>
    </>
  );
};
