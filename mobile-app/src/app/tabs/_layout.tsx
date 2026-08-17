import { View, Pressable, Text, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import type { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs/types";
import { colors } from "@/theme/colors";
import { SymbolView, type SFSymbol } from "expo-symbols";

const TAB_ICONS: Record<string, SFSymbol> = {
  home: "house.badge.wifi.fill",
  timeline: "clock.arrow.trianglehead.counterclockwise.rotate.90",
  profile: "person",
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const color = isFocused ? colors.accent : colors.text;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable key={route.key} onPress={onPress} style={styles.tabItem}>
              <SymbolView name={TAB_ICONS[route.name]} size={28} tintColor={color} />
              <Text style={[styles.label, { color }]}>
                {options.title ?? route.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="timeline" options={{ title: "Timeline" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30,
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    width: 260,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.base,
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  label: {
    fontFamily: "SF-Pro-Text-SemiBold",
    fontSize: 11,
  },
});