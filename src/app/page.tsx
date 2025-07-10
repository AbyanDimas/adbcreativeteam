// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import OutImpressiveStats from "./out-impressive-stats";
import CoursesCategories from "./courses-categories";
import ExploreCourses from "./explore-courses";
import Testimonial from "./testimonial";
import Events from "./events";
import StudentsFeedback from "./students-feedback";
import TrustedCompany from "./trusted-companies";
import SponsorHighlightPage from "./sponsors";
import TentengKami from "./tentangkami";

export default function Campaign() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <OutImpressiveStats />
      <CoursesCategories />
      <ExploreCourses />
      <Testimonial />
      <Events />
      <SponsorHighlightPage />
      <TentengKami />
      <StudentsFeedback />
      <TrustedCompany />
      <Footer />
    </>
  );
}
