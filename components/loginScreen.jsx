import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { Colors } from '../constants/Colors';
import { useWarmUpBrowser } from '../hooks/useWarmBrowser'; // Corrected import hook name
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const redirectUrl = Linking.createURL("/dashboard", { scheme: "myapp" });
      console.log("Generated Redirect URL:", redirectUrl);

      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({ redirectUrl });
      console.log("OAuth Flow Result:", { createdSessionId, signIn, signUp, setActive });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        console.warn("No session ID created. Handle signIn or signUp for next steps.");
        // Handle signIn or signUp actions accordingly
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startOAuthFlow]);

  return (
    <View>
      <View style={{
        display: "flex",
        marginTop: 100,
        alignItems: 'center'
      }}>
        <Image source={require('../assets/images/login.png')}
          style={{
            width: 250,
            height: 500,
            borderRadius: 20,
            borderWidth: 5,
            borderColor: '#000'
          }}
        />
      </View>
      <View style={{
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -30,
        borderTopColor: '#000',
      }}>
        <Text style={{
          fontFamily: 'Nunito-Italic-VariableFont_wght', // Corrected font family name
          fontSize: 25,
          textAlign: 'center'
        }}>Youth Ultimate
          <Text style={{
            color: Colors.PRIMARY,
            fontFamily: 'Nunito-Italic-VariableFont_wght', // Corrected font family name
            fontSize: 35,
            fontWeight: 'bold'
          }}>Community Business Directory</Text> App
        </Text>
        <Text style={{
          fontSize: 15,
          fontFamily: 'Nunito-Italic-VariableFont_wght', // Corrected font family name
          textAlign: 'center',
          marginVertical: 15,
          color: Colors.GRAY
        }}>
          Find your favourite business near you and post your business to your community
        </Text>
        <TouchableOpacity style={{
          backgroundColor: Colors.PRIMARY,
          borderRadius: 99,
          padding: 20,
          marginTop: 20
        }} onPress={onPress}>
          <Text style={{
            fontSize: 20,
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'Nunito-Italic-VariableFont_wght' // Corrected font family name
          }}>Let's get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
