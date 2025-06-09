import { S3 } from 'aws-sdk';

const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('fileName');

  if (!fileName) {
    return new Response('Missing fileName query param', { status: 400 });
  }

  try {
    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Expires: 60, // 60 seconds
      ContentType: 'application/pdf',
    });

    console.log('Generated signed URL:', url);

    return new Response(JSON.stringify({ url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response('Error generating signed URL', { status: 500 });
  }
}
