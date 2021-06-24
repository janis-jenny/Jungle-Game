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