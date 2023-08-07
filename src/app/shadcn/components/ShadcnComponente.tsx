'use client';

import { Button } from '@/components/ui/button';
import React, { useRef, useState } from 'react';
import DxaSingleXBLue from '@/assets/icons/Dxa-x-blue.svg';
import DxaStarRight from '@/assets/icons/dxa_start_bg_right.svg';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IMaskInput, useIMask } from 'react-imask';
import * as Progress from '@radix-ui/react-progress';

const FormSchema = z.object({
  UserName: z.string({
    required_error: 'Esse campo é obrigatório',
  }),
  UserLastName: z.string({
    required_error: 'Esse campo é obrigatório',
  }),
  UserCpf: z.string({
    required_error: 'Esse campo é obrigatório',
  }),
  UserEmail: z
    .string({
      required_error: 'Esse campo é obrigatório',
    })
    .email({
      message: 'Formato inválido de email',
    }),
  UserCelPhone: z.string({
    required_error: 'Esse campo é obrigatório',
  }),
  UserPassword: z
    .object({
      password: z.string(),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ['confirm'], // path of error
    }),
});

export default function ShadcnComponent() {
  const [progress, setProgress] = React.useState(0);
  const [opts, setOpts] = useState({ mask: '000.000.000-00' });

  const {
    ref,
    maskRef,
    value,
    setValue,
    unmaskedValue,
    setUnmaskedValue,
    typedValue,
    setTypedValue,
  } = useIMask(opts /* { onAccept, onComplete } */);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500);
    return () => clearTimeout(timer);
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('%c⧭', 'color: #006dcc', data);
  }

  return (
    <div>
      <div className="w-full h-screen bg-background">
        <div className="h-screen grid md:place-items-center pt-24 md:pt-12 gap-0 pl-5 pr-5">
          <div className="flex flex-col md:flex-row relative">
            <div className="absolute hidden md:block text-center md:text-start -top-24">
              <h2 className="font-roboto text-4xl font-bold text-dark tracking-default">
                Suas informações
                <span className="block text-black text-lg font-roboto font-light tracking-default">
                  Para começar, precisamos que você preencha algumas informações
                  para a realização do cadastro.
                </span>
              </h2>
              <span className="font-roboto hidden md:block text-lg text-dark mt-0 font-extrabold tracking-default">
                Passo 1 de 2
              </span>
            </div>
            <div className="md:w-[500px] lg:w-[720px] xl:w-[820px] h-[620px] bg-[#f4f4f5] md:bg-white">
              {/* barra de progresso dos steps */}
              <Progress.Root
                className="relative overflow-hidden bg-[#f2f2fe] rounded-full w-full h-2"
                style={{
                  transform: 'translateZ(0)',
                }}
                value={progress}
              >
                <Progress.Indicator
                  className="bg-[#01D181] w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                  style={{ transform: `translateX(-${100 - progress}%)` }}
                />
              </Progress.Root>
              <div className="p-5">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <div className="flex items-center gap-4">
                      <FormField
                        control={form.control}
                        name="UserName"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input {...field} className="w-full" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        rules={{ required: false }}
                        name="UserLastName"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Sobrenome</FormLabel>
                            <FormControl>
                              <Input {...field} className="w-full" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-4 mt-5">
                      <FormField
                        control={form.control}
                        name="UserCpf"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>CPF</FormLabel>
                            <FormControl>
                              {/* @ts-ignore - criar componente para tirar esse ts-ignore */}
                              <Input {...field} ref={ref} className="w-full" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="UserEmail"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} className="w-full" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="UserCelPhone"
                      render={({ field }) => (
                        <FormItem className="w-full mt-5">
                          <FormLabel>Celular</FormLabel>
                          <FormControl>
                            <Input {...field} className="w-full" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center gap-4 mt-5">
                      <FormField
                        control={form.control}
                        name="UserPassword.password"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="password"
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="UserPassword.confirm"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Confirmar Senha</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="password"
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-[#01D181] min-w-[220px] mt-12"
                    >
                      Submit
                    </Button>
                  </form>
                </Form>
              </div>
              {/* components*/}
            </div>
            <div className="hidden md:block md:w-[180px] lg:w-[200px] xl:w-[340px] h-[620px] bg-black relative">
              <div className="absolute right-6 top-6">
                <Image src={DxaSingleXBLue} alt="DXA" />
              </div>
              <div className="absolute bottom-6 right-6 w-[160px] md:w-[120px] lg:w-[160px] xl:w-[initial]">
                <Image src={DxaStarRight} alt="DXA-Star" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
