import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import db from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Fetch data from the database
    const userActivities = await db.userActivity.findMany({
      include: { user: true }
    });

    const productSearches = await db.productSearch.findMany();
    const pageVisits = await db.pageVisit.findMany();
    const productSales = await db.productSale.findMany({
      include: { product: true }
    });

    const html = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { text-align: center; color: #333; }
          .section { margin-bottom: 40px; }
          .title { font-size: 20px; font-weight: bold; color: #2C3E50; margin-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f4f4f4; }
          .footer { margin-top: 40px; text-align: center; font-size: 14px; color: #555; }
          .page-break { page-break-before: always; }
        </style>
      </head>
      <body>
        <h1>System Report</h1>

        <div class="section">
          <div class="title">User Activities</div>
          <table>
            <tr><th>ID</th><th>User ID</th><th>Activity</th><th>Date</th></tr>
            ${userActivities
              .map(
                (a) => `
              <tr>
                <td>${a.id}</td>
                <td>${a.userId || "Guest"}</td>
                <td>${a.activity}</td>
                <td>${new Date(a.createdAt).toLocaleString()}</td>
              </tr>`
              )
              .join("")}
          </table>
        </div>

        <div class="page-break"></div>

        <div class="section">
          <div class="title">Product Searches</div>
          <table>
            <tr><th>ID</th><th>Query</th><th>Count</th><th>Date</th></tr>
            ${productSearches
              .map(
                (s) => `
              <tr>
                <td>${s.id}</td>
                <td>${s.query}</td>
                <td>${s.count}</td>
                <td>${new Date(s.createdAt).toLocaleString()}</td>
              </tr>`
              )
              .join("")}
          </table>
        </div>

        <div class="page-break"></div>

        <div class="section">
          <div class="title">Page Visits</div>
          <table>
            <tr><th>ID</th><th>Page URL</th><th>User ID</th><th>Date</th></tr>
            ${pageVisits
              .map(
                (p) => `
              <tr>
                <td>${p.id}</td>
                <td>${p.pageUrl}</td>
                <td>${p.userId || "Guest"}</td>
                <td>${new Date(p.createdAt).toLocaleString()}</td>
              </tr>`
              )
              .join("")}
          </table>
        </div>

        <div class="page-break"></div>

        <div class="section">
          <div class="title">Product Sales</div>
          <table>
            <tr><th>ID</th><th>Product ID</th><th>Quantity</th><th>Date</th></tr>
            ${productSales
              .map(
                (s) => `
              <tr>
                <td>${s.id}</td>
                <td>${s.productId}</td>
                <td>${s.quantity}</td>
                <td>${new Date(s.createdAt).toLocaleString()}</td>
              </tr>`
              )
              .join("")}
          </table>
        </div>

        <div class="footer">Generated on ${new Date().toLocaleString()}</div>
      </body>
      </html>
    `;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=report.pdf"
      }
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
