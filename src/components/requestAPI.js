const API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencesFromAPI = async () => {
  const response = await fetch(API);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getCurrencesFromAPI;
