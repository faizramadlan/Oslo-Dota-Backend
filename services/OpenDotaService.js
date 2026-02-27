const axios = require('axios');
const NodeCache = require('node-cache');
const dotaCache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

class OpenDotaService {
  static async getHeroes() {
    const cacheKey = 'allHeroes';
    if (dotaCache.has(cacheKey)) {
      return dotaCache.get(cacheKey);
    }

    try {
      let { data } = await axios({
        url: 'https://api.opendota.com/api/heroStats',
        method: 'get',
      });
      
      let formattedData = data.map((ele) => {
        ele.img = 'https://cdn.cloudflare.steamstatic.com' + ele.img;
        ele.icon = 'https://cdn.cloudflare.steamstatic.com' + ele.icon;
        return ele;
      });

      dotaCache.set(cacheKey, formattedData);
      return formattedData;
    } catch (error) {
      throw error;
    }
  }

  static async getHeroByName(heroname) {
    const cacheKey = `hero_${heroname}`;
    if (dotaCache.has(cacheKey)) {
      return dotaCache.get(cacheKey);
    }

    try {
      const allHeroes = await this.getHeroes();
      const hero = allHeroes.find((ele) => ele.localized_name === heroname);
      
      if (!hero) {
        throw { name: 'NotFound', message: 'Hero not found' };
      }

      dotaCache.set(cacheKey, hero);
      return hero;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OpenDotaService;
