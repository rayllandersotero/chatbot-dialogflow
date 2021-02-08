require("dotenv/config");
const Dialogflow = require("dialogflow");

const configs = {
  project_id: process.env.DIALOGFLOW_PROJECT_ID,
  private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
  client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
};

const sessionClient = new Dialogflow.SessionsClient({
  projectId: configs.project_id,
  credentials: {
    private_key: configs.private_key,
    client_email: configs.client_email,
  },
});

async function sendMessage(chatId, message) {
  const session = sessionClient.sessionPath(configs.project_id, chatId);

  const request = {
    session,
    queryInput: {
      text: { text: message, languageCode: "en-US" },
    },
  };

  const responses = await sessionClient.detectIntent(request);

  const result = responses[0].queryResult;

  return {
    text: result.fulfillmentText,
    intent: result.intent.displayName,
    fields: result.parameters.fields,
  };
}

module.exports = { sendMessage };
