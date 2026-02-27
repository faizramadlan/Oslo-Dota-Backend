const axios = require('axios');
const NodeCache = require('node-cache');
const miscCache = new NodeCache({ stdTTL: 1800 }); // Cache for 30 minutes

class MiscService {
  static async getRandomMeme() {
    try {
      const response = await axios.get('https://api.imgflip.com/get_memes');
      const memes = response.data.data.memes;
      const randomIndex = Math.floor(Math.random() * memes.length);
      const meme = memes[randomIndex];
      return {
        url: meme.url,
        title: meme.name,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getFreebies() {
    const cacheKey = 'cheapsharkFreebies';
    if (miscCache.has(cacheKey)) {
      return miscCache.get(cacheKey);
    }

    try {
      let { data } = await axios({
        url: 'https://www.cheapshark.com/api/1.0/deals?upperPrice=0',
        method: 'get',
      });
      
      miscCache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MiscService;
