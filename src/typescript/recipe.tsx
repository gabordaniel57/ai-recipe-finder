export interface ResponseDataType {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
  system_fingerprint: string;
  x_groq: Xgroq;
}

interface Xgroq {
  id: string;
}

interface Usage {
  queue_time: number;
  prompt_tokens: number;
  prompt_time: number;
  completion_tokens: number;
  completion_time: number;
  total_tokens: number;
  total_time: number;
}

interface Choice {
  index: number;
  message: Message;
  logprobs: null;
  finish_reason: string;
}

export interface Message {
  role: string;
  content: string;
}

export interface Recipe {
  id: string;
  title: string;
  minutes: string;
  ingredients: string[];
  instructions: string[];
}
