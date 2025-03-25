
import {  Text, View ,Image, TouchableOpacity} from 'react-native';
import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { StatusBar } from 'react-native';
import {widthPercentageToDP as wp ,heightPercentageToDP as hp } from "react-native-responsive-screen";
import LottieView from 'lottie-react-native';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const Stack=createNativeStackNavigator();

export default function WelcomeScreen() {
    const animation= useRef(null);
    const navigation=useNavigation();
    
  return (
    <View className="flex-1 justify-center items-center bg-[#f64e32] space-y-10 relative">

     <Image source={require("../../assets/images/background.png")}
     style={{position:"absolute",
        width:wp(100),
        height:hp(100)
     }}
     />
     <StatusBar style="light"/>
     <View>
        <LottieView
        autoPlay 
        ref={animation}
        style={{
            width:wp(70),
            height:hp(50)
        }}
        source={require("../../assets/lottie/food-logo.json")}

        />
     </View>
     <View className="flex items-center space-y-2">
        <Text  className="text-white font-extrabold tracking-widest" style={{fontSize:hp(5)}}>Food Cafe</Text>
        <Text  className="text-white font-medium tracking-widest" style={{fontSize:hp(2.5)}}>Explore Delicious Food</Text>
     </View>
     <View>
        <TouchableOpacity
        style={{
            backgroundColor:"#fff",
            paddingVertical:hp(1.5),
            paddingHorizontal:hp(5),
            borderRadius:hp(1.5)
        }}
      //   onPress={()=> navigation.navigate("Drawer")}
      onPress={() => navigation.reset({
         index: 0,
         routes: [{ name: "Drawer" }],
       })}
        >
            <Text style={{fontWeight:"medium"}}>Get Started </Text>
        </TouchableOpacity>
     </View>
    </View>
  );
}
