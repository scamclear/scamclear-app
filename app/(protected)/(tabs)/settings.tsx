import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Image } from "expo-image";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";

export default function SettingsScreen() {
  const [, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [, setWebsite] = useState("");
  const [, setAvatarUrl] = useState("");
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      console.log("Getting profile for user:", session?.user?.id);
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/partial-react-logo.png")} />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Settings</ThemedText>
        <View style={styles.container}>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              variant="outline"
              size="md"
              isDisabled={true}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField value={session?.user?.email} />
            </Input>
          </View>
          <View style={styles.verticallySpaced}>
            <Input
              variant="outline"
              size="md"
              isDisabled={true}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                value={username || ""}
                onChangeText={(text) => setUsername(text)}
              />
            </Input>
          </View>

          <View style={[styles.verticallySpaced, styles.mt20]}>
            {/* <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
          disabled={loading}
        /> */}
          </View>
          <View style={styles.verticallySpaced}>
            {/* <Button title="Sign Out" onPress={() => supabase.auth.signOut()} /> */}

            <Button
              size="md"
              variant="solid"
              action="negative"
              onPress={() => supabase.auth.signOut()}
            >
              <ButtonText>Sign out</ButtonText>
            </Button>
          </View>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
