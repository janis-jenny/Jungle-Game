import ApiScore from '../scenes/ApiScore';

const api = new ApiScore();

test('1. Test the correct URL for the API', () => {
  const fromLink = api.config.baseURL;
  const apiurl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  expect(fromLink).toEqual(apiurl);
});

test('2. Getting the scores with no errors', () => {
  expect(api.getScores() instanceof Promise).toBeTruthy();
});

test('3. Saving scores with no errors', () => {
  expect(api.saveScore('test', 0) instanceof Promise).toBeTruthy();
});

describe('Saving score', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({ result: 'Leaderboard score created correctly.' }));
  });

  it('should return an object', async () => {
    const response = await api.saveScore('username', 2000);
    expect(response).toBeInstanceOf(Object);
  });

  it('should return an object with result as a property', async () => {
    const response = await api.saveScore('username', 1000);
    expect(response).toMatchObject({ result: 'Leaderboard score created correctly.' });
  });
});

describe('Getting top scorers', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({ result: [{ user: 'pao', score: 30000 }, { user: 'jenny', score: 2300 }] }));
  });

  it('should return an object', async () => {
    const response = await api.getScores('loading');
    expect(response).toBeInstanceOf(Object);
  });

  it('should return the result as an array', async () => {
    const response = await api.getScores('loading');
    expect(response).toBeInstanceOf(Array);
  });
});