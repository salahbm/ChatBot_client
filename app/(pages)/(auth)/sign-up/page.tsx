'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchemaSignUp } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchemaSignUp>>({
    resolver: zodResolver(formSchemaSignUp),
    defaultValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchemaSignUp> | any) => {
    try {
      // Create a new user
      setIsLoading(true);

      router.push('/pages/sign-in');
      setIsLoading(false);

      console.log('User created successfully');
    } catch (error: any) {
      console.error('Error creating user:', error.message);
      setIsLoading(false);
    }
  };
  const onInvalid = (errors: any) => console.error(errors);

  return (
    <main className="flex  md:justify-between flex-col md:flex-row justify-center h-screen">
      {/* Image */}

      <Image
        width={500}
        height={500}
        src="/assets/images/signUp.svg"
        alt="Log In banner"
        className=" md:max-h-full max-h-[450px] object-cover md:w-1/2 self-center"
      />
      <div className=" flex-center justify-between flex-col p-2 md:w-1/2">
        <Form {...form}>
          <form
            id="signUpForm"
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            className="flex flex-col gap-2 w-full mt-1"
          >
            <h2 className="font-bold pt-5 sm:pt-8 text-amber-500 text-lg font-serif">
              Log In Account
            </h2>
            <p className="text-light-3 small-medium md:base-regular text-neutral-600 text-lg font-serif font-semibold">
              Please Sign in to continue your journey
            </p>
            <FormField
              control={form.control}
              name="username"
              render={({ field }: any) => {
                return (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Wick"
                        type="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }: any) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }: any) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm Password </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="w-full">
              {isLoading ? 'Creating...' : 'Submit'}
            </Button>
          </form>
        </Form>
        <p className=" text-start mt-2 ">
          Don't have account ?{' '}
          <Link href={'./sign-in'} className="text-blue-500 font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
