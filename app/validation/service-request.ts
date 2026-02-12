import { z } from "zod";

// Base schema for all service requests
const baseServiceRequestSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(1, "Phone is required").min(10, "Phone number must be at least 10 digits"),
  serviceCategory: z.enum(["design-consulting", "price-quote", "other"], {
    message: "Please select a service category",
  }),
});

// Schema for option 1: Design/Consulting
const designConsultingSchema = baseServiceRequestSchema.extend({
  serviceCategory: z.literal("design-consulting"),
  buildingType: z.enum(
    ["administrative-buildings", "offices", "villas-apartments", "residential-complex", "hotels", "palaces", "mosques"],
    { message: "Please select a building type" }
  ),
});

// Schema for option 2: Price Quote
const priceQuoteSchema = baseServiceRequestSchema.extend({
  serviceCategory: z.literal("price-quote"),
  buildingType: z.enum(
    ["administrative-building", "villa", "offices", "apartments"],
    { message: "Please select a building type" }
  ),
  numberOfRooms: z.string().min(1, "Number of rooms is required"),
  numberOfLightingCircuits: z.string().min(1, "Number of lighting circuits is required"),
  numberOfAirConditioningUnits: z.string().min(1, "Number of air conditioning units is required"),
  numberOfBlinds: z.string().min(1, "Number of blinds is required"),
  numberOfFloors: z.string().min(1, "Number of floors is required"),
  numberOfRestrooms: z.string().min(1, "Number of restrooms is required"),
  numberOfCorridors: z.string().min(1, "Number of corridors is required"),
  numberOfExteriorDoors: z.string().min(1, "Number of exterior doors is required"),
  numberOfExteriorCameras: z.string().min(1, "Number of exterior cameras is required"),
  numberOfInteriorCameras: z.string().min(1, "Number of interior cameras is required"),
  numberOfAudioSystems: z.string().min(1, "Number of audio systems is required"),
});

// Schema for option 3: Other Services
const otherServicesSchema = baseServiceRequestSchema.extend({
  serviceCategory: z.literal("other"),
  requirements: z.string().min(10, "Please provide detailed requirements (minimum 10 characters)"),
});

// Union schema that validates based on serviceCategory
export const serviceRequestSchema = z.discriminatedUnion("serviceCategory", [
  designConsultingSchema,
  priceQuoteSchema,
  otherServicesSchema,
]);

// Type for the form data
export type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;
