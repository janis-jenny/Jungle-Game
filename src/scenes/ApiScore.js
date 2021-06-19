export default class ApiScore {
  constructor() {
    this.config = {
      gameid: 'wC3oX09S6iX57HlVfeav',
      baseURL: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
    };
  }

  async getScores() {
    const url = `${this.config.baseURL}${this.config.gameid}/scores/`;

    const options = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
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
        'Content-Type': 'application/json; charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify(scoreData),
    };

    const data = await fetch(url, options);
    const response = await data.json(); // converts the response into json

    return response;
  }

  async getTopScores() {
    const url = `${this.config.baseURL}${this.config.gameid}/scores/`;
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      method: 'POST',
    };
    const data = await fetch(url, options);
    const response = await data.json();
    const topScores = response.result.sort(
      (a, b) => ((a.score) > (b.score) ? -1 : 1),
    ).slice(0, 5);
    return topScores;
  }
}