// import { Routes } from "../interfaces/routes/Routes";
// import AuthProcessingPage from "../screens/authProcessing/AuthProcessingPage";
// import CommonComponents from "../screens/commonComponents/CommonComponents";

// import HomePage from "../screens/homePage/HomePage";
// import LoginPage from "../screens/loginPage/LoginPage";
// import OnboardingPage from "../screens/onboardingPage/OnboardingPage";
// import RegisterPage from "../screens/registerpage/RegisterPage";
// import CheckEmailPage from "../screens/resetPasswordPage/CheckEmailPage";
// import EnterEmailPage from "../screens/resetPasswordPage/EnterEmailPage";
// import PasswordResetCompletePage from "../screens/resetPasswordPage/PasswordResetCompletePage";
// import ResetPasswordPage from "../screens/resetPasswordPage/ResetPasswordPage";
// import SetNewPasswordPage from "../screens/resetPasswordPage/SetNewPasswordPage";
// // import SetNewpasswordPage from "../screens/resetPasswordPage/SetNewPasswordPage";
// // import EnterEmailPage from "../screens/resetPasswordPage/EnterEmailPage";

// const NavigationRoutes: Array<Routes> = [
//   {
//     id: 1,
//     title: "Home Page",
//     path: "/",
//     component: HomePage,
//   },
//   {
//     id: 2,
//     title: "Register Page",
//     path: "/register",
//     component: RegisterPage,
//   },
//   {
//     id: 3,
//     title: "Login Page",
//     path: "/login",
//     component: LoginPage,
//   },
//   {
//     id: 4,
//     title: "Onboarding Page",
//     path: "/onboarding",
//     private: true,
//     component: OnboardingPage,
//   },
//   {
//     id: 5,
//     title: "Auth Processing Page",
//     path: "/processing",
//     private: true,
//     component: AuthProcessingPage,
//   },
//   {
//     id: 6,
//     title: "Password Reset Page",
//     path: "/reset-password",
//     // private: true,s
//     component: SetNewPasswordPage,
//   },
//   {
//     id: 7,
//     title: "Enter Email Page",
//     path: "/send-link",
//     // private: true,
//     component: ResetPasswordPage,
//   },
//   {
//     id: 8,
//     title: "Common Components",
//     path: "/common-components",
//     private: false,
//     component: CommonComponents,
//   },
//   {
//     id: 9,
//     title: "Password Reset Complete Page",
//     path: "/reset-password-success",
//     // private: true,
//     component: PasswordResetCompletePage,
//   },
// ];

// export default NavigationRoutes;

import { Routes } from "../interfaces/routes/Routes";
import LearningPage from "../screens/learningPage/LearningPage";
import AuthProcessingPage from "../screens/authProcessing/AuthProcessingPage";
import CommonComponents from "../screens/commonComponents/CommonComponents";
import ContactPage from "../screens/contactPage/ContactPage";
import DiscoverPage from "../screens/discover";
import DiscoverPageTwo from "../screens/discover/discover.page";
import FaqPage from "../screens/faqPage/FaqPage";
import HomePage from "../screens/homePage/HomePage";
import LoginPage from "../screens/loginPage/LoginPage";
import MyFeedPage from "../screens/myFeedPage/MyFeedPage";
import OnboardingPage from "../screens/onboardingPage/OnboardingPage";
import PrivacyPage from "../screens/privacyPage/PrivacyPage";
import ViewProfilePage from "../screens/ProfilePage/ViewProfilePage";
import RegisterCompletePage from "../screens/registerpage/RegisterCompletePage";
import RegisterPage from "../screens/registerpage/RegisterPage";
import RegisterVerificationPage from "../screens/registerpage/RegisterVerification";
import PasswordResetCompletePage from "../screens/resetPasswordPage/PasswordResetCompletePage";
import ResetPasswordPage from "../screens/resetPasswordPage/ResetPasswordPage";
import SetNewPasswordPage from "../screens/resetPasswordPage/SetNewPasswordPage";
// import SetNewpasswordPage from "../screens/resetPasswordPage/SetNewPasswordPage";
// import EnterEmailPage from "../screens/resetPasswordPage/EnterEmailPage";
import MyProfile from "../screens/ProfilePage/MyProfile";
import CreateEntity from "../screens/entityPage/CreateEntity";
import Articles from "../screens/articles";
import LinkExpiredPage from "../screens/errorPages/LinkExpiredPage";
import PageNotFound from "../screens/errorPages/PageNotFound";
import EditEntity from "../screens/entityPage/EditEntity";
import PreviewEntity from "../screens/entityPage/PreviewEntity";
import MyEntity from "../screens/entityPage/MyEntity";
import ServicesPage from "../screens/servicesPage/ServicesPage";
import ServicesPageCompleted from "../screens/servicesPage/ServicesPageCompleted";
import WriteNewArticle from "../screens/articles/writeNew";
import ViewArticle from "../screens/articles/viewArticle";
import TermsPage from "../screens/termsPage/TermsPage";
import AboutUsPage from "../screens/aboutUsPage/AboutUsPage";
import ResourcesPage from "../screens/resourcesPage/ResourcesPage";
import CreateEntityServiceProvider from "../screens/entityPage/CreateEntity_Service_Provider";
import CreateEntityServiceSeeker from "../screens/entityPage/CreateEntity_ServiceSeeker";
import DiscoverPagee from "../screens/discover/discover.page_2";
import ViewAllSuggestionsPage from "../screens/discover/viewAllsuggestionsPage";
import ResourceInnerPage from "../screens/resourcesPage/ResourceInnerPage";
import MoreStep from "../screens/registerpage/MoreStep";
import UserProfile from "../screens/ProfilePage/UserProfile";
import emptyResult from "../screens/discover/emptyResult";
import KnowledgePage from "../screens/knowledge/KnowledgePage";
import KnowledgeResults from "../screens/knowledge/KnowledgeResults";
import WelcomeeOnboarding from "../screens/onboardingPage/WelcomeeOnboarding";
import ViewAllSuggestedProviders from "../screens/discover/viewAllSuggestedProviders";
import DiscoverEntityPreview from "../screens/entityPage/DiscoverEntityPreview";
import HiddenPage from "../screens/hiddenPage/HiddenPage";
// import ViewAllSuggestionsPage from "../screens/discover/viewAllsuggestionsPage";

const NavigationRoutes: Array<Routes> = [
  {
    id: 1,
    title: "Home Page",
    path: "/",
    component: HomePage,
  },
  {
    id: 2,
    title: "Register Page",
    path: "/register",
    component: RegisterPage,
  },
  {
    id: 2001,
    title: "Register Complete Page",
    path: "/register-complete",
    component: RegisterCompletePage,
  },
  {
    id: 2002,
    title: "Register Verfication Page",
    path: "/verification",
    component: RegisterVerificationPage,
  },
  {
    id: 3,
    title: "Login Page",
    path: "/login",
    component: LoginPage,
  },
  {
    id: 4,
    title: "Onboarding Page",
    path: "/onboarding",
    private: true,
    component: OnboardingPage,
  },
  {
    id: 5,
    title: "Auth Processing Page",
    path: "/processing",
    private: true,
    component: AuthProcessingPage,
  },
  {
    id: 6,
    title: "Password reset Page",
    path: "/reset-password",
    // private: true,s
    component: SetNewPasswordPage,
  },
  {
    id: 7,
    title: "Enter Email Page",
    path: "/send-link",
    // private: true,
    component: ResetPasswordPage,
  },
  {
    id: 8,
    title: "Password Reset Complete Page",
    path: "/reset-password-success",
    // private: true,
    component: PasswordResetCompletePage,
  },
  {
    id: 9,
    title: "Common Components",
    path: "/common-components",
    private: false,
    component: CommonComponents,
  },
  {
    id: 10,
    title: "About Us Page",
    path: "/about-us",
    // private: true,
    component: AboutUsPage,
  },
  {
    id: 11,
    title: "Contact Page",
    path: "/contact",
    // private: false,
    component: ContactPage,
  },
  {
    id: 12,
    title: "Faq Page",
    path: "/faq",
    // private: true,
    component: FaqPage,
  },
  {
    id: 13,
    title: "Privacy Page",
    path: "/privacy",
    private: false,
    component: PrivacyPage,
  },
  {
    id: 14,
    title: "View Profile Page",
    path: "/profile",
    private: true,
    component: ViewProfilePage,
  },
  {
    id: 15,
    title: "My Feed",
    path: "/feed",
    private: true,
    component: MyFeedPage,
  },
  {
    id: 161,
    title: "My Profile",
    path: "/my-profile",
    private: true,
    component: MyProfile,
  },
  {
    id: 17,
    title: "Tax Global: Discover",
    path: "/discover",
    private: true,
    component: DiscoverPage,
  },
  {
    id: 18,
    title: "Tax Global: Discover",
    path: "/discover/services/keyword/:id",
    private: true,
    component: DiscoverPageTwo,
  },
  {
    id: 182,
    title: "Tax Global: Discoverr",
    path: "/discover/services/results/:id",
    private: true,
    component: DiscoverPagee,
  },
  {
    id: 183,
    title: "Tax Global: Discoverr",
    path: "/discover/viewallsuggestions",
    private: true,
    component: ViewAllSuggestionsPage,
  },
  {
    id: 19,
    title: "Create new Entity",
    path: "/entity/create",
    private: true,
    component: CreateEntity,
  },
  {
    id: 20,
    title: "Tax Global: Articles",
    path: "/articles",
    private: true,
    component: Articles,
  },
  {
    id: 21,
    title: "Link Expired Page",
    path: "/link-expired",
    // private: true,
    component: LinkExpiredPage,
  },
  {
    id: 22,
    title: "Page Not Found",
    path: "/page-not-found",
    // private: true,
    component: PageNotFound,
  },
  {
    id: 23,
    title: "My Entity",
    path: "/entity",
    private: true,
    component: MyEntity,
  },
  {
    id: 24,
    title: "Preview Entity",
    path: "/entity/preview",
    private: true,
    component: PreviewEntity,
  },
  {
    id: 25,
    title: "Edit Entity",
    path: "/entity/edit",
    private: true,
    component: EditEntity,
  },
  {
    id: 251,
    title: "Services Page",
    path: "/services",
    private: true,
    component: ServicesPage,
  },
  {
    id: 252,
    title: "Services Page Completed",
    path: "/services/completed",
    private: true,
    component: ServicesPageCompleted,
  },
  {
    id: 26,
    title: "Tax Global: Articles",
    path: "/articles/write-new-article",
    private: true,
    component: WriteNewArticle,
  },
  {
    id: 27,
    title: "Tax Global: Articles",
    path: "/articles/view",
    private: true,
    component: ViewArticle,
  },
  {
    id: 28,
    title: "Terms and Conditions",
    path: "/terms",
    private: false,
    component: TermsPage,
  },
  {
    id: 29,
    title: "Learning",
    path: "/learning",
    private: true,
    component: LearningPage,
  },
  {
    id: 30,
    title: "Resources",
    path: "/resources",
    private: true,
    component: ResourcesPage,
  },
  {
    id: 31,
    title: "Create new Entity Service Provider",
    path: "/entity/create/service-provider",
    private: true,
    component: CreateEntityServiceProvider,
  },
  {
    id: 32,
    title: "Create new Entity Service Seeker",
    path: "/entity/create/service-seeker",
    private: false,
    component: CreateEntityServiceSeeker,
  },
  {
    id: 33,
    title: "View Resource",
    path: "/resource/:slug",
    private: true,
    component: ResourceInnerPage,
  },
  {
    id: 34,
    title: "Few more details",
    path: "/register/moreinfo",
    private: true,
    component: MoreStep,
  },
  {
    id: 35,
    title: "View User Profile",
    path: "/profile/:slug",
    private: true,
    component: UserProfile,
  },
  {
    id: 36,
    title: "Empty results",
    path: "/discover/empty",
    private: true,
    component: emptyResult,
  },
  {
    id: 37,
    title: "Knowledge Page",
    path: "/knowledge",
   // private: true,
    component: KnowledgePage,
  },
  {
    id: 38,
    title: "Knowledge Results",
    path: "/knowledge/services/keyword/:id",
   // private: true,
    component: KnowledgeResults,
  },
  {
    id: 39,
    title: "Knowledge Results",
    path: "/welcomeonboarding",
   // private: true,
    component: WelcomeeOnboarding,
  },
  {
    id: 40,
    title: "View All Suggested Providers",
    path: "discover/viewallsuggestedproviders",
 //   private: true,
    component: ViewAllSuggestedProviders,
  },
  {
    id: 41,
    title: "Entity : Slug",
    path: "/entity/:id",
    private: true,
    component: DiscoverEntityPreview,
  },
  {
    id: 41,
    title: "User",
    path: "/hidden/asdfghjkl",
    private: true,
    component: HiddenPage,
  },
  {
    id: 42,
    title: "Page Not Found",
    path: "*",
    // private: true,
    component: PageNotFound,
  },
];
export default NavigationRoutes;
