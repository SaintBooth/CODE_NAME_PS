import { Prompt } from '../types';
import { PROMPTS } from '../constants';

// This function simulates fetching data from a backend API.
// In the future, this will be replaced with a real HTTP request
// to a service like Supabase or a custom backend.
export async function fetchPrompts(): Promise<Prompt[]> {
  console.log("Fetching prompts from mock API...");
  return new Promise((resolve) => {
    setTimeout(() => {
      // The API now successfully resolves with the mock prompt data.
      resolve(PROMPTS);
    }, 500); // Simulate a 500ms network delay
  });
}