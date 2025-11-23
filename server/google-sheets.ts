import { google } from "googleapis";

let connectionSettings: any;

async function getAccessToken() {
  if (
    connectionSettings &&
    connectionSettings.settings.expires_at &&
    new Date(connectionSettings.settings.expires_at).getTime() > Date.now()
  ) {
    return connectionSettings.settings.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!xReplitToken) {
    throw new Error("X_REPLIT_TOKEN not found for repl/depl");
  }

  connectionSettings = await fetch(
    "https://" +
      hostname +
      "/api/v2/connection?include_secrets=true&connector_names=google-sheet",
    {
      headers: {
        Accept: "application/json",
        X_REPLIT_TOKEN: xReplitToken,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.items?.[0]);

  const accessToken =
    connectionSettings?.settings?.access_token ||
    connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error("Google Sheet not connected");
  }
  return accessToken;
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
export async function getGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  return google.sheets({ version: "v4", auth: oauth2Client });
}

// Get or create the responses spreadsheet
export async function getOrCreateResponsesSpreadsheet(): Promise<string> {
  const sheets = await getGoogleSheetClient();

  try {
    // Try to find existing "Campbell Responses" spreadsheet
    const drive = google.drive({
      version: "v3",
      auth: (await getGoogleSheetClient()).auth,
    });

    const response = await drive.files.list({
      q: "name='Campbell Responses' and trashed=false and mimeType='application/vnd.google-apps.spreadsheet'",
      spaces: "drive",
      pageSize: 1,
      fields: "files(id, name)",
    });

    if (response.data.files && response.data.files.length > 0) {
      return response.data.files[0].id!;
    }
  } catch (error) {
    console.error("Error searching for existing spreadsheet:", error);
  }

  // Create new spreadsheet if not found
  try {
    const createResponse = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: "Campbell Responses",
        },
        sheets: [
          {
            properties: {
              sheetId: 0,
              title: "Responses",
            },
          },
        ],
      },
    });

    const spreadsheetId = createResponse.data.spreadsheetId;

    if (!spreadsheetId) {
      throw new Error("Failed to create spreadsheet");
    }

    // Add headers
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Responses!A1:C1",
      valueInputOption: "RAW",
      requestBody: {
        values: [["Student Name", "Question ID", "Answer"]],
      },
    });

    return spreadsheetId;
  } catch (error) {
    console.error("Error creating spreadsheet:", error);
    throw error;
  }
}

// Append submission to Google Sheet
export async function appendSubmissionToSheet(
  studentName: string,
  answers: Record<string, boolean>
): Promise<void> {
  try {
    const spreadsheetId = await getOrCreateResponsesSpreadsheet();
    const sheets = await getGoogleSheetClient();

    // Prepare rows: one row per answer
    const rows = Object.entries(answers).map(([questionId, answer]) => [
      studentName,
      questionId,
      answer ? "True" : "False",
    ]);

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Responses!A:C",
      valueInputOption: "RAW",
      requestBody: {
        values: rows,
      },
    });

    console.log(
      `Submitted ${rows.length} answers for student: ${studentName}`
    );
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    throw error;
  }
}
