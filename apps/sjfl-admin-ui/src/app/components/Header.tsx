import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@sjfl/ui';
import { LinkItem } from './LinkItem';
import { useAuth } from '../modules/auth/hooks/useAuth';

const userSearchSchema = z.object({
  name: z.string().min(1),
});

type UserForm = z.infer<typeof userSearchSchema>;

export const Header = () => {
  const { register } = useForm<UserForm>({
    resolver: zodResolver(userSearchSchema),
  });

  const { logOut } = useAuth();

  const handleLogout = () => {
    logOut();
  };

  return (
    <header className="p-3 pr-8">
      <nav className="flex gap-8 items-center">
        <Link to={'/'}>
          <img className="h-20" src="/logo.png" alt="sjfl logo" />
        </Link>

        <div className="flex gap-5 justify-center items-center">
          <LinkItem to="/">Overview</LinkItem>
          <LinkItem to="/aid">Aid</LinkItem>
          <LinkItem to="/counselling">Counselling</LinkItem>
          <LinkItem to="/judians">Judians</LinkItem>
          <LinkItem to="/settings">Settings</LinkItem>
        </div>

        <div className="flex gap-4 justify-center items-center ml-auto">
          <form>
            <Input
              {...register('name')}
              type="search"
              placeholder="Search"
              className="w-full"
            />
          </form>
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
