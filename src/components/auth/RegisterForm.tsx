"use client";

import React, { useState, useTransition } from "react"; // useTransition, // useState, // useEffect,
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RegisterSchema } from "../../../schemas";
import { register } from "../../../actions/register";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";

const RegisterForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, setTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log("registerForm");
    setTransition(() => {
      register(values).then((data) => {
        console.log(data);
        setSuccess(data.message);
        setError(data.error);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Create a New Card"
      backButtonHref="/auth/login"
      backButtonLabel="Login with your existing account?"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input
                      disabled={false}
                      // disabled={isPending}
                      {...field}
                      placeholder="john doe"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      disabled={false}
                      // disabled={isPending}
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input
                      disabled={false}
                      // disabled={isPending}
                      {...field}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full cursor-pointer bg-primary-color"
          >
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export default RegisterForm;
