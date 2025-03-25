
import { SafeAreaView, StatusBar, Text, Image, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import MasonryList from "@react-native-seoul/masonry-list"
import Loading from './Loading';
import RecipeCard from './RecipeCard';


export default function Recipe({categories, meals }) {
    const navigation=useNavigation();
    return (
        <View className="mx-4 space-y-4">
            <Text style={{
                fontSize:hp(2)
            }}
            className="font-semibold text-neutral-600">{meals.length} Recipes</Text>
            <View>
                {
                    categories.length==0 || meals.length==0 ? (
                        <Loading size="large" className="mt-20"/>
                    ):<MasonryList
                     data={meals || []} keyExtractor={(item)=>item.id }
                     numColumns={2}
                     showsVerticalScrollIndicator={false}
                     renderItem={({item, i})=> (<RecipeCard item={item} index={i} navigation={navigation} />)}

                    />
                }
            </View>
            
        </View>
    );
}



