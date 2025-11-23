import { type Question, type Submission } from "@shared/schema";
import { appendSubmissionToSheet } from "./google-sheets";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getQuestions(): Promise<Question[]>;
  setQuestions(questions: Question[]): Promise<void>;
  submitQuiz(submission: Submission): Promise<void>;
}

export class MemStorage implements IStorage {
  private questions: Question[];

  constructor() {
    this.questions = [];
  }

  async getQuestions(): Promise<Question[]> {
    return this.questions;
  }

  async setQuestions(questions: Question[]): Promise<void> {
    this.questions = questions;
  }

  async submitQuiz(submission: Submission): Promise<void> {
    // Save to Google Sheets
    await appendSubmissionToSheet(submission.studentName, submission.answers);
  }
}

export const storage = new MemStorage();
