'use strict';

// Documentation for writing custom components: https://github.com/oracle/bots-node-sdk/blob/master/CUSTOM_COMPONENT.md

// You can use your favorite http client package to make REST calls, however, the node fetch API is pre-installed with the bots-node-sdk.
// Documentation can be found at https://www.npmjs.com/package/node-fetch
// Un-comment the next line if you want to make REST calls using node-fetch.
const fetch = require("node-fetch");

module.exports = {
metadata: () => ({
name:'complete.training.openai',
properties: {
inputprompt: {required: true, type: 'string'},

},
supportedActions: ['success', 'failure']
}),

invoke: async (context, done) => {
  const { inputprompt } = context.properties().inputprompt;
  context.logger().info("Input parameter values: variable: "+inputprompt)
                                                               
  const OPENAI_API_KEY = "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"
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: tell me about workday Workday is a cloud-based human capital management and financial management software platform used by businesses to manage their employees, payrolls, and finances. It is designed to automate processes related to human resources and financial operations. It also provides organizations with the insight and analytics they need to make better decisions.",
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });
  
  return response;
}
};

