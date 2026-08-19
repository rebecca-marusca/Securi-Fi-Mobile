import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import AnimatedWaveHeader from '../../components/AnimatedWaveHeader';
import { SafeAreaView } from "react-native-safe-area-context";
import SecuriFiTextLightGreen from "../../../assets/images/securi-fi-text-lightGreen.png";
import { colors } from "@/theme/colors";
import { useUserProfile } from "@/hooks/useUserProfile";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour > 5 && hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const HomeScreen: React.FC = () => {
  const { profile } = useUserProfile();
  const [ greeting, setGreeting ] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60_000);
    return () => clearInterval(interval);
    }, []);

  return (
    
    <View style={styles.container}>
      <AnimatedWaveHeader/>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.subtitle}>{greeting}, {profile?.displayName}! </Text>
            </View>

            <View style={styles.dashboardCard}>
              <Text style={styles.cardPlaceholderText}>[ Room Map / Controls ]</Text>
            </View>

            <View style={styles.statusPill}>
              <Text style={styles.statusText}>No movement detected</Text>
            </View>

          </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  headerTextContainer: {
    alignItems: 'center',
    marginBottom: 30,
    zIndex: 10,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "SF-Pro-Text-Semibold",
    color: colors.accent,
    marginTop: 70,
  },
  dashboardCard: {
    width: '100%',
    height: 320,
    backgroundColor: colors.bgSecondary2,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPlaceholderText: {
    color: colors.accent,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  statusPill: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: -20,
  },
  statusText: {
    color: colors.base,
    fontFamily: "SF-Pro-Text-Semibold",
    fontSize: 15,
  },
});

export default HomeScreen;