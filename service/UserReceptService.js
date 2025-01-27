import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../interceptor/axiosInterceptor";
import {Alert} from "react-native";

export const updateMood = async (recept) => {
    try {
        const ratingData = {
            userId: recept.userId.id,
            recipeId: recept.recipeId.id,
            rating: recept.rating,
            saved: recept.saved
        };
        await axiosInstance.put(`/userrecipe/${recept.id}`, ratingData);
    } catch (error) {
        Alert.alert('Fout', 'Fout bij het bijwerken van de beoordeling. Controleer uw verbinding.');
    }
};

export const addMood = async (newRecept) => {
    try {
        return await axiosInstance.post(`/userrecipe`, newRecept);
    } catch (error) {
        Alert.alert('Fout', 'Fout bij het bijwerken van de beoordeling/saved status. Controleer uw verbinding.');
    }
};

export const fetchUserReceptenScore = async (receptId) => {
    try {
        const response = await axiosInstance.get(`/userrecipe/recipe/${receptId}`);
        const ratings = response.data;

        if (ratings.length === 0) {
            return 50;
        }

        const totalRatings = ratings.length;
        const perfectPercentage = ratings.filter((rating) => rating.rating === 5).length / totalRatings;
        const goodPercentage = ratings.filter((rating) => rating.rating === 4).length / totalRatings;
        const normalPercentage = ratings.filter((rating) => rating.rating === 3).length / totalRatings;
        const badPercentage = ratings.filter((rating) => rating.rating === 2).length / totalRatings;
        const reallyBadPercentage = ratings.filter((rating) => rating.rating === 1).length / totalRatings;

        if (reallyBadPercentage === 1) {
            return 0;
        }

        return (perfectPercentage * 100) + (goodPercentage * 100) * 0.8 + (normalPercentage * 100) * 0.6 + (badPercentage * 100) * 0.4;
    } catch (error) {
        Alert.alert('Fout', 'Fout bij het ophalen van de score van recepten. Controleer uw verbinding.');
        return 0;
    }
}

export const fetchRecipesByUserId = async (setRecepten) => {
    try {
        const userId = await AsyncStorage.getItem('userID');
        const response = await axiosInstance.get(`/userrecipe/user/${userId}`);
        const receptenData = response.data;

        setRecepten(receptenData);
    } catch (error) {
        Alert.alert('Fout', 'Fout bij het ophalen van recepten. Controleer uw verbinding.');
        throw error;
    }
};




