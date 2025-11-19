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
  threeWords: string;
  story: string;
  mustHave?: string;
  mood: 'gentle' | 'warm' | 'narrative' | 'surprise';
  additional?: string;
  contactName: string;
  email: string;
  phone?: string;
  language: 'en' | 'no';
}

export async function createSubmission(data: FormSubmission) {
  try {
    const table = getTable();
    const record = await table.create([
      {
        fields: {
          Name: data.name,
          threeWords: data.threeWords,
          story: data.story,
          mustHave: data.mustHave || '',
          mood: data.mood,
          additional: data.additional || '',
          contactName: data.contactName,
          email: data.email,
          phone: data.phone || '',
          language: data.language,
          submittedAt: new Date().toISOString(),
          status: 'new',
        },
      },
    ]);

    return { success: true, id: record[0].id };
  } catch (error) {
    console.error('Airtable error:', error);
    return { success: false, error: 'Failed to submit' };
  }
}

