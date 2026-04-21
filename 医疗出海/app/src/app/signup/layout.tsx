import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Himedi account to book health screening packages.",
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
