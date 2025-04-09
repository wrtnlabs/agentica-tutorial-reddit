import { Agentica } from "@agentica/core";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import typia from "typia";

import { RedditService } from "@wrtnlabs/connector-reddit";

dotenv.config();

const agent: Agentica<"chatgpt"> = new Agentica({
  model: "chatgpt",
  vendor: {
    api: new OpenAI({ apiKey: process.env.OPENAI_API_KEY! }),
    model: "gpt-4o-mini",
  },
  controllers: [
    {
      name: "Reddit Connector",
      protocol: "class",
      application: typia.llm.application<RedditService, "chatgpt">(),
      execute: new RedditService({
        redditRefreshToken: process.env.REDDIT_REFRESH_TOKEN!,
        redditClientId: process.env.REDDIT_CLIENT_ID!,
        redditClientSecret: process.env.REDDIT_CLIENT_SECRET!,
      }),
    },
  ],
});

const main = async () => {
  console.log(await agent.conversate("What can you do?"));
};

main();
