import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Load environment variables
const REGION = process.env.REACT_APP_AWS_REGION;
const BUCKET_NAME = process.env.REACT_APP_AWS_BUCKET_NAME;
const ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

// Initialize S3 client
const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

export const exportEnquiriesToS3 = async (enquiries) => {
  try {
    // Generate PDF
    const doc = new jsPDF();
    doc.text("VINSYS Enquiry Report", 14, 15);

    const tableColumn = ["Sr No.", "Name", "Email", "Phone", "Query"];
    const tableRows = enquiries.map((enq, index) => [
      index + 1,
      enq.name,
      enq.email,
      enq.phone,
      enq.query,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    // Convert PDF to ArrayBuffer
    const pdfArrayBuffer = await doc.output('arraybuffer');

    // Generate unique file name
    const timestamp = new Date().toISOString().replace(/[:.-]/g, '').replace('T', '_').replace('Z', '');
    const fileName = `enquiries_${timestamp}.pdf`;

    // Upload to S3
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: pdfArrayBuffer,
      ContentType: 'application/pdf',
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    console.log(`✅ PDF uploaded to S3 as ${fileName}`);
    return { success: true, fileName };
  } catch (err) {
    console.error('❌ S3 Upload Error:', err);
    return { success: false, error: err };
  }
};
