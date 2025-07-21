import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
     >
      <Stack.Screen name="index"  />
      <Stack.Screen name="passport" />
      <Stack.Screen name="personal-details" />
      <Stack.Screen name="drivers-licence" />
      <Stack.Screen name="bank-account-personal" />
    </Stack>
  );
}
