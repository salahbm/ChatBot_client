"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/validation";
import { saveUsers } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserTypes } from "@/types/user";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema> | any) => {
    try {
      // Create a new user
      setIsLoading(true);
      const user: UserTypes = await saveUsers(values);
      if (user) {
        alert(`User successfully created ${user?.username}`);
        router.push("/pages/sign-in");
        setIsLoading(false);
      }
      console.log("User created successfully");
    } catch (error: any) {
      console.error("Error creating user:", error.message);
      setIsLoading(false);
    }
  };
  const onInvalid = (errors: any) => console.error(errors);

  return (
    <main className="flex  md:justify-between flex-col md:flex-row justify-center md:h-full">
      {/* Image */}

      <Image
        width={2000}
        height={2000}
        src="/assets/images/banner/banner.jpg"
        alt="Log In banner"
        className=" md:max-h-full max-h-[450px] object-cover md:w-1/2"
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
              name="email"
              render={({ field }: any) => {
                return (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="mrjoniandco@gmail.com"
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
              {isLoading ? "Creating..." : "Submit"}
            </Button>
          </form>
        </Form>
        <p className=" text-start mt-2 ">
          Don't have account ?{" "}
          <Link href={"./sign-in"} className="text-blue-500 font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
