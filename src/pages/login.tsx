import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { tryit } from 'radash';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { login } from '~/lib/auth';
import { useNavigate } from '~/router';
import { type LoginSchema, loginSchema } from '~/schemas/login';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    const [err, user] = await tryit(login)(data);
    if (err) {
      setError('root', {
        message: (err as Error).message,
      });
    }
    if (user) {
      navigate('/overview');
    }
  };

  return (
    <section className="mt-16 mx-auto max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🎫 {t('login.title')}</CardTitle>
          <CardDescription>{t('login.subtitle')}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('login.email.placeholder')}
                {...register('email')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="***"
                {...register('password')}
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>

      {Object.values(errors).length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          {Object.values(errors).map(error => (
            <AlertDescription key={error.message}>
              • {error.message}
            </AlertDescription>
          ))}
        </Alert>
      )}
    </section>
  );
}
