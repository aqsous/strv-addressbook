# Create test file

function createTestFile {
  local testFile=./tests/${lowerModelNamePlural}.routes.test.js
  if [[ -f "$testFile" ]]; then
    while true; do
      read -p "$testFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
          [Yy]* ) break;;
          [Nn]* ) return;;
          * ) echo "Please answer yes or no.";;
      esac
    done
  fi
  touch $testFile
  echo "const request = require('supertest');
const app = require('../src/index');

const userToken = '';

describe('${modelName} Endpoints', () => {
  it('should get ${lowerModelName} by ${lowerModelName}Id', async () => {
    const res = await request(app)
      .get('/api/v1/admin/${lowerModelNamePlural}/:${lowerModelName}Id')
      .set('Authorization', \`Bearer \${userToken}\`).send();
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('post');
  });
  it('should get all ${lowerModelNamePlural}', async () => {
    const res = await request(app)
      .get('/api/v1/admin/${lowerModelNamePlural}')
      .set('Authorization', \`Bearer \${userToken}\`).send();
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('post');
  });
  it('should create a new ${lowerModelName}', async () => {
    const res = await request(app)
      .post('/api/v1/admin/${lowerModelNamePlural}')
      .set('Authorization', \`Bearer \${userToken}\`)
      .send({});
    expect(res.statusCode).toEqual(201);
    // expect(res.body).toHaveProperty('post');
  });
  it('should update ${lowerModelName} by ${lowerModelName}Id', async () => {
    const res = await request(app)
      .post('/api/v1/admin/${lowerModelNamePlural}/:${lowerModelName}Id')
      .set('Authorization', \`Bearer \${userToken}\`)
      .send({});
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('post');
  });
  it('should delete ${lowerModelName} by ${lowerModelName}Id', async () => {
    const res = await request(app)
      .delete('/api/v1/admin/${lowerModelNamePlural}/:${lowerModelName}Id')
      .set('Authorization', \`Bearer \${userToken}\`)
      .send({});
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('post');
  });
});" > $testFile
}
