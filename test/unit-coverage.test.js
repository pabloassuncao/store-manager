const { fileURLToPath } = require('url');
const fs = require('fs').promises;
const util = require('util');
const { exec: callbackExec } = require('child_process');
const mysql = require('mysql2/promise');
const Importer = require('mysql-import');
const path = require('path');
require('dotenv').config();

const exec = util.promisify(callbackExec);

let NPX_NYC_COMMAND =
`npx nyc --all --include services --include models --include controllers --reporter json-summary mocha test/unit/services.js test/unit/models.js test/unit/controllers.js --exit`;

function readCoverageFile() {
  const COVERAGE_FILE_PATH = path.join(__dirname, '..', 'coverage', 'coverage-summary.json');
  return fs.readFile(COVERAGE_FILE_PATH).then(JSON.parse);
};

const executeTests = async () => {
  try {
    await exec(NPX_NYC_COMMAND)
  } catch (error) {
    throw error;
  }
};

describe('Testes das camadas Model, Service e Controller', () => {
  beforeAll(async() => {
    const files = await fs.readdir(path.join(__dirname + '/unit'));
    if(files.some((file) => (file.endsWith('.ts')))) {
      NPX_NYC_COMMAND = NPX_NYC_COMMAND.replace('test/unit/services.js test/unit/models.js test/unit/controllers.js', '-r ts-node/register test/unit/services.ts test/unit/models.ts test/unit/controllers.ts');
      // NPX_NYC_COMMAND = `nyc --all --include models --include services --include controllers --reporter json-summary mocha -r ts-node/register test/unit/services.ts test/unit/models.ts test/unit/controllers.ts --exit`;
    }
  });

  beforeEach(async() => {
    await executeTests();
  })

  afterEach(async () => {
    await exec('rm -rf coverage .nyc_output');
  });
  
  describe('8 - Escreva testes para cobrir 35% das camadas da sua aplicação', () => {

    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 35%', async () => {
      const coverageResults = await readCoverageFile();
      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(35);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(24);
    });
  });
  
  describe('9 - Escreva testes para cobrir 40% das camadas da sua aplicação', () => {
  
    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 40%', async () => {
      const coverageResults = await readCoverageFile();
      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(40);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(24);
    });
  });
  
  describe('13 - Escreva testes para cobrir 50% das camadas da sua aplicação', () => {
  
    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 50%', async () => {
      const coverageResults = await readCoverageFile();
      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(50);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(24);
    });
  });

  describe('14 - Escreva testes para cobrir 60% das camadas da sua aplicação', () => {
  
    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 60%', async () => {
      const coverageResults = await readCoverageFile();
      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(60);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(24);
    });
  });
})
