const BASE_URL = import.meta.env.VITE_FOOD_API_BASE_URL;
const API_KEY = import.meta.env.VITE_FOOD_API_KEY;

const headers = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY, // Assumed header name, adjust if needed
};

export const foodApi = {
    /**
     * Search for recipes by title to get ID
     * Endpoint: /recipeByTitle
     */
    searchRecipes: async (query) => {
        if (!BASE_URL || BASE_URL.includes("INSERT")) return null;
        try {
            const res = await fetch(`${BASE_URL}/recipeByTitle?query=${encodeURIComponent(query)}`, { headers });
            return await res.json();
        } catch (e) {
            console.error("Food API Error:", e);
            return null;
        }
    },

    /**
     * Get nutrition info by Recipe ID
     * Endpoint: /nutritioninfo
     */
    getNutrition: async (id) => {
        if (!BASE_URL) return null;
        try {
            // Adjust query param name based on actual API docs if needed (assuming ?id= or /id)
            const res = await fetch(`${BASE_URL}/nutritioninfo?id=${id}`, { headers });
            return await res.json();
        } catch (e) {
            console.error("Food API Error:", e);
            return null;
        }
    },

    /**
    * Get micronutrients by Recipe ID
    * Endpoint: /micronutritioninfo
    */
    getMicronutrients: async (id) => {
        if (!BASE_URL) return null;
        try {
            const res = await fetch(`${BASE_URL}/micronutritioninfo?id=${id}`, { headers });
            return await res.json();
        } catch (e) {
            console.error("Food API Error:", e);
            return null;
        }
    },

    /**
     * Get calories by query
     * Endpoint: /calories
     */
    getCalories: async (query) => {
        if (!BASE_URL) return null;
        try {
            const res = await fetch(`${BASE_URL}/calories?query=${encodeURIComponent(query)}`, { headers });
            return await res.json();
        } catch (e) {
            console.error("Food API Error:", e);
            return null;
        }
    }
};
