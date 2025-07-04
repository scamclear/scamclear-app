import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Icon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { LinkText } from "@/components/ui/link";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
// import { useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/context/supabase-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "@unitools/link";
import { useRouter } from "@unitools/router";
import { Redirect } from "expo-router";
import { AlertTriangle } from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { z } from "zod";
import { AuthLayout } from "../../layout";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
  // rememberme: z.boolean().optional(),
});

// type LoginSchemaType = z.infer<typeof loginSchema>;

const LoginWithLeftBackground = () => {
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    // reset,
    formState: { errors },
    // form
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      await signIn(data.email, data.password);
      //  setValidated({ emailValid: true, passwordValid: true });
      //   toast.show({
      //     placement: "bottom right",
      //     render: ({ id }) => {
      //       return (
      //         <Toast nativeID={id} variant="solid" action="success">
      //           <ToastTitle>Logged in successfully</ToastTitle>
      //         </Toast>
      //       );
      //     },
      //   });

      return <Redirect href="/(protected)/(tabs)/dashboard" />;
    } catch (error: Error | any) {
      console.error(error.message);
    }
  }

  // const {
  //   control,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<LoginSchemaType>({
  //   resolver: zodResolver(loginSchema),
  // });
  // const toast = useToast();
  const [validated, ] = useState({
    emailValid: true,
    passwordValid: true,
  });

  // const 1111onSubmit = (data: LoginSchemaType) => {
  //   const user = USERS.find((element) => element.email === data.email);
  //   if (user) {
  //     if (user.password !== data.password)
  //       setValidated({ emailValid: true, passwordValid: false });
  //     else {
  //       setValidated({ emailValid: true, passwordValid: true });
  //       toast.show({
  //         placement: "bottom right",
  //         render: ({ id }) => {
  //           return (
  //             <Toast nativeID={id} variant="solid" action="success">
  //               <ToastTitle>Logged in successfully</ToastTitle>
  //             </Toast>
  //           );
  //         },
  //       });
  //       reset();
  //     }
  //   } else {
  //     setValidated({ emailValid: false, passwordValid: true });
  //   }
  // };
  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };
  const router = useRouter();
  return (
    <VStack className="max-w-[440px] w-full" space="md">
      <VStack className="md:items-center" space="md">
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Icon
            as={ArrowLeftIcon}
            className="md:hidden text-background-800"
            size="xl"
          />
        </Pressable>
        <VStack>
          <Heading className="md:text-center" size="3xl">
            Log in
          </Heading>
          <Text>Login to start using Scam Clear</Text>
        </VStack>
      </VStack>
      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl
            isInvalid={!!errors?.email || !validated.emailValid}
            className="w-full"
          >
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="email"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await loginSchema.parseAsync({ email: value });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    placeholder="Enter email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} />
              <FormControlErrorText>
                {errors?.email?.message ||
                  (!validated.emailValid && "Email ID not found")}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          {/* Label Message */}
          <FormControl
            isInvalid={!!errors.password || !validated.passwordValid}
            className="w-full"
          >
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="password"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await loginSchema.parseAsync({ password: value });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                  <InputSlot onPress={handleState} className="pr-3">
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} />
              <FormControlErrorText>
                {errors?.password?.message ||
                  (!validated.passwordValid && "Password was incorrect")}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <HStack className="w-full justify-between ">
            {/* <Controller
              name="rememberme"
              defaultValue={false}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  size="sm"
                  value="Remember me"
                  isChecked={value}
                  onChange={onChange}
                  aria-label="Remember me"
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>Remember me</CheckboxLabel>
                </Checkbox>
              )}
            /> */}
            <Link href="/auth/forgot-password">
              <LinkText className="font-medium text-sm text-primary-700 group-hover/link:text-primary-600">
                Forgot Password?
              </LinkText>
            </Link>
          </HStack>
        </VStack>
        <VStack className="w-full my-7 " space="lg">
          <Button className="w-full" onPress={handleSubmit(onSubmit)}>
            <ButtonText className="font-medium">Log in</ButtonText>
          </Button>
        </VStack>
        <HStack className="self-center" space="sm">
          <Text size="md">Don&#39;t have an account?</Text>
          <Link href="/auth/signup">
            <LinkText
              className="font-medium text-primary-700 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700"
              size="md"
            >
              Sign up
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
};

export const SignIn = () => {
  return (
    <AuthLayout>
      <LoginWithLeftBackground />
    </AuthLayout>
  );
};
