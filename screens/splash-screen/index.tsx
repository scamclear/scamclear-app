import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { useColorScheme } from "nativewind";
import { Image, StyleSheet } from "react-native";

import { useRouter } from "@unitools/router";
import { AuthLayout } from "../layout";

const SplashScreenWithLeftBackground = () => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  return (
    <VStack
      className="w-full max-w-[440px] items-center h-full justify-center"
      space="lg"
    >
      {colorScheme === "dark" ? (
        <Image
          style={styles.tinyLogo}
          source={require("@/assets/images/logo-scam-clear.png")}
        />
      ) : (
        <Image
          style={styles.tinyLogo}
          source={require("@/assets/images/logo-scam-clear.png")}
        />
      )}
      <VStack className="w-full" space="lg">
        <Button
          className="w-full"
          onPress={() => {
            router.push("/auth/signin");
          }}
        >
          <ButtonText className="font-medium">Log in</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.push("/auth/signup");
          }}
        >
          <ButtonText className="font-medium">Sign Up</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};

export const SplashScreen = () => {
  return (
    <AuthLayout>
      <SplashScreenWithLeftBackground />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
