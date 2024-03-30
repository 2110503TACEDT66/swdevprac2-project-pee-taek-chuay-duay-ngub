import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import JobList from "@/components/explore/Joblist"; // Adjust this path to where your JobList component is located
import { SessionProvider } from "next-auth/react";

// Mock data for jobs
const mockJobs = [
  {
    _id: "1",
    name: "Company One",
    address: "Address One",
    website: "https://companyone.example.com",
    image: "/path/to/image1.jpg",
    description: "Description One",
    telephoneNumber: "111-111-1111",
    __v: 0,
    id: "1",
  },
  {
    _id: "2",
    name: "Company Two",
    address: "Address Two",
    website: "https://companytwo.example.com",
    image: "/path/to/image2.jpg",
    description: "Description Two",
    telephoneNumber: "222-222-2222",
    __v: 0,
    id: "2",
  },
];

// Mocking fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: mockJobs }),
  })
) as jest.Mock;

// Mocking next-auth useSession hook
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({ data: { user: { role: "admin" } } })),
}));

describe("JobList Component", () => {
  it("renders jobs correctly", async () => {
    render(<JobList />);

    await waitFor(() => {
      expect(screen.queryByText("Company One")).toBeInTheDocument;
      expect(screen.queryByText("Company Two")).toBeInTheDocument;
    });
  });

  it("filters jobs based on search term", async () => {
    render(<JobList />);

    // Simulate user typing in the search input
    fireEvent.change(screen.getByPlaceholderText("Search companies..."), {
      target: { value: "One" },
    });

    await waitFor(() => {
      expect(screen.getByText("Company One")).toBeInTheDocument;
      // Using toBeNull for "Company Two" as it should not be found after filtering
      expect(screen.queryByText("Company Two")).not.toBeInTheDocument;
    });
  });
});
