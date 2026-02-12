"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowDownRight, ChevronDown, Info } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { z } from "zod";
import { serviceRequestSchema } from "../validation/service-request";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  serviceCategory: "" | "design-consulting" | "price-quote" | "other";
  buildingType?: string;
  numberOfRooms?: string;
  numberOfLightingCircuits?: string;
  numberOfAirConditioningUnits?: string;
  numberOfBlinds?: string;
  numberOfFloors?: string;
  numberOfRestrooms?: string;
  numberOfCorridors?: string;
  numberOfExteriorDoors?: string;
  numberOfExteriorCameras?: string;
  numberOfInteriorCameras?: string;
  numberOfAudioSystems?: string;
  requirements?: string;
};

export default function ServiceRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    serviceCategory: "",
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inputClass = useMemo(() => 
    "w-full rounded-lg border-2 border-transparent bg-slate-50/80 px-4 py-3 text-[#1e3a5f] transition-all duration-200 ease-out focus:border-primary focus:bg-white focus:shadow-md focus:outline-none placeholder:text-slate-400"
  , []);
  
  const selectClass = useMemo(() => 
    "w-full rounded-lg border-2 border-transparent bg-slate-50/80 pl-4 pr-10 py-3 text-[#1e3a5f] transition-all duration-200 ease-out focus:border-primary focus:bg-white focus:shadow-md focus:outline-none appearance-none cursor-pointer"
  , []);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "serviceCategory") {
      setFormData((prev) => ({
        fullName: prev.fullName,
        email: prev.email,
        phone: prev.phone,
        serviceCategory: value as FormData["serviceCategory"],
      }));
      setErrors({});
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => {
        if (prev[name]) {
          const { [name]: removed, ...rest } = prev;
          return rest;
        }
        return prev;
      });
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validated = serviceRequestSchema.parse(formData);
      setIsSubmitting(true);

      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit form");
      }

      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        serviceCategory: "",
      });

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<string, string>> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        const errorMessage = error instanceof Error ? error.message : "Failed to submit. Please try again.";
        setErrors({ serviceCategory: errorMessage });
        console.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <motion.div
      className="mx-auto max-w-6xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-widest"
          >
            Request Service
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ArrowDownRight className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed"
        >
          Tell us about your smart building project and we&apos;ll provide tailored solutions for your needs.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {isSuccess ? (
          <motion.div
            className="flex flex-col items-center justify-center rounded-2xl bg-linear-to-br from-emerald-50 to-green-50 border-2 border-emerald-200/50 p-12 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="mb-4 h-16 w-16 text-emerald-500" />
            <p className="text-xl font-semibold text-[#1e3a5f] mb-2">Thank you!</p>
            <p className="text-slate-600">We&apos;ll get back to you soon.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name & Phone */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`${inputClass} text-xs sm:text-base`}
                  placeholder="Full Name"
                />
                {errors.fullName && (
                  <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                    <Info className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${inputClass} text-xs sm:text-base`}
                  placeholder="Phone Number"
                />
                {errors.phone && (
                  <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                    <Info className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputClass} text-xs sm:text-base`}
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                  <Info className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Service Category */}
            <div>
              <label htmlFor="serviceCategory" className="block mb-2 text-sm font-medium text-[#1e3a5f]">Service Category</label>
              <div className="relative">
                <select
                  id="serviceCategory"
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                  className={`${selectClass} text-xs sm:text-base`}
                >
                  <option value="">Select a service</option>
                  <option value="design-consulting">Requesting system design or consulting services</option>
                  <option value="price-quote">Request for a price quote for smart building systems</option>
                  <option value="other">Request other services</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1e3a5f] pointer-events-none" />
              </div>
              {errors.serviceCategory && (
                <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                  <Info className="w-3 h-3" />
                  {errors.serviceCategory}
                </p>
              )}
            </div>

            {/* Design/Consulting Fields */}
            {formData.serviceCategory === "design-consulting" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-[#1e3a5f]">Building Type</label>
                  <select
                    name="buildingType"
                    value={formData.buildingType || ""}
                    onChange={handleChange}
                    className={`${selectClass} text-xs sm:text-base`}
                  >
                    <option value="">Select building type</option>
                    <option value="administrative-buildings">Administrative Buildings</option>
                    <option value="offices">Offices</option>
                    <option value="villas-apartments">Villas and Apartments</option>
                    <option value="residential-complex">Residential Complex</option>
                    <option value="hotels">Hotels</option>
                    <option value="palaces">Palaces</option>
                    <option value="mosques">Mosques</option>
                  </select>
                  <ChevronDown className="absolute right-3 bottom-3 h-5 w-5 text-[#1e3a5f] pointer-events-none" />
                </div>
                {errors.buildingType && (
                  <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                    <Info className="w-3 h-3" />
                    {errors.buildingType}
                  </p>
                )}
              </motion.div>
            )}

            {/* Price Quote Fields */}
            {formData.serviceCategory === "price-quote" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-[#1e3a5f]">Building Type</label>
                  <select
                    name="buildingType"
                    value={formData.buildingType || ""}
                    onChange={handleChange}
                    className={`${selectClass} text-xs sm:text-base`}
                  >
                    <option value="">Select building type</option>
                    <option value="administrative-building">Administrative Building</option>
                    <option value="villa">Villa</option>
                    <option value="offices">Offices</option>
                    <option value="apartments">Apartments</option>
                  </select>
                  <ChevronDown className="absolute right-3 bottom-3 h-5 w-5 text-[#1e3a5f] pointer-events-none" />
                </div>
                {errors.buildingType && (
                  <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                    <Info className="w-3 h-3" />
                    {errors.buildingType}
                  </p>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="number"
                      name="numberOfRooms"
                      value={formData.numberOfRooms || ""}
                      onChange={handleChange}
                      className={`${inputClass} text-xs sm:text-base`}
                      placeholder="Number of Rooms"
                      min="0"
                    />
                    {errors.numberOfRooms && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <Info className="w-3 h-3" />
                        {errors.numberOfRooms}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="number"
                      name="numberOfLightingCircuits"
                      value={formData.numberOfLightingCircuits || ""}
                      onChange={handleChange}
                      className={`${inputClass} text-xs sm:text-base`}
                      placeholder="Number of Lighting Circuits"
                      min="0"
                    />
                    {errors.numberOfLightingCircuits && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <Info className="w-3 h-3" />
                        {errors.numberOfLightingCircuits}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="number"
                      name="numberOfAirConditioningUnits"
                      value={formData.numberOfAirConditioningUnits || ""}
                      onChange={handleChange}
                      className={`${inputClass} text-xs sm:text-base`}
                      placeholder="Number of AC Units"
                      min="0"
                    />
                    {errors.numberOfAirConditioningUnits && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <Info className="w-3 h-3" />
                        {errors.numberOfAirConditioningUnits}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="number"
                      name="numberOfBlinds"
                      value={formData.numberOfBlinds || ""}
                      onChange={handleChange}
                      className={`${inputClass} text-xs sm:text-base`}
                      placeholder="Number of Blinds"
                      min="0"
                    />
                    {errors.numberOfBlinds && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <Info className="w-3 h-3" />
                        {errors.numberOfBlinds}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="number"
                      name="numberOfFloors"
                      value={formData.numberOfFloors || ""}
                      onChange={handleChange}
                      className={`${inputClass} text-xs sm:text-base`}
                      placeholder="Number of Floors"
                      min="0"
                    />
                    {errors.numberOfFloors && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <Info className="w-3 h-3" />
                        {errors.numberOfFloors}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="number"
                      name="numberOfRestrooms"
                      value={formData.numberOfRestrooms || ""}
                      onChange={handleChange}
                      className={`${inputClass} text-xs sm:text-base`}
                      placeholder="Number of Restrooms"
                      min="0"
                    />
                    {errors.numberOfRestrooms && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <Info className="w-3 h-3" />
                        {errors.numberOfRestrooms}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="number"
                      name="numberOfCorridors"
                      value={formData.numberOfCorridors || ""}
                      onChange={handleChange}
                      className={`${inputClass} text-xs sm:text-base`}
                      placeholder="Number of Corridors"
                      min="0"
                    />
                    {errors.numberOfCorridors && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <Info className="w-3 h-3" />
                        {errors.numberOfCorridors}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="number"
                      name="numberOfExteriorDoors"
                      value={formData.numberOfExteriorDoors || ""}
                      onChange={handleChange}
                      className={`${inputClass} text-xs sm:text-base`}
                      placeholder="Number of Exterior Doors"
                      min="0"
                    />
                    {errors.numberOfExteriorDoors && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <Info className="w-3 h-3" />
                        {errors.numberOfExteriorDoors}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="number"
                      name="numberOfExteriorCameras"
                      value={formData.numberOfExteriorCameras || ""}
                      onChange={handleChange}
                      className={`${inputClass} text-xs sm:text-base`}
                      placeholder="Number of Exterior Cameras"
                      min="0"
                    />
                    {errors.numberOfExteriorCameras && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <Info className="w-3 h-3" />
                        {errors.numberOfExteriorCameras}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="number"
                      name="numberOfInteriorCameras"
                      value={formData.numberOfInteriorCameras || ""}
                      onChange={handleChange}
                      className={`${inputClass} text-xs sm:text-base`}
                      placeholder="Number of Interior Cameras"
                      min="0"
                    />
                    {errors.numberOfInteriorCameras && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <Info className="w-3 h-3" />
                        {errors.numberOfInteriorCameras}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    type="number"
                    name="numberOfAudioSystems"
                    value={formData.numberOfAudioSystems || ""}
                    onChange={handleChange}
                    className={`${inputClass} text-xs sm:text-base`}
                    placeholder="Number of Audio Systems"
                    min="0"
                  />
                  {errors.numberOfAudioSystems && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <Info className="w-3 h-3" />
                      {errors.numberOfAudioSystems}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Other Services */}
            {formData.serviceCategory === "other" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <textarea
                  name="requirements"
                  value={formData.requirements || ""}
                  onChange={handleChange}
                  rows={5}
                  className={`${inputClass} text-xs sm:text-base`}
                  placeholder="Please describe your requirements in detail"
                />
                {errors.requirements && (
                  <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                    <Info className="w-3 h-3" />
                    {errors.requirements}
                  </p>
                )}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-primary px-6 py-4 font-semibold text-white transition-all duration-200 hover:shadow-xl hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer flex items-center justify-center"
              whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="mr-3 -ml-1 w-5 h-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-sm sm:text-base">Submitting...</span>
                </>
              ) : (
                <span className="text-sm sm:text-base">Submit Request</span>
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
