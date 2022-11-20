import axios from "axios";
const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}`;

async function getTelegramUpdates() {
    try {
        const response = await axios.get(`${TELEGRAM_URI}/getUpdates`);
    
        if (response.status === 502) return getTelegramUpdates();
        if (response.status !== 200) {
            
        }
    } catch (e) {

    }
}

export default getTelegramUpdates;