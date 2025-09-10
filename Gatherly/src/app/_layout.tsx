import { Stack } from "expo-router";
import React from "react";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import "./global.css";

const RootLayout = () => {
  return (
    <GluestackUIProvider>
      <Stack />
    </GluestackUIProvider>
  );
};

export default RootLayout;
