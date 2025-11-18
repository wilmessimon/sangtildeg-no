import Airtable from 'airtable';

// Lazy initialization - only create connection when needed
function getTable() {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID || !process.env.AIRTABLE_TABLE_NAME) {
    throw new Error('Airtable configuration is missing. Please set AIRTABLE_API_KEY, AIRTABLE_BASE_ID, and AIRTABLE_TABLE_NAME environment variables.');
  }

  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
  }).base(process.env.AIRTABLE_BASE_ID);

  return base(process.env.AIRTABLE_TABLE_NAME);
}

export interface FormSubmission {
  name: string;
  about: string;
  personality?: string;
  favorites?: string;
  saying?: string;
  memory?: string;
  tone: string;
  musicStyle?: string;
  contactName: string;
  email: string;
  phone?: string;
  additional?: string;
  language: 'en' | 'no';
}

export async function createSubmission(data: FormSubmission) {
  try {
    const table = getTable();
    const record = await table.create([
      {
        fields: {
          Name: data.name,
          About: data.about,
          Personality: data.personality || '',
          Favorites: data.favorites || '',
          Saying: data.saying || '',
          Memory: data.memory || '',
          Tone: data.tone,
          'Music Style': data.musicStyle || '',
          'Contact Name': data.contactName,
          Email: data.email,
          Phone: data.phone || '',
          Additional: data.additional || '',
          Language: data.language,
          'Submitted At': new Date().toISOString(),
          Status: 'New',
        },
      },
    ]);

    return { success: true, id: record[0].id };
  } catch (error) {
    console.error('Airtable error:', error);
    return { success: false, error: 'Failed to submit' };
  }
}

