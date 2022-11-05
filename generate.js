import { Configuration, OpenAIApi } from "openai";
import { write, writeFileSync } from 'fs';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'

let apiKey = process.env.OPENAI_API_KEY

const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

const prompt = 'A cute baby sea otter'

const result = await openai.createImage({
  prompt,
  n: 1,
  size: "512x512",
  user: "edvin"
})

const url = result.data.data[0].url;
console.log(url);

// Save Image URL to Disk
const imgResult = await fetch(url);
const blob = await imgResult.blob()
const buffer = Buffer.from( await blob.arrayBuffer() )
writeFileSync(`./img/${Date.now()}.png`, buffer);