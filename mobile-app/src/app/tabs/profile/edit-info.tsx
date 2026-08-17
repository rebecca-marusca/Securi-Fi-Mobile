import { ScreenHeader } from "@/components/ScreenHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { updateUserProfile } from "@/services/userProfile";
import { colors } from "@/theme/colors";
import { getAuth, updateProfile } from "@react-native-firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { uploadProfilePhoto } from "@/services/cloudinary";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function EditInfoScreen() {
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [selectedPhotoUri, setSelectedPhotoUri] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || "");
      setSelectedPhotoUri(profile.photoURL || null);
    }
  }, [profile]);

  const handlePickPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please allow access to your photo library to update your profile picture.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets?.[0]?.uri) {
      return;
    }

    setSelectedPhotoUri(result.assets[0].uri);
  };

  const handleConfirm = async () => {
    if (!user) return;

    setIsConfirming(true);

    try {
      const hasPhotoChanged =
        selectedPhotoUri !== null
          ? selectedPhotoUri !== profile?.photoURL
          : !!profile?.photoURL;

      let nextPhotoURL: string | null = profile?.photoURL ?? null;

      if (selectedPhotoUri) {
        if (selectedPhotoUri !== profile?.photoURL) {
            setIsUploadingPhoto(true);
            nextPhotoURL = await uploadProfilePhoto(selectedPhotoUri);
        }
      } else if (hasPhotoChanged) {
        nextPhotoURL = null;
      }

      const nextDisplayName = displayName.trim();
      await updateUserProfile(user.uid, {
        displayName: nextDisplayName,
        photoURL: nextPhotoURL,
      });

      const auth = getAuth();
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: nextDisplayName || undefined,
          photoURL: nextPhotoURL || null,
        });
      }

      router.back();
    } catch (error) {
      console.error("Profile update failed:", error);
      Alert.alert("Error", "Could not save changes. Please try again.");
    } finally {
      setIsConfirming(false);
      setIsUploadingPhoto(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="Edit info" />

      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={handlePickPhoto} activeOpacity={0.8}>
          <Image
            source={
              selectedPhotoUri
                ? { uri: selectedPhotoUri }
                : require("@/assets/images/pfp-standard.png")
            }
            style={styles.avatar}
          />
          <View style={styles.avatarBadge}>
            <Text style={styles.avatarBadgeText}>+</Text>
          </View>
        </TouchableOpacity>

        {profile?.photoURL || selectedPhotoUri ? (
          <TouchableOpacity
            style={styles.removePhotoButton}
            onPress={() => setSelectedPhotoUri(null)}
          >
            <Text style={styles.removePhotoText}>Remove photo</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <Text style={styles.label}>Display name</Text>
      <TextInput
        style={styles.input}
        value={displayName}
        onChangeText={setDisplayName}
      />

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirm}
        disabled={isConfirming || isUploadingPhoto}
      >
        {isUploadingPhoto ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.confirmButtonText}>
            {isConfirming ? "Saving..." : "Confirm"}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.base, 
    paddingTop: 60 
  },
  content: { paddingHorizontal: 24, paddingBottom: 40 },
  avatarSection: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.textMuted,
    backgroundColor: colors.accent,
  },
  removePhotoButton: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.bgSecondary2,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  removePhotoText: {
    color: colors.textMuted,
    fontFamily: "SF-Pro-Text-Bold",
    fontSize: 13,
  },
  avatarBadge: {
    position: "absolute",
    right: -4,
    bottom: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.textMuted,
  },
  avatarBadgeText: {
    color: colors.base,
    fontFamily: "SF-Pro-Text-Bold",
    fontSize: 20,
    lineHeight: 20,
  },
  label: {
    fontFamily: "SF-Pro-Text-Bold",
    color: colors.text,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.bgSecondary2,
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 15,
    fontFamily: "SF-Pro-Text-Medium",
    fontSize: 15,
    color: colors.textMuted
  },
  confirmButton: {
    backgroundColor: colors.accent,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: 120,
    alignSelf: "center",
    minHeight: 48,
  },
  confirmButtonText: {
    color: colors.base,
    fontFamily: "SF-Pro-Text-Semibold",
    fontSize: 16,
  },
});
