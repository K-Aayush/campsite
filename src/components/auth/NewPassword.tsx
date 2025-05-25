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
import { NewPasswordSchema } from "../../../schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { FormError } from "./FormError";
// import { FormSuccess } from "./FormSuccess";
// import { resetPassword } from "../../../actions/reset";
// import { useSearchParams } from "next/navigation";
// import { newPassword } from "../../../actions/newPassword";

const NewPassword = () => {
  // const searchParams = useSearchParams();
  // const token = searchParams.get("token");
  // const [success, setSuccess] = useState<string | undefined>("");
  // const [error, setError] = useState<string | undefined>("");
  // const [isPending, setTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { password: "" },
  });

  const handleSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    console.log("values", values);
    // console.log("token", token);
    // if (!token) {
    //   setError("No token available");
    //   return;
    // }
    // setTransition(() => {
    //   newPassword(values, token).then((data) => {
    //     console.log(data);
    //     setError(data?.error);
    //     // Todo to add sucess in here
    //     setSuccess(data?.message);
    //   });
    // });
    console.log("new Passwrod");
  };

  return (
    <CardWrapper
      headerLabel="Type your Passowrd ?"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login?"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input
                      disabled={false}
                      {...field}
                      placeholder="*******"
                      type="password"
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
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPassword;
