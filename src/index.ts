import {Agentica} from "@agentica/core";
import dotenv from "dotenv";
import {OpenAI} from "openai";
import typia from "typia";

import {RedditService} from "@wrtnlabs/connector-reddit";

dotenv.config();

const agent: Agentica<"chatgpt"> = new Agentica({
    model: "chatgpt",
    vendor: {
        api: new OpenAI({apiKey: process.env.OPENAI_API_KEY!}),
        model: "gpt-4o-mini",
    },
    controllers: [
        {
            name: "Reddit Connector",
            protocol: "class",
            application: typia.llm.application<RedditService, "chatgpt">(),
            execute: new RedditService({
                secret: process.env.REDDIT_SECRET!,
                clientSecret: process.env.REDDIT_CLIENT_SECRET!,
                clientId: process.env.REDDIT_CLIENT_ID!,
            }),
        },
    ],
});

const main = async () => {
    console.log(await agent.conversate("What can you do?"));
};

main();
