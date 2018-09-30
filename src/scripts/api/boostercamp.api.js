import xhr from './tools/xhr-utils';

const bareApi = {
  getTools: () => xhr('GET', 'http://localhost:3000/tools', null),
  getSoatiens: () => xhr('GET', 'http://localhost:3000/soatiens', null),
  postSoatiens: entity => xhr('POST', 'http://localhost:3000/soatiens', JSON.stringify(entity)),
};

export default bareApi;
