import axiosInstance from "../interceptor/axiosInterceptor";
import {fetchUserReceptenScore} from "./UserReceptService"

export const fetchRecepten = async (setRecepten) => {
    try {
        const response = await axiosInstance.get('/recipe/all');
        const receptenData = response.data;

        const updatedReceptenPromises = receptenData.map(async (recept) => {
            const score = await fetchUserReceptenScore(recept.id);
            return { ...recept, score };
        });

        const updatedRecepten = await Promise.all(updatedReceptenPromises);
        setRecepten(updatedRecepten);
    } catch (error) {
        console.error('Fout bij het ophalen van recepten:', error);
        throw error;
    }
};


