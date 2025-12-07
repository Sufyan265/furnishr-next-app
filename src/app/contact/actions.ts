"use server";

import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormValues = z.infer<typeof formSchema>;
export { formSchema };

export async function submitContactForm(data: ContactFormValues) {
  console.log("Contact form submitted:", data);
  // Here you would typically send an email or save to a database.
  // We'll simulate a successful submission.
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: "Thank you for your message! We'll be in touch soon." };
}