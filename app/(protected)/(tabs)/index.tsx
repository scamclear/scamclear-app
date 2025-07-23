import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native";

import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";

export default function HomeScreen() {
  const [, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/logo-scam-clear.png')}
    //       style={styles.reactLogo}
    //     />
    //   }>
    // <ThemedView style={styles.titleContainer}>
    //   <ThemedText type="title">Welcome</ThemedText>
    //     {/* {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />} */}
    // </ThemedView>

    // {/* </ParallaxScrollView> */}
    <SafeAreaView>
      <HStack className="w-full p-4 items-center">
        <Image
          source={require("@/assets/images/logo-scam-clear.png")}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
          alt="ScamClear Logo"
        />  
        <Heading size="3xl" >
          ScamClear
        </Heading>
      </HStack>
      <VStack className="w-full p-4 ">
        {/* <Heading size="3xl" className="mb-6">
          ScamClear
        </Heading> */}
        <Text className="mb-6">
          ScamClear providers the seller with a tool that ringfences the
          transaction excluding the scammer. It prevents the scammer from
          hijacking the true seller identity in the transaction.
        </Text>
        <Heading size="2xl" className="mb-6">
          Seller
        </Heading>
        <Text className="mb-6">
          By owning their own identity that is kept up to date and verified the
          seller owns their banking relationship with their customer.
        </Text>
        <Heading size="2xl" className="mb-6">
          Simplicity
        </Heading>
        <Text className="mb-6">
          A simple intuitive tool that is not dependent on integrating or
          coordinating with banking infrastructure
        </Text>
      </VStack>
    </SafeAreaView>
  );
}
