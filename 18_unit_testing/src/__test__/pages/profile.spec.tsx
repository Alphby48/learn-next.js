import ProfilePage from "@/pages/profile";
import { render, RenderResult } from "@testing-library/react";

describe("Profile Page", () => {
  it("render profile page", () => {
    const page = render(<ProfilePage />);
    expect(page).toMatchSnapshot();
  });
});
