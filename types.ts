export type Category = "Marketing" | "Development" | "Art" | "Writing" | "Business";

export interface Prompt {
  id: number;
  title: string;
  description: string;
  promptText: string;
  model: "Gemini" | "ChatGPT" | "Midjourney" | "DALL-E";
  author: string;
  price: number;
  rating: number;
  category: Category;
  tags: string[];
  exampleOutput: string;
  createdAt: string;
}
