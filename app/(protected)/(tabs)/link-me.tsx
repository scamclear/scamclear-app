import { Alert, AlertText } from "@/components/ui/alert";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  Bell,
  ChevronRightIcon,
  Flag,
  UserPlus,
  UserSearch,
} from "lucide-react-native";
import { SafeAreaView, SectionList } from "react-native";

const DATA = [
  {
    title: "A",
    data: ["A Business 1", "A Business 2", "A Business 3"],
  },
  {
    title: "B",
    data: ["B Business 1", "B Business 2", "B Business 3", "B Business 4"],
  },
  {
    title: "D",
    data: ["D Business 1"],
  },
  {
    title: "G",
    data: ["G Business 1"],
  },
];

export default function LinkMe() {
  return (
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
    //   headerImage={
    //     <IconSymbol
    //       size={310}
    //       color="#808080"
    //       name="chevron.left.forwardslash.chevron.right"
    //       style={styles.headerImage}
    //     />
    //   }>
    // <>
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">Link</ThemedText>
    //   </ThemedView>
    //   <ThemedText>This app includes example code to help you get started.</ThemedText>
    // </>
    <SafeAreaView className="flex justify-between flex-col h-full">
      <VStack className="w-full  p-4 flex-none">
        <Heading size="3xl" className="mb-6">
          Link Me
        </Heading>
        {/* <Text className="mb-6">
          Please provide your business details. This information is required to
          verify your business identity.
        </Text> */}

        <HStack space="md" className="mb-4">
          <Box className="h-20 w-1/2 bg-primary-400 rounded-lg p-4">
            <UserSearch className=" stroke-[#100808]" />
            <Text className="text-typography-0">Existing links</Text>
          </Box>
          <Box className="h-20 w-1/2 bg-primary-300 rounded-lg p-4">
            <UserPlus className=" stroke-[#100808]" />
            <Text className="text-typography-0">Add link</Text>
          </Box>
        </HStack>

        <HStack space="md" className="mb-0">
          <Box className="h-20 w-1/2 bg-primary-300 rounded-lg p-4">
            <Bell className=" stroke-[#100808]" />
            <Text className="text-typography-0">Notifications</Text>
          </Box>
          <Box className="h-20 w-1/2 bg-primary-400 rounded-lg p-4">
            <Flag className=" stroke-[#100808]" />
            <Text className="text-typography-0">Warnings</Text>
          </Box>
        </HStack>
      </VStack>
      <VStack className="w-full flex-1  p-4">
        {/* <Card size="md" variant="elevated" className="mb-6"> */}
        {/* <Heading size="md" className="mb-1">
        Quick Start
      </Heading>
      <Text size="sm">Start building your next project in minutes</Text> */}
        <SectionList
          
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            // <HStack className="mb-2">
            //   <Text>{item}</Text>
            // </HStack>
            <HStack
              space="2xl"
              className="justify-between items-center w-full flex-1 py-3 px-2"
            >
              <HStack className="items-center" space="md">
                <Text size="lg" className="pl-2">
                  {item}
                </Text>
              </HStack>
              <HStack>
                <ChevronRightIcon className="color-white" />
              </HStack>
            </HStack>
          )}
          renderSectionHeader={({ section: { title } }) => (
            // <Text>{title}</Text>

            <HStack className="items-center w-full bg-gray-900" space="sm">
              <Text size="xl" className="pl-4">
                {title}
              </Text>
            </HStack>
          )}
        />
      </VStack>
      <VStack className="w-full p-4 flex-none mb-14">
        {/* </Card> */}
        <Alert action="info" variant="outline" className="pr-0">
          {/* <AlertIcon as={CircleAlert} /> */}
          <AlertText>
            The free plan enables you to have 10 links. Switch to tier 1 plan to
            have unlimited links.
          </AlertText>
        </Alert>
        <Button className="mt-4">
          <ButtonText className="text-typography-0">
            Upgrade to tier 1
          </ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
    // </ParallaxScrollView>
  );
}
