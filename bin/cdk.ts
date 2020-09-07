#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PipelineStack } from '../lib/pipeline-stack';
import {InfraStage} from "../lib/infra-stage";

const app = new cdk.App();

new PipelineStack(app, 'PipelineStack', {
    repositoryName: "serverless-todo-api",
    branchName: "master",
    ownerName: "",
    env: {
        account: '910421270336',
        region: 'eu-west-1'
    }
});

// Implement Infra Stage for developer environment
new InfraStage(app, 'Dev', {
    domainName: "fr-houes",
    callbackUrls: ['http://localhost', 'http://localhost:3000'],
    logoutUrls: ['http://localhost', 'http://localhost:3000'],
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    },
});

app.synth();