"use strict";

const _ = require("lodash");
const path = require("path");
const klawSync = require("klaw-sync");
const { expect } = require("chai");
const fs = require("fs");
const javaParser = require("../src/index");

describe("The Java Parser", () => {
  createSampleSpecs("java-design-patterns");
  createSampleSpecs("spring-boot");
  createSampleSpecs("spring-framework");
  createSampleSpecs("jhipster-bom");
  createSampleSpecs("jhipster-online");
  createSampleSpecs("jhipster-sample-app");
  createSampleSpecs("jhipster-sample-app-cassandra");
  createSampleSpecs("jhipster-sample-app-dto");
  createSampleSpecs("jhipster-sample-app-elasticsearch");
  createSampleSpecs("jhipster-sample-app-gradle");
  createSampleSpecs("jhipster-sample-app-hazelcast");
  createSampleSpecs("jhipster-sample-app-microservice");
  createSampleSpecs("jhipster-sample-app-mongodb");
  createSampleSpecs("jhipster-sample-app-noi18n");
  createSampleSpecs("jhipster-sample-app-oauth2");
  createSampleSpecs("jhipster-sample-app-react");
  createSampleSpecs("jhipster-sample-app-websocket");
  createSampleSpecs("guava");
  createSampleSpecs("demo-java-x");
});

function createSampleSpecs(sampleName) {
  context(sampleName + " samples", () => {
    const samplesDir = path.resolve(__dirname, "../samples/" + sampleName);
    const sampleFiles = klawSync(samplesDir, { nodir: true });
    const javaSampleFiles = sampleFiles.filter(fileDesc =>
      fileDesc.path.endsWith(".java")
    );

    if (_.isEmpty(sampleFiles)) {
      throw `Missing sample-dir: <${samplesDir}> did you forget to clone the samples?`;
    }
    _.forEach(javaSampleFiles, fileDesc => {
      const relativePath = path.relative(__dirname, fileDesc.path);
      it(`Can Parse <${relativePath}>`, () => {
        const sampleText = fs.readFileSync(fileDesc.path, "utf8");
        expect(() => javaParser.parse(sampleText)).to.not.throw();
      });
    });
  });
}
