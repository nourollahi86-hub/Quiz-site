import { google } from "googleapis";

export async function appendAnswers(
  studentName: string,
  answers: Record<string, boolean>
): Promise<void> {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.SHEET_ID!;

  const timestamp = new Date().toISOString();

  const rows = Object.entries(answers).map(([questionId, isCorrect]) => [
    timestamp,
    studentName,
    questionId,
    isCorrect ? "True" : "False",
  ]);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A1", // Adjust to your tab name
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: rows,
    },
  });
}
