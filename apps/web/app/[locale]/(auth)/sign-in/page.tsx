import { getDictionary } from '@foodify/internationalization';
import { SignIn as SignInPage } from '@/views/auth/sign-in';

type SignInProps = {
  params: Promise<{
    locale: string;
  }>;
};

const SignIn = async ({ params }: SignInProps) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <SignInPage />
  );
};

export default SignIn;
