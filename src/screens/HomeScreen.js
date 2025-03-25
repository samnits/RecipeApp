
import { SafeAreaView, StatusBar, Text, Image, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

import {
  Bars3Icon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon
} from "react-native-heroicons/outline"
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Categories from '../components/Categories';
import axios from "axios";
import Recipe from '../components/Recipe';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef")
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])
  const [allMeals, setAllMeals] = useState([])
  const [allCategoryMeals, setAllCategoryMeals]=useState([])
  
  const navigation = useNavigation();


const fetchAllMeals= async ()=>{
 
  try{
    // step :1 
    const categoryResponse= await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const categories= categoryResponse.data.categories.map((item)=>item.strCategory);
    let combinedMeals=[];
    // console.log(categories);
   for(category of categories){
    
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    const meals=response.data.meals.map((meal)=>({
      ...meal,category
    }))
    combinedMeals=combinedMeals.concat(meals);
    
    setAllCategoryMeals(combinedMeals);

   }
  } catch (error){
    console.error("Error fetching meals:", error.message);
  }
}












  useEffect(() => {
    getCategories();
    getRecipes();
    fetchAllMeals();
  }, [])

  const handleChangeCategory = (category) => {
    setMeals([]);
    getRecipes(category);
    setActiveCategory(category);
  }

  const getCategories = async () => {
    try {
      const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
      if (response && response.data) {
        setCategories(response.data.categories)
      }
    } catch (error) {
      console.log(error.message);

    }
  }

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      if (response && response.data) {
        setMeals(response.data.meals)
        setAllMeals(response.data.meals)
      }
    } catch (error) {
      console.log(error.message);

    }

  }


  return (
    <View className="flex-1 bg-white">
      <StatusBar />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50
          }}
          className="space-y-6 pt-14"
        >
          {/* Naviagtion */}

          <View className="mx-4 flex-row justify-between items-center">
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Bars3Icon color="black" size={30} />
            </TouchableOpacity>

            <Image source={require("../../assets/images/avatar.png")}
              style={{
                width: hp(5), height: hp(5), resizeMode: "cover"
              }}
              className="rounded-full"
            />
          </View>


          {/* // headinig */}

          <View className=" mb-5 mx-4 space-y-1">
            <View >
              <Text className="font-bold text-xl">Fast And Delicious</Text>
            </View>
            <Text className="font-bold text-2xl">Food You <Text className="text-[#f64e32] font-extrabold">Love</Text>  </Text>

          </View>

          {/* Search-Box */}
          <View className="flex-row mx-4 items-center bg-gray-100 px-2 py-1 rounded-lg space-x-3">
            {/* Icon */}
            <MagnifyingGlassIcon
              color={"black"}
              size={hp(2.5)}
              strokeWidth={2} // Adjust stroke width for better visibility

            />
            {/* Text Input */}
            <TextInput
              placeholder="Search Your Favorite Food"
              placeholderTextColor={"gray"}
              style={{ flex: 1, fontSize: 16 }}
              className="tracking-widest"
              onChangeText={(text)=>{
               let info= allCategoryMeals.filter((item)=>item.strMeal.toLowerCase().includes(text.toLowerCase()))
              //  console.log(text);
              //  console.log(info);
               setMeals(info)
                
              }}
            />
          </View>

          {/* Categories  */}
          <View>
            {
              categories.length > 0 && <Categories
                categories={categories}
                activeCategory={activeCategory}
                handleChangeCategory={handleChangeCategory}

              ></Categories>
            }

          </View>

          {/* Recipe list  */}
          <Recipe meals={meals} categories={categories}></Recipe>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}


