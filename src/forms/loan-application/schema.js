import z from "zod";

// ------------------ Zod Schema ------------------
export const loanSchema = z.object({
  loanAmount: z
    .number({ invalid_type_error: "Enter a valid amount" })
    .positive("Must be greater than 0"),
  annualIncome: z
    .number({ invalid_type_error: "Enter a valid income" })
    .positive(),
  bankStatement: z
    .custom((files) => files && files.length > 0, "Bank statement is required")
    .refine(
      (files) =>
        files &&
        ["application/pdf", "image/png", "image/jpeg"].includes(files[0]?.type),
      "Only PDF, PNG, or JPEG formats are allowed"
    ),
  loanPurpose: z.string().min(1, "Select a loan purpose"),
  otherPurpose: z.string().optional(),
  title: z.string().min(1, "Required"),
  firstName: z.string().min(2, "Too short"),
  lastName: z.string().min(2, "Too short"),
  maritalStatus: z.string().min(1, "Select marital status"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Invalid phone number"),
  street: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  postalCode: z.string().min(3, "Invalid postal/ZIP"),
  occupation: z.string().min(1, "Required"),
  employerFirstName: z.string().min(1, "Required"),
  employerLastName: z.string().min(1, "Required"),
  companyName: z.string().min(1, "Required"),
  yearsExperience: z
    .number({ invalid_type_error: "Enter a valid number" })
    .min(0),
  grossMonthlyIncome: z
    .number({ invalid_type_error: "Enter a valid amount" })
    .min(0),
  monthlyRent: z.number({ invalid_type_error: "Enter a valid amount" }).min(0),
  downPayment: z.number({ invalid_type_error: "Enter a valid amount" }).min(0),
  comments: z.string().optional(),
});
