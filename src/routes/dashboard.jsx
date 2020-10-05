import Dashboard from "views/Dashboard/Dashboard.jsx";
import Buttons from "views/Components/Buttons.jsx";
import GridSystem from "views/Components/GridSystem.jsx";
import Panels from "views/Components/Panels.jsx";
import SweetAlert from "views/Components/SweetAlertPage.jsx";
import Notifications from "views/Components/Notifications.jsx";
import Icons from "views/Components/Icons.jsx";
import Typography from "views/Components/Typography.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";
import ExtendedForms from "views/Forms/ExtendedForms.jsx";
import ValidationForms from "views/Forms/ValidationForms.jsx";
import Wizard from "views/Forms/Wizard/Wizard.jsx";
import RegularTables from "views/Tables/RegularTables.jsx";
import ExtendedTables from "views/Tables/ExtendedTables.jsx";
import ReactTable from "views/Tables/ReactTable.jsx";
import GoogleMaps from "views/Maps/GoogleMaps.jsx";
import FullScreenMap from "views/Maps/FullScreenMap.jsx";
import VectorMap from "views/Maps/VectorMap.jsx";
import Charts from "views/Charts/Charts.jsx";
import Calendar from "views/Calendar/Calendar.jsx";
import Widgets from "views/Widgets/Widgets.jsx";
import AddCourse from "views/Courses/Wizard/Addcourse";
import UserPage from "views/Pages/UserPage.jsx";
import Payment from "views/Payment/Payment.jsx";
import TimelinePage from "views/Pages/TimelinePage.jsx";
import addstudent from "views/Students/addstudents.jsx";
import viewstudents from "views/Students/viewstudents.jsx";
// import editstudent from "views/students/editstudents.jsx";
import pagesRoutes from "./pages.jsx";
import ViewCourses from "../views/Courses/ViewCourses.jsx";
//{ path: "/editstudent", name: "Edit Student", mini: "E", component: editstudent }
var pages = [
  {
    path: "/timeline-page",
    name: "Timeline Page",
    mini: "TP",
    component: TimelinePage
  },
  { path: "/user-page", name: "User Profile", mini: "UP", component: UserPage }
].concat(pagesRoutes);

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    lvl: 2,
    icon: "design_app",
    component: Dashboard
  },
  {
    collapse: true,
    path: "/Student",
    name: "Student",
    lvl: 2,
    icon: "users_single-02",
    views: [
      {
        path: "/newstudent",
        mini: "N",
        name: "New student",
        icon: "users_single-02",
        component: addstudent
      },
      {
        path: "/View",
        name: "Students",
        mini: "S",
        component: viewstudents,
        invisible: true
      }
    ]
  },
  {
    collapse: true,
    path: "/Courses",
    name: "Courses",
    state: "courseopen",
    lvl: 1,
    icon: "objects_planet",
    views: [
      {
        path: "/Addcourse",
        mini: "N",
        name: "Add Course",
        icon: "education_atom",
        component: AddCourse
      }
      // {
      //   lvl: 2,
      //   path: "/Viewcourse",
      //   mini: "VC",
      //   name: "View Courses",
      //   icon: "education_atom",
      //   component: ViewCourses
      // }
    ]
  },

  {
    collapse: true,
    path: "/payments",
    lvl: 2,
    name: "Payments",
    state: "openpayments",
    icon: "business_bank",
    views: [
      {
        path: "/payments/add",
        name: "New Payment",
        icon: "business_money-coins",
        component: Payment
      }
    ]
  },

  {
    path: "/calendar",
    lvl: 2,
    name: "Calendar",
    icon: "media-1_album",
    component: Calendar
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
