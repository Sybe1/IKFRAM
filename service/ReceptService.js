import axiosInstance from "../interceptor/axiosInterceptor";
import {fetchUserReceptenScore} from "./UserReceptService"
import {Alert} from "react-native";

export const fetchRecepten = async (setRecepten) => {
    try {
        const response = await axiosInstance.get('/recipe');
        const receptenData = response.data;

        const updatedReceptenPromises = receptenData.map(async (recept) => {
            const score = await fetchUserReceptenScore(recept.id);
            return { ...recept, score };
        });

        const updatedRecepten = await Promise.all(updatedReceptenPromises);
        setRecepten(updatedRecepten);
    } catch (error) {
        Alert.alert('Fout', 'Fout bij het ophalen van recepten. Controleer uw verbinding.');
        throw error;
    }
};


