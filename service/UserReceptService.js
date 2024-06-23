import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../interceptor/axiosInterceptor";

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
        console.error('Fout bij het bijwerken van de beoordeling:', error);
    }
};

export const addMood = async (recipeId, rating, saved) => {
    const userId = await AsyncStorage.getItem('userID');
    try {
        const ratingData = {
            userId: userId,
            recipeId: recipeId,
            rating: rating,
            saved: saved
        };
        await axiosInstance.post(`/userrecipe`, ratingData);
    } catch (error) {
        console.error('Fout bij het bijwerken van de beoordeling:', error);
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
        console.error("Error fetching user's recept score:", error);
        return 0;
    }
}

export const fetchRecipesByUserId = async (setRecepten) => {
    try {
        const userId = await AsyncStorage.getItem('userID');
        console.log(userId)
        const response = await axiosInstance.get(`/userrecipe/user/${userId}`);
        console.log(response.data)
        const receptenData = response.data;

        setRecepten(receptenData);
    } catch (error) {
        console.error('Fout bij het ophalen van recepten:', error);
        throw error;
    }
};




