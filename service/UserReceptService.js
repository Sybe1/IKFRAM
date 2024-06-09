import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../interceptor/axiosInterceptor";

export const updateMood = async (receptId, mood) => {
    try {
        const userId = await AsyncStorage.getItem('userID');
        const ratingData = { id: { userId, receptId}, rating: mood };

        axiosInstance.put('/userrecept', ratingData)
            .then((response) => {
                console.log('Beoordeling succesvol bijgewerkt:', response.data);
            })
            .catch((error) => {
                console.error('Fout bij het bijwerken van de beoordeling:', error);
            });
    } catch (error) {
        console.error('Fout bij het ophalen van de gebruikers-ID:', error);
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

        const score = (perfectPercentage * 100) * 1.0 + (goodPercentage * 100) * 0.8 + (normalPercentage * 100) * 0.6 + (badPercentage * 100) * 0.4;

        console.log(perfectPercentage + " " + goodPercentage + " " + normalPercentage + " " + badPercentage + " " + reallyBadPercentage)
        console.log("score: " + score)
        return score;
    } catch (error) {
        console.error("Error fetching user's recept score:", error);
        return 0;
    }
}

export const fetchRecipesByUserId = async (setRecepten) => {
    try {
        const userId = await AsyncStorage.getItem('userID');
        console.log("ditte: " + userId)
        console.log(await AsyncStorage.getItem('userToken'))
        const response = await axiosInstance.get(`/userrecipe/user/${userId}`);
        const receptenData = response.data;

        console.log(receptenData)
        setRecepten(receptenData);
    } catch (error) {
        console.error('Fout bij het ophalen van recepten:', error);
        throw error;
    }
};


