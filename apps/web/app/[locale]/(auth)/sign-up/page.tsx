import { getDictionary } from '@foodify/internationalization';


type SignUpProps = {
    params: Promise<{
        locale: string;
    }>;
};



const SignUp = async ({ params }: SignUpProps) => {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

    return (
        <>
            <h1>Sign Up</h1>
        </>
    );
};

export default SignUp;
