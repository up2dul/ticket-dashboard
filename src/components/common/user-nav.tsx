import { tryit } from 'radash';
import { useTranslation } from 'react-i18next';

import { Avatar, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useLang } from '~/hooks';
import { getUserData, logout } from '~/lib/auth';
import { useNavigate } from '~/router';

export const UserNav = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang, toggleLang } = useLang();
  const user = getUserData();

  const handleLogout = async () => {
    const [err] = await tryit(logout)();
    if (!err) {
      navigate('/login');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.imgUrl} alt={`${user?.name} avatar`} />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => toggleLang()}>
            {lang === 'en'
              ? 'Change to Bahasa Indonesia 🇮🇩'
              : 'Ganti ke Bahasa Inggris 🇬🇧'}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => handleLogout()}>
          {t('navigation.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
