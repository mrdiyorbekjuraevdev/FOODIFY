import { getDictionary } from '@repo/internationalization';


type SignInProps = {
  params: Promise<{
    locale: string;
  }>;
};



const SignIn = async ({ params }: SignInProps) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <>
      <h1>Sign In</h1>
    </>
  );
};

export default SignIn;
