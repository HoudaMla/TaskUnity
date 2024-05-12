import {SafeAreaView,StyleSheet,Text,TextInput,TouchableOpacity,View,Alert,
} from "react-native";
  import React, { useState } from 'react';
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Font from "../constants/Font";
  import { Ionicons } from "@expo/vector-icons";
  import AppTextInput from "../components/AppTextInput";
  import {useNavigation} from '@react-navigation/native'
  import axios from 'axios';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import COLORS from "../config/COLORS";

  export default function LoginScreen() {
    const navigation = useNavigation();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function handleLogin() {
      console.log(email, password);
      const userData = {
        email: email,
        password: password,
      };
      
      axios.post('http://192.168.1.11:3003/login', userData)
        .then(res => {
          console.log(res.data);
          if (res.data.status === 'ok') {
            const userType = res.data.data.type;
            const userId = res.data.data.id;
            if(userType=='admin'){
              console.log(userId);
              Alert.alert('Logged In Successfully');
              AsyncStorage.setItem('userId', userId.toString());
              navigation.navigate("Home");
            }else if(userType=='responsible'){
              console.log(userId)
              Alert.alert('Logged In Successfully');
              AsyncStorage.setItem('userId', userId.toString());
              navigation.navigate("HomeResp");
            }else {
              console.log(userId)
              Alert.alert('Logged In Successfully');
              AsyncStorage.setItem('userId', userId.toString());
              navigation.navigate("HomeResp");
            }
          } else {
            console.log(userType)
            console.error("Login failed: here", res.data.msg);
            Alert.alert('Login failed', res.data.msg);
          }
        })
        .catch(error => {
          console.error("Error logging in: no here", message);
          Alert.alert('Error', 'An error occurred while logging in');
        });
    }
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
                  style={{fontSize: FontSize.xLarge,               color:COLORS.hey
                    , fontFamily: Font["poppins-bold"], marginVertical: Spacing * 3,}}
                >
                  Login here
                </Text>
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.large,
                    maxWidth: "60%",
                    textAlign: "center",
                  }}
                >
                  Welcome back you've been missed!
                </Text>
              </View>
              <View
                style={{
                  marginVertical: Spacing * 3,
                }}
              >
                 <AppTextInput placeholder="Email"
                  value={email} 
                 onChangeText={setEmail} 
                 icon="envelope" 
                 />
                 <AppTextInput placeholder="Password"
                  secureTextEntry 
                  value={password} 
                  onChangeText={setPassword}
                  icon="lock" 
                  />
       
              </View>
      
              <View>
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.small,
                    color: "#31572c",
                    alignSelf: "flex-end",
                  }}
                >
                  Forgot your password ?
                </Text>
              </View>
      
              <TouchableOpacity
                onPress={handleLogin}
                style={{
                  padding: Spacing * 2,
                  backgroundColor: COLORS.hey,
                  marginVertical: Spacing * 3,
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
                  Sign in
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={{
                  padding: Spacing,
                }}
              >
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    color: "#31572c",
                    textAlign: "center",
                    fontSize: FontSize.small,
                  }}
                >
                  Create new account
                </Text>
              </TouchableOpacity>
      
              <View
                style={{
                  marginVertical: Spacing * 3,
                }}
              >
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    color: "#31572c",
                    textAlign: "center",
                    fontSize: FontSize.small,
                  }}
                >
                  Or continue with
                </Text>
      
                <View
                  style={{
                    marginTop: Spacing,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      padding: Spacing,
                      backgroundColor: Colors.gray,
                      borderRadius: Spacing / 2,
                      marginHorizontal: Spacing,
                    }}
                  >
                    <Ionicons
                      name="logo-google"
                      color={Colors.text}
                      size={Spacing * 2}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      padding: Spacing,
                      backgroundColor: Colors.gray,
                      borderRadius: Spacing / 2,
                      marginHorizontal: Spacing,
                    }}
                  >
                    <Ionicons
                      name="logo-apple"
                      color={Colors.text}
                      size={Spacing * 2}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      padding: Spacing,
                      backgroundColor: Colors.gray,
                      borderRadius: Spacing / 2,
                      marginHorizontal: Spacing,
                    }}
                  >
                    <Ionicons
                      name="logo-facebook"
                      color={Colors.text}
                      size={Spacing * 2}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        );
      };
      
      
      const styles = StyleSheet.create({});
