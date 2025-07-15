import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import * as DocumentPicker from "expo-document-picker";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

// const pdf2md = require('@opendocsg/pdf2md')

import pdf2md from "@opendocsg/pdf2md";

interface Props {
  //   size: number
  url: string | null;
  onUpload: (filePath: string) => void;
}

export default function UploadInvoice({ url, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  //   const invoicesize = { height: size, width: size }

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("invoices")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      //   const result = await ImagePicker.launchImageLibraryAsync({
      //     mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to only images
      //     allowsMultipleSelection: false, // Can only select one image
      //     allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
      //     quality: 1,
      //     exif: false, // We don't want nor need that data.
      //   })

      // const { error } = await supabase.storage.getBucket("invoices");
      // if (error) {
      //   throw error;
      // }

      // data.

      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled upload.");
        return;
      }

      const image = result.assets[0];
      console.log("Got image", image);

      if (!image.uri) {
        throw new Error("No image uri!"); // Realistically, this should never happen, but just in case...
      }

      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      );

      const markdown = await pdf2md(arraybuffer);
      console.log("Markdown content:", markdown);

      // console.log("byteLength", arraybuffer.byteLength);

      // const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "pdf";
      // const path = `${Date.now()}.${fileExt}`;
      // console.log("path", path);

      // const { data, error: uploadError } = await supabase.storage
      //   .from("invoices")
      //   .upload(path, arraybuffer, {
      //     contentType: image.mimeType ?? "application/pdf",
      //   });

      // console.log("uploadError", uploadError);
      // if (uploadError) {
      //   throw uploadError;
      // }
      // console.log("data.path", data.path);

      // onUpload(data.path);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <View>
      {avatarUrl ? (
        // <Image
        //   source={{ uri: avatarUrl }}
        //   accessibilityLabel="Avatar"
        //   style={[styles.avatar, styles.image]}
        // />
        <Text>{avatarUrl}</Text>
      ) : (
        <View style={[styles.avatar, styles.noImage]} />
      )}
      <View>
        <Button
          title={uploading ? "Uploading ..." : "Upload"}
          onPress={uploadAvatar}
          disabled={uploading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 5,
  },
});
