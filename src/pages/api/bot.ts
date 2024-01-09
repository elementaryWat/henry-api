import type { NextApiRequest, NextApiResponse } from 'next'
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "@langchain/openai";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { question } = req.body;

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
  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  const response = await chain.invoke({
    query: question,
  });

  res.status(200).json({ response: response.text })
}
