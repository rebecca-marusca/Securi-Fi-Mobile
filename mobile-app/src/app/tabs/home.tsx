import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'; // 👈 Added Image component
import AnimatedWaveHeader from '../../components/AnimatedWaveHeader';
import { SafeAreaView } from "react-native-safe-area-context";
import SecuriFiTextLightGreen from "../../../assets/images/securi-fi-text-lightGreen.png";
import { colors } from "@/theme/colors";

const HomeScreen: React.FC = () => {
  return (
    
    <View style={styles.container}>
      <AnimatedWaveHeader />
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerTextContainer}>
              <Image 
                source={SecuriFiTextLightGreen} 
                style={styles.logoImage}
                resizeMode= "cover"
              />
              <Text style={styles.subtitle}>Good afternoon, Natalia!</Text>
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
    backgroundColor: '#EAEFE9',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTextContainer: {
    alignItems: 'center',
    marginBottom: 30,
    zIndex: 10,
  },
  logoImage: {
    width: 220,     // Adjust width as needed
    height: 40,     // Adjust height as needed
    marginBottom: 0
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
    marginTop: 70,
  },
  dashboardCard: {
    width: '100%',
    height: 320,
    backgroundColor: colors.bgSecondary2,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPlaceholderText: {
    color: colors.accent,
    fontWeight: '600',
  },
  statusPill: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: -20,
  },
  statusText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default HomeScreen;