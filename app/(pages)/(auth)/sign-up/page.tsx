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
import { useToast } from '@/components/ui/use-toast';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchemaSignUp>>({
    resolver: zodResolver(formSchemaSignUp),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchemaSignUp> | any) => {
    try {
      setIsLoading(true);
      const valuesToSend = {
        email: values.email,
        password: values.password,
      };
      const response = await fetch(`/api/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valuesToSend),
      });

      if (response.ok) {
        const data = await response.json();

        // Handle successful response
        setIsLoading(false);
        toast({
          title: 'Account created!',
        });
        if (data) {
          router.push('/sign-in');
        }
      } else {
        console.error('API error:', response.status);
        toast({
          variant: 'destructive',
          title: 'API error:',
          description: response.status,
        });
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        variant: 'destructive',
        title: 'Error in Creating Account',
        description: error.message,
      });
    } finally {
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
              name="email"
              render={({ field }: any) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="chatbot@gmail.com"
                        type="email"
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
          <Link href={'./sign-in'} className="text-amber-500 font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
