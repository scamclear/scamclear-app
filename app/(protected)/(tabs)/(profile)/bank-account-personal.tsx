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
import { HStack } from "@/components/ui/hstack";
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
import { VStack } from "@/components/ui/vstack";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "expo-router";
import { CreditCard } from "lucide-react-native";
import React, { useEffect } from "react";

export default function BankAccountPersonal() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Bank Account" });
  }, [navigation]);

  const [date] = React.useState(new Date(Date.now()));
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
      <HStack className="justify-center items-center mb-6">
        <CreditCard color="grey" size={200} strokeWidth={0.25} />
      </HStack>
      <FormControl
        isInvalid={isInvalid}
        size="md"
        // isDisabled={false}
        // isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>BSB</FormControlLabelText>
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

      <FormControl
        isInvalid={isInvalid}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Account number</FormControlLabelText>
        </FormControlLabel>

        <Select>
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Select option" />
            <SelectIcon className="mr-0" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Australia" value="au" />
              <SelectItem label="New Zealand" value="nz" />
            </SelectContent>
          </SelectPortal>
        </Select>
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

      <Button className="w-fit mt-4" onPress={handleSubmit}>
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );
}
