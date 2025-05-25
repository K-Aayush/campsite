"use client";

import React from "react"; // useState, useTransition
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
import { ResetSchema } from "../../../schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { FormError } from "./FormError";
// import { FormSuccess } from "./FormSuccess";
// import { login } from "../../../actions/login";

// import { resetPassword } from "../../../actions/reset";

const ResetForm = () => {
  // const [success, setSuccess] = useState<string | undefined>("");
  // const [error, setError] = useState<string | undefined>("");
  // const [isPending, setTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: { email: "" },
  });

  const handleSubmit = (values: z.infer<typeof ResetSchema>) => {
    // setTransition(() => {
    //   resetPassword(values).then((data) => {
    //     console.log(data);
    //     setError(data?.error);
    //     // Todo to add sucess in here
    //     setSuccess(data?.message);
    //   });
    // });
    console.log("here", values);
  };

  return (
    <CardWrapper
      headerLabel="Forgot your Password ?"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login?"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isPending}
                      disabled={false}
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <FormError message={error} />
          <FormSuccess message={success} /> */}
          <Button type="submit" className="w-full bg-primary-color">
            Send Reset Link
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
