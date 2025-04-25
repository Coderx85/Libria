import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "@/lib/config";
import emailjs from '@emailjs/nodejs';

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: WelcomeEmailProps) => {
  emailjs.init({
    privateKey: config.env.emailjs.privateKey,
  });

  await qstashClient.publishJSON({
    url: `${config.env.apiEndpoint}/api/workflows/onboarding`,
    body: {
      email,
      subject,
      message,
    },
  });
}
