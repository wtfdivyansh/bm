"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { CreateBookmarkSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useState } from "react";
import { CheckCircle, CheckIcon, Loader2, X, XCircle } from "lucide-react";
import MultipleTags from "../multiple-tags";
import { isValidUrl } from "@/lib/utils";
import { createBookmark } from "@/actions/bookmark";

export const CreateBookmark = () => {
  const [isloading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof CreateBookmarkSchema>>({
    resolver: zodResolver(CreateBookmarkSchema),
    defaultValues: {
      url: "",
      tags: []
    },
    mode: "onSubmit",
  });
  const onSubmit = async (data: z.infer<typeof CreateBookmarkSchema>) => {
    try {
     setIsLoading(true);
     const bookmark = await createBookmark(data);
     console.log(bookmark);

    }catch(error){
      console.log(error);
    }finally{
        setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className=" gap-2 flex flex-col">
                      <Label className="text-neutral-300 font-mono ">URL</Label>
                      <div className="flex flex-row space-x-2">
                        <Input
                          type="url"
                          className="rounded-none bg-neutral-900/60"
                          placeholder="https://example.com"
                          required
                          {...field}
                        />

                        <div className="flex flex-row w-fit border border-neutral-700/[0.4] bg-neutral-900/80 rounded-none p-1 text-xs">
                          <div>
                            {isValidUrl(field.value) && field.value.trim() ? (
                              <CheckIcon className="text-green-500 p-1" />
                            ) : (
                              <X className="text-red-500 size-6 p-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultipleTags
                      value={field.value ?? []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-2 w-1/2">
              <Button
                type="submit"
                className="w-full rounded-none font-mono disabled:text-neutral-500"
                disabled={isloading}
              >
                {isloading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
              <Button
                type="button"
                className="w-full rounded-none font-mono text-neutral-100 disabled:text-neutral-500 bg-neutral-900/60 hover:bg-neutral-900/50 hover:text-neutral-300"
                disabled={isloading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
