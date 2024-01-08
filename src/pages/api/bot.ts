// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

type Data = {
  response: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {


  // Create docs with a loader
  const loader = new TextLoader("src/knowledge/henryFAQ.txt");
  const docs = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });

  const splittedDocs = await textSplitter.splitDocuments(docs);

  // Load the docs into the vector store
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splittedDocs,
    new OpenAIEmbeddings()
  );

  // Search for the most similar document
  const resultOne = await vectorStore.similaritySearch("cual es su mision", 1);

  console.log(resultOne);
  res.status(200).json({ response: resultOne[0].pageContent })
}
