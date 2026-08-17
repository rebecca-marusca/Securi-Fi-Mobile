import { colors } from "@/theme/colors";
import { SymbolView } from "expo-symbols";
import type { ComponentProps } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SettingsRowProps = {
  icon: ComponentProps<typeof SymbolView>["name"];
  label: string;
  onPress: () => void;
  showChevron?: boolean;
};

export function SettingsRow({
  icon,
  label,
  onPress,
  showChevron = true,
}: SettingsRowProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.iconSquare}>
        <SymbolView name={icon} size={25} tintColor={colors.accent} />
      </View>
      <Text style={styles.label}>{label}</Text>
      {showChevron && (
        <SymbolView
          name="chevron.right"
          size={15}
          tintColor={colors.darkGreen}
          weight="bold"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    width: 325,
    height: 60,
    borderRadius: 10,
    paddingVertical: 1,
    paddingHorizontal: 15,
    paddingLeft: 8,
    marginBottom: 12,
  },
  iconSquare: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.base,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontFamily: "SF-Pro-Text-Semibold",
    fontSize: 18,
    color: colors.text,
  },
});
