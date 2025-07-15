// import { Dashboard } from "@/screens/dashboard/dashboard-layout";
// export default Dashboard;

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { StyleSheet, View } from "react-native";
// import { View } from "@/components/ui/view";
import { VStack } from "@/components/ui/vstack";
import UploadInvoice from "@/components/UploadInvoice";
import * as DocumentPicker from "expo-document-picker";
import { UploadCloud } from "lucide-react-native";
import React, { useState } from "react";
import Tesseract from "tesseract.js";

export default function Dashboard() {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const [, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleClose = () => setShowActionsheet(false);

  const pickInvoice = async () => {
    try {
      setUploading(true);
      console.log("Picking invoice...");
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });

      console.log(docRes);
      if (docRes.assets && docRes.assets.length > 0) {
        console.log("Selected file:", docRes.assets[0].uri);
        extractText(docRes.assets[0].uri);
      } else {
        console.log("No assets found in document picker response.");
      }
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };

  const extractText = async (uri: string) => {
    console.log("Extracting text from:", uri);
    setUploading(true);
    // convert the file to a blob
    const response = await fetch(uri);
    const blob = await response.blob(); 
    console.log("Blob created from file:", blob);


    // Use Tesseract.js to recognize text from the image
    const result = await Tesseract.recognize(blob, "eng");
    // setExtractedText(result.data.text);
    console.log(`Extracted text: ${result.data.text}, jobid: ${result.jobId} `);
    setUploading(false);
    setShowActionsheet(false);
    // Handle the extracted text as needed
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Icon
          as={UploadCloud}
          className="h-[178px] w-[290px] bottom-0 left-0 absolute"
          color="background-200"
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Dashboard</ThemedText>
        <View style={styles.container}>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button onPress={() => setShowActionsheet(true)}>
              <ButtonText>Open</ButtonText>
            </Button>
            <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
              <ActionsheetBackdrop />
              <ActionsheetContent className="px-5">
                <ActionsheetDragIndicatorWrapper>
                  <ActionsheetDragIndicator />
                </ActionsheetDragIndicatorWrapper>
                <HStack className="justify-between w-full mt-3">
                  <VStack>
                    <Heading size="md" className="font-semibold">
                      Upload your invoice for verification
                    </Heading>
                    <Text size="sm">JPG, PDF, PNG supported</Text>
                  </VStack>
                  <Pressable onPress={handleClose}>
                    <Icon
                      as={CloseIcon}
                      size="lg"
                      className="stroke-background-500"
                    />
                  </Pressable>
                </HStack>
                {/* <Box className="my-[18px] items-center justify-center rounded-xl bg-background-50 border border-dashed border-outline-300 h-[130px] w-full">
                  <Icon
                    as={UploadCloud}
                    className="h-[62px] w-[62px] stroke-background-200"
                  />
                  <Text size="sm">No files uploaded yet</Text>
                </Box> */}
                <ButtonGroup className="w-full">
                  <UploadInvoice
                    url={avatarUrl}
                    onUpload={(url: string) => {
                      setAvatarUrl(url);
                      //   updateProfile({ username, website, avatar_url: url })
                    }}
                  />
                  <Button
                    className="w-full"
                    variant="solid"
                    // isDisabled
                    action="primary"
                    onPress={pickInvoice}
                  >
                    <ButtonText>Uploadaaa</ButtonText>
                  </Button> 
                  {/* <Button className="w-full" onPress={pickInvoice}>
                    <ButtonText>Browse files</ButtonText>
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    isDisabled
                    action="secondary"
                  >
                    <ButtonText>Upload</ButtonText>
                  </Button> */}
                </ButtonGroup>
              </ActionsheetContent>
            </Actionsheet>
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
