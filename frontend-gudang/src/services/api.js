const BASE_URL = 'http://127.0.0.1:8000/api';

export const api = {
    /**
     * Verify PIN with Backend
     * @param {string} pin 
     * @returns {Promise<{success: boolean, user: object, token: string}>}
     */
    verifyPin: async (pin) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/verify-pin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ pin })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Verification failed');
            }

            return data;
        } catch (error) {
            console.error("API verifyPin error:", error);
            throw error;
        }
    },

    /**
     * Get LiveKit Token from Backend
     * @param {string} roomName 
     * @param {string} participantName 
     * @returns {Promise<string>}
     */
    getLiveKitToken: async (roomName, participantName) => {
        try {
            const response = await fetch(
                `${BASE_URL}/livekit/token?room=${encodeURIComponent(roomName)}&username=${encodeURIComponent(participantName)}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error('Failed to fetch token');
            }

            return data.token;
        } catch (error) {
            console.error("API getLiveKitToken error:", error);
            console.warn("Using fallback mock token");
            return "mock-token-" + Date.now();
        }
    },

    /**
     * Get Activity Logs
     * @returns {Promise<Array>}
     */
    getActivityLog: async () => {
        try {
            const response = await fetch(`${BASE_URL}/activity-log`);
            const data = await response.json();

            if (!response.ok) throw new Error('Failed to fetch logs');

            return data;
        } catch (error) {
            console.error("API getActivityLog error:", error);
            return [];
        }
    }
};

export default api;
