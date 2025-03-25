
import { SafeAreaView, StatusBar, Text, Image, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


import { categoryData } from '../constants';


export default function Loading(props) {
    
    return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator {...props}/>
        </View>
    );
}


