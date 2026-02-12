import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { serviceRequestSchema } from "../../validation/service-request";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = serviceRequestSchema.parse(body);

    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("SMTP credentials not configured");
      if (process.env.NODE_ENV === "development") {
        console.log("Email would be sent to:", process.env.CONTACT_EMAIL || "info@smartcloud.com");
        console.log("Email content:", validated);
        return NextResponse.json(
          { message: "Service request received (email not configured)" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Create transporter 
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD?.replace(/\s+/g, ''), // Remove spaces from App Password
      },
    });

    // Build email content based on service category
    let emailContent = `
      <h2>New Service Request</h2>
      <p><strong>Full Name:</strong> ${validated.fullName}</p>
      <p><strong>Email:</strong> ${validated.email}</p>
      <p><strong>Phone:</strong> ${validated.phone}</p>
      <p><strong>Service Category:</strong> ${getCategoryLabel(validated.serviceCategory)}</p>
    `;

    if (validated.serviceCategory === "design-consulting") {
      emailContent += `<p><strong>Building Type:</strong> ${formatBuildingType(validated.buildingType)}</p>`;
    } else if (validated.serviceCategory === "price-quote") {
      emailContent += `
        <h3>Building Details:</h3>
        <p><strong>Building Type:</strong> ${formatBuildingType(validated.buildingType)}</p>
        <p><strong>Number of Rooms:</strong> ${validated.numberOfRooms}</p>
        <p><strong>Number of Lighting Circuits:</strong> ${validated.numberOfLightingCircuits}</p>
        <p><strong>Number of Air Conditioning Units:</strong> ${validated.numberOfAirConditioningUnits}</p>
        <p><strong>Number of Blinds:</strong> ${validated.numberOfBlinds}</p>
        <p><strong>Number of Floors:</strong> ${validated.numberOfFloors}</p>
        <p><strong>Number of Restrooms:</strong> ${validated.numberOfRestrooms}</p>
        <p><strong>Number of Corridors:</strong> ${validated.numberOfCorridors}</p>
        <p><strong>Number of Exterior Doors:</strong> ${validated.numberOfExteriorDoors}</p>
        <p><strong>Number of Exterior Cameras:</strong> ${validated.numberOfExteriorCameras}</p>
        <p><strong>Number of Interior Cameras:</strong> ${validated.numberOfInteriorCameras}</p>
        <p><strong>Number of Audio Systems:</strong> ${validated.numberOfAudioSystems}</p>
      `;
    } else if (validated.serviceCategory === "other") {
      emailContent += `
        <p><strong>Requirements:</strong></p>
        <p>${validated.requirements.replace(/\n/g, "<br>")}</p>
      `;
    }

    // Email options
    const mailOptions = {
      from: process.env.SMTP_USER || "noreply@smartcloud.com",
      replyTo: validated.email, // So replies go to the form submitter
      to: process.env.CONTACT_EMAIL || "info@smartcloud.com",
      subject: `New Service Request from ${validated.fullName}`,
      html: emailContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Service request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to submit service request" },
      { status: 500 }
    );
  }
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    "design-consulting": "System Design or Consulting Services",
    "price-quote": "Price Quote for Smart Building Systems",
    "other": "Other Services",
  };
  return labels[category] || category;
}

function formatBuildingType(type: string): string {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
