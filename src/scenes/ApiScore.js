export default class ApiScore {
  constructor() {
    this.config = {
      gameid: 'Poioe0Au7nuK6g0xGfl3',
      baseURL: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
    };
  }

  async getScores() {
    const url = `${this.config.baseURL}${this.config.gameid}/scores/`;

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    };

    const data = await fetch(url, options);
    const { result: scores } = await data.json();

    return scores;
  }

  async saveScore(username, score) {
    const url = `${this.config.baseURL}${this.config.gameid}/scores/`;
    const scoreData = {
      user: username,
      score,
    };
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(scoreData),
    };

    const data = await fetch(url, options);
    const response = await data.json();

    return response;
  }
}