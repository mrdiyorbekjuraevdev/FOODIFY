import React, { useMemo } from 'react'
import { Card } from '@foodify/design-system/components/card';
import { FastField, Field, FieldProps, Formik, Form as FormikForm } from 'formik';
import { Input } from '@foodify/design-system/components/input';
import { EyeClosed, EyeIcon, Phone, UserIcon } from 'lucide-react';
import { z, ZodError } from "zod";
import { FormikErrors } from "formik";
import { Button } from '@foodify/design-system/components/button';
import { Checkbox } from '@foodify/design-system/components/checkbox';
import { ISignInForm } from '@/types/auth/sign-in';
import { useSignInFeature } from '../../features';

const schema = z.object({
    phone: z
        .string()
        .regex(/^\+998\d{9}$/, "Phone number must be in format +998XXXXXXXXX"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
    rememberMe: z
        .boolean()
        .default(false).optional(),
});

const validate = (values: ISignInForm) => {
    const errors: FormikErrors<ISignInForm> = {};

    try {
        schema.parse(values);
        return errors;
    } catch (err) {
        if (err instanceof ZodError) {
            err.errors.forEach((error) => {
                const field = error.path[0] as keyof ISignInForm;
                errors[field] = error.message;
            });
        }
        return errors;
    }
};

export const Form = () => {
    const { onSubmit: { mutateAsync: onSubmit } } = useSignInFeature()
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const initialValues = useMemo<ISignInForm>(() => {
        return {
            phone: "+998882167555",
            password: "SuperSecret123!",
            rememberMe: true,
        };
    }, []);


    return (
        <Card shadow="none" className="dark:bg-transparent">
            <Card
                shadow="none"
                className="w-[450px] dark:bg-transparent flex items-center justify-center m-auto gap-12"
                radius="none"
            >

                {/* HEADER */}
                <div className="w-full">
                    <p className="text-4xl mb-4">HUSH KELIBSIZ 👋</p>
                    <span>
                        Hisobingizga kirish uchun telefon raqamingiz va parolingizni kiriting!
                    </span>
                </div>

                {/* FORM */}
                <div className="w-full flex flex-col gap-4">
                    <Formik initialValues={initialValues} onSubmit={async (values) => {
                        await onSubmit(values);
                    }} validate={validate}>
                        {({ isSubmitting, values, isValid }) => {
                            console.log(values)
                            return (
                                <FormikForm>
                                    <div className='space-y-4'>
                                        <FastField name="phone">
                                            {({ field, meta }: FieldProps) => (
                                                <Input
                                                    size="lg"
                                                    label="Phone number"
                                                    labelPlacement="outside"
                                                    variant="faded"
                                                    placeholder="Enter your phone number"
                                                    endContent={<Phone className='text-zinc-500' />}
                                                    className="w-full"
                                                    radius="sm"
                                                    type="tel"
                                                    {...field}
                                                    isRequired
                                                    isInvalid={Boolean(meta.error)}
                                                    errorMessage={meta.error}
                                                />
                                            )}
                                        </FastField>
                                        <Field name="password">
                                            {({ field, meta }: FieldProps) => (
                                                <Input
                                                    size="lg"
                                                    label="Password"
                                                    labelPlacement="outside"
                                                    variant="faded"
                                                    placeholder="Enter your password"
                                                    endContent={
                                                        <button
                                                            className="focus:outline-none cursor-pointer"
                                                            type="button"
                                                            onClick={toggleVisibility}
                                                            aria-label="toggle password visibility"
                                                        >
                                                            {isVisible ? <EyeClosed className='text-zinc-500' /> : <EyeIcon className='text-zinc-500' />}
                                                        </button>
                                                    }
                                                    type={isVisible ? "text" : "password"}
                                                    className="w-full pt-4"
                                                    radius="sm"
                                                    isRequired
                                                    {...field}
                                                    isInvalid={Boolean(meta.error)}
                                                    errorMessage={meta.error}
                                                />
                                            )}
                                        </Field>
                                        <Field name="rememberMe">
                                            {
                                                ({ field }: FieldProps) => (
                                                    <div className="flex items-center justify-between">
                                                        <Checkbox
                                                            color="default"
                                                            {...field}
                                                        >
                                                            Eslab qolish
                                                        </Checkbox>
                                                        <span className="text-sm font-[600] hover:text-blue-400">
                                                            Parolingizni unutdingizmi?
                                                        </span>
                                                    </div>
                                                )
                                            }
                                        </Field>

                                        <div className="flex items-center justify-center w-full">
                                            <Button
                                                isLoading={isSubmitting}
                                                isDisabled={!values?.phone || !values?.password || !isValid}
                                                color="success"
                                                size="lg"
                                                radius="sm"
                                                type="submit"
                                                className="text-white tracking-wider text-lg mt-6 w-full"
                                            >
                                                {"Kirish"}
                                            </Button></div>
                                    </div>
                                </FormikForm>
                            )

                        }}
                    </Formik>
                </div>

                {/* FOOTER */}
                <p className="">
                    Kirish bilan mumammoga duch kelgan bo'sangiz{" "}
                    <b>+998 (88) 899 99 88</b> raqami yoki{" "}
                    <a href="https://t.me/foodify_supportbot">
                        <b>@foodify_support</b>
                    </a>{" "}
                    telegram orqali biz bilan bog'laning!
                </p>
            </Card>
        </Card>
    )
}
