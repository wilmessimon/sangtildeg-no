import { NextRequest, NextResponse } from 'next/server';
import { createSubmission } from '@/lib/airtable';
import { sendNotificationEmail } from '@/lib/resend';
import { formSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate
    const validatedData = formSchema.parse(body);
    
    // Save to Airtable
    const result = await createSubmission(validatedData);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      );
    }
    
    // Send notification email
    await sendNotificationEmail(validatedData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Invalid submission' },
      { status: 400 }
    );
  }
}

