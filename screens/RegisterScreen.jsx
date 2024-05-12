import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import AppTextInput from "../components/AppTextInput";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../config/COLORS";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [societyId, setSocietyId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cin, setCin] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://192.168.1.11:3003/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          societyId: societyId,
          name: name,
          email: email,
          password: password,
          Cin: Cin,
        }),
      });

      const data = await response.json();
      console.log(data);

      navigation.navigate("LogIn");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color:COLORS.hey,
              fontFamily: Font["poppins-bold"],
              marginVertical: Spacing * 2,
            }}
          >
            Create account
          </Text>
          <Text
            style={{
              fontFamily: Font["poppins-regular"],
              fontSize: FontSize.small,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            Join TaskUnity !!
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 2,
          }}
        >
          <AppTextInput
            placeholder="Society Identifier"
            value={societyId}
            onChangeText={setSocietyId}
            icon="building" // Example icon name

          />
          <AppTextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            icon="user" // Example icon name

          />
          <AppTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            icon="envelope" // Example icon name
            

          />
          <AppTextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            icon="lock" // Example icon name

          />
          <AppTextInput
            placeholder="Identity Card"
            value={Cin}
            onChangeText={setCin}
            icon="id-card" // Example icon name

          />
        </View>

        <TouchableOpacity
          onPress={handleSignUp}
          style={{
            padding: Spacing * 2,
            backgroundColor: COLORS.hey,
            marginVertical: Spacing * 2,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("LogIn")}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
