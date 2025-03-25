
import { SafeAreaView, StatusBar, Text, Image, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { categoryData } from '../constants';


export default function Categories({categories, activeCategory, handleChangeCategory }) {
    return (
        <View>
            <ScrollView
                horizontal showsHorizontalScrollIndicator className="space-x-4"
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
            >
                {categories.map((category, index) => {
                    let isActive = category.strCategory == activeCategory;
                    let activeButtonClass = isActive ? "bg-[#f64e32]" : "bg-black/10"
                    return (
                        <TouchableOpacity 
                        onPress={()=>handleChangeCategory(category.strCategory)}
                        key={index} className="flex-1 items-center justify-center space-y-1">
                             <View className={"rounded-xl p-[6px] " + activeButtonClass}>
                            <Image
                                source={{
                                    uri: category.strCategoryThumb,
                                }}
                                style={{
                                    width: hp(8), height: hp(8)
                                }}
                                className="rounded-full"
                            />
                        <Text className="text-center">{category.strCategory}</Text>
                        </View>
                        </TouchableOpacity>
                    )

                })}


            
            </ScrollView>
        </View>
    );
}


