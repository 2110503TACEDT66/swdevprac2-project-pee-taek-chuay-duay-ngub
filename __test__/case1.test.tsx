import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar"; // Adjust the import path according to your file structure
import { SessionProvider } from "next-auth/react";
import NextAuthProvider from "@/components/nextauth";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");
describe("Navbar", () => {
  it("does show the Log In button when the user is logged in", () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: {},
      status: "unauthenticated",
    });

    render(<Navbar />);

    // Check if the Log In button is in the document, if no session is found
    const loginButton = screen.findByText("เข้าสู่ระบบ");
    expect(loginButton).not.toBeNull();
  });

  it("does not shows the Log In button when the user is not logged in", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: "username", // not actual user data, could be anything
        },
      },
      status: "authenticated",
    });
    // Check if the Log In button is in the document, if session is found
    const loginButton2 = screen.queryByText("เข้าสู่ระบบ");
    expect(loginButton2).toBeNull(); // expect null because the user is logged in
  });
});
