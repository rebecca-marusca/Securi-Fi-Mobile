import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import AnimatedWaveHeader from '../../components/AnimatedWaveHeader';
import { SafeAreaView } from "react-native-safe-area-context";
import SecuriFiTextLightGreen from "../../../assets/images/securi-fi-text-lightGreen.png";
import { colors } from "@/theme/colors";
import RoomNodeGraph from '../../components/RoomNodeGraph';
import { LinearGradient } from "expo-linear-gradient";

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

            <RoomNodeGraph
              initialNodes={[
                { id: 'kitchen', name: 'kitchen', x: 0.28, y: 0.45 },
                { id: 'living-room', name: 'living room', x: 0.72, y: 0.28 },
                { id: 'bedroom', name: 'bedroom', x: 0.58, y: 0.75 },
              ]}
            />

            <View style={styles.statusPill}>
              <LinearGradient
                colors={["rgba(5, 33, 2, 0.25)", "transparent"]}
                style={styles.innerShadowGradient}
              />
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
    backgroundColor: 'rgb(64, 144, 79)',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: -3,
  },
  statusText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
    innerShadowGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
});

export default HomeScreen;