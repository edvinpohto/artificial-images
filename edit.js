import { Configuration, OpenAIApi } from "openai";
import { createReadStream, write, writeFileSync } from 'fs';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'

let apiKey = process.env.OPENAI_API_KEY

const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

const src = './coder.png'
const mask = './mask.png'

// For some reason this doesnt work. I think its the two images not being right.
const result = await openai.createImageEdit(
  createReadStream(src),
  createReadStream(mask),
  'a programmer drawing AI art',
  1,
  "1024x1024",
);

const url = result.data.data[0].url;
console.log(url);

// Save Image URL to Disk
const imgResult = await fetch(url);
const blob = await imgResult.blob()
const buffer = Buffer.from( await blob.arrayBuffer() )
writeFileSync(`./img/${Date.now()}.png`, buffer);
