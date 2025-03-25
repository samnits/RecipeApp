import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import this
import axios from "axios";
import { ArrowLeftIcon, HeartIcon} from "react-native-heroicons/solid"; // Import the back arrow icon
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function RecipeDetailsScreen({ route }) {
  const { idMeal } = route.params; // Get meal ID from navigation params
  const [mealDetails, setMealDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Use navigation hook
  const [color,setColor]=useState("white");
  useEffect(()=>{
    const loadfavoriteState=async ()=>{
      try {
        const favoriteState=await AsyncStorage.getItem(`favorite-${idMeal}`);
        if(favoriteState){
          setColor(favoriteState);
        }
      } catch (error) {
        console.error("eror loading ");
        
      }
    }
    loadfavoriteState();
   },[idMeal])


  useEffect(() => {

    const fetchMealDetails = async () => {
      try {
        // Use the lookup endpoint to fetch meal details
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );
        setMealDetails(response.data.meals[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meal details:", error);
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [idMeal]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  }

  if (!mealDetails) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg text-center">
          Failed to load recipe details. Please try again.
        </Text>
      </View>
    );
  }

  const {
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strYoutube,
    ...ingredients
  } = mealDetails;

  // Extract ingredients and measurements
  const ingredientList = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = ingredients[`strIngredient${i}`];
    const measure = ingredients[`strMeasure${i}`];

    if (ingredient) {
      ingredientList.push(`${measure || ""} ${ingredient}`.trim());
    }
  }
  const toggleColor=async()=>{
    const newColor=color === "white"?"red":"white";
    setColor(newColor);
    try {
      await AsyncStorage.setItem(`favorite-${idMeal}`,newColor)
      
      
    } catch (error) {
      console.error("error  in saving ");
      
    }
  }




  return (
    <ScrollView className="bg-white p-4">
      {/* Back button over the image */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-4 left-4 z-10">
        <ArrowLeftIcon size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity  onPress={toggleColor} className="absolute top-5 right-4 z-20">
      <Icon name="heart" size={42} color={color} />
      </TouchableOpacity>
      <Image source={{ uri: strMealThumb }} className="w-full h-80 rounded-lg mb-4" />
      <Text className="text-2xl font-bold mb-2">{strMeal}</Text>
      <Text className="text-lg text-gray-600 mb-2">Category: {strCategory}</Text>
      <Text className="text-lg text-gray-600 mb-2">Cuisine: {strArea}</Text>
      <Text className="text-xl font-bold mt-4 mb-2">Ingredients:</Text>
      {ingredientList.map((item, index) => (
        <Text key={index} className="text-base mb-1">
          • {item}
        </Text>
      ))}
      <Text className="text-xl font-bold mt-4 mb-2">Instructions:</Text>
      <Text className="text-base leading-6 mb-4">{strInstructions}</Text>
    </ScrollView>
  );
}
