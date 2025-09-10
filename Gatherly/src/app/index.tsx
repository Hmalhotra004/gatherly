import { Button, ButtonText } from "@/components/ui/button";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
  return (
    <View className="p-4">
      <Text className="text-blue-500">Index</Text>
      <Button
        size={"lg"}
        action="secondary"
      >
        <ButtonText>Heelo</ButtonText>
      </Button>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
