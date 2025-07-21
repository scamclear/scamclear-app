import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { AlertCircleIcon, ChevronDownIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";

export default function BusinessDetails() {

    const navigation = useNavigation();
  
    useEffect(() => {
      navigation.setOptions({ headerShown: true, title: "Business Details" });
    }, [navigation]);
  


  const [date, setDate] = React.useState(new Date(Date.now()));
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("12345");
  const handleSubmit = () => {
    if (inputValue.length < 6) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };
  return (
    <VStack className="w-full  p-4">
      <Heading size="3xl"  className="mb-6">Business Details</Heading>     
      <Text className="mb-6">
        Please provide your business details. This information is required to
        verify your business identity.
      </Text>
      <FormControl size="md" isRequired={false}>
        <FormControlLabel>
          <FormControlLabelText>Business/Company Number</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
          <InputField
            type="text"
            // placeholder="password"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
        </Input>
        <FormControlHelper>
          {/* <FormControlHelperText>
            Must be atleast 6 characters.
          </FormControlHelperText> */}
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            Atleast 6 characters are required.
          </FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl size="md" isRequired={false}>
        <FormControlLabel>
          <FormControlLabelText>Business/Company Name</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
          <InputField
            type="text"
            // placeholder="password"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
        </Input>
        {/* <FormControlHelper>
          <FormControlHelperText>
            Must be atleast 6 characters.
          </FormControlHelperText>
        </FormControlHelper> */}
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            Atleast 6 characters are required.
          </FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl
        isInvalid={isInvalid}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Expiry Date</FormControlLabelText>
        </FormControlLabel>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          minimumDate={new Date(Date.now())}
          // onChange={onChange}
        />
        <FormControlHelper>
          {/* <FormControlHelperText>
            Must be atleast 6 characters.
          </FormControlHelperText> */}
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>Date required.</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl size="md" isRequired={false}>
        <FormControlLabel>
          <FormControlLabelText>State</FormControlLabelText>
        </FormControlLabel>

        <Select>
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Select option" />
            <SelectIcon className="w-fit mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="New South Wales" value="au" />
              <SelectItem label="Northern Territory" value="nz" />
              <SelectItem label="Queensland" value="au" />
              <SelectItem label="South Australia" value="nz" />
              <SelectItem label="Tasmania" value="nz" />
              <SelectItem label="Victoria" value="au" />
              <SelectItem label="Western Australia" value="nz" />
            </SelectContent>
          </SelectPortal>
        </Select>

        <FormControlHelper>
          {/* <FormControlHelperText>
            Must be atleast 6 characters.
          </FormControlHelperText> */}
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>Date required.</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <Button className="w-fit mt-4" onPress={handleSubmit}>
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );
}
