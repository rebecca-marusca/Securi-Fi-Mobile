import { colors } from "@/theme/colors";
import { Text, View, StyleSheet } from "react-native";
import AnimatedWaveHeader from "@/components/AnimatedWaveHeader"

export default function TimelineScreen() {
  return (
    <View style={styles.container}>
      <AnimatedWaveHeader/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
    alignItems: "center",
  }
});
