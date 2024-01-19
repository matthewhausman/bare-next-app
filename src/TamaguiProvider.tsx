import { TamaguiProviderProps } from "tamagui";
import { useColorScheme } from "react-native";
import { TamaguiProvider as OGProvider } from "@tamagui/core";
import { PortalProvider } from "@tamagui/portal";
import config from "../tamagui.config";

export const P = ({ children, ...props }: TamaguiProviderProps) => {
  return (
    <OGProvider {...props}>
      <PortalProvider shouldAddRootHost>{children}</PortalProvider>
    </OGProvider>
  );
};

export function TamaguiProvider({
  children,
  ...rest
}: Omit<TamaguiProviderProps, "config">) {
  const scheme = useColorScheme();
  return (
    <P
      config={config}
      disableInjectCSS
      defaultTheme={scheme === "dark" ? "dark" : "light"}
      {...rest}
    >
      {children}
    </P>
  );
}
