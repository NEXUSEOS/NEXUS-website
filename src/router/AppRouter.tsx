import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute, RoleGuard } from '../components/auth'
import { developerPortalRoles, platformAdminRoles, sponsorPortalRoles } from '../config/permissions'
import { DeveloperPortalLayout, MainLayout, SponsorPortalLayout, AdminLayout } from '../layouts'
import LoadingFallback from './LoadingFallback'

const Home = lazy(() => import('../pages/Home/Home'))
const Atlas = lazy(() => import('../pages/Atlas/Atlas'))
const Nova = lazy(() => import('../pages/Nova/Nova'))
const Sentinel = lazy(() => import('../pages/Sentinel/Sentinel'))
const Studio = lazy(() => import('../pages/Studio/Studio'))
const Marketplace = lazy(() => import('../pages/Marketplace/Marketplace'))
const Developers = lazy(() => import('../pages/Developers/Developers'))
const Sponsors = lazy(() => import('../pages/Sponsors/Sponsors'))
const Documentation = lazy(() => import('../pages/Documentation/Documentation'))
const Roadmap = lazy(() => import('../pages/Roadmap/Roadmap'))
const Contact = lazy(() => import('../pages/Contact/Contact'))
const Login = lazy(() => import('../pages/Auth/Login'))
const CreateAdministrator = lazy(() => import('../pages/Auth/CreateAdministrator'))
const SignUp = lazy(() => import('../pages/Auth/SignUp'))
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword'))
const ResetPassword = lazy(() => import('../pages/Auth/ResetPassword'))
const VerifyEmail = lazy(() => import('../pages/Auth/VerifyEmail'))
const AccountSettings = lazy(() => import('../pages/Account/AccountSettings'))
const DownloadCenter = lazy(() => import('../pages/Download/DownloadCenter'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))

const DocsHub = lazy(() => import('../pages/Docs/DocsHub'))
const DocsSectionPage = lazy(() => import('../pages/Docs/DocsSectionPage'))
const SdkDocsHub = lazy(() => import('../pages/Docs/SdkDocsHub'))
const SdkDocSection = lazy(() => import('../pages/Docs/SdkDocSection'))
const BlogIndex = lazy(() => import('../pages/Blog/BlogIndex'))
const BlogPost = lazy(() => import('../pages/Blog/BlogPost'))
const CmsDynamicPage = lazy(() => import('../pages/Cms/CmsDynamicPage'))
const Releases = lazy(() => import('../pages/Releases/Releases'))
const ChangelogPage = lazy(() => import('../pages/Changelog/ChangelogPage'))
const ArchitectureHub = lazy(() => import('../pages/Docs/ArchitectureDocs'))
const ArchitectureDocPage = lazy(() =>
  import('../pages/Docs/ArchitectureDocs').then((module) => ({ default: module.ArchitectureDocPage })),
)
const MdxDocPage = lazy(() => import('../pages/Docs/MdxDocPage'))

const SponsorTiersPublic = lazy(() => import('../pages/Sponsors/SponsorTiersPublic'))

const BetaDashboard = lazy(() => import('../pages/Beta/BetaDashboard'))
const BetaApplicationPage = lazy(() => import('../pages/Beta/BetaApplicationPage'))
const DeveloperInvitations = lazy(() => import('../pages/Beta/DeveloperInvitations'))
const FeedbackCenter = lazy(() => import('../pages/Beta/FeedbackCenter'))
const BugReporting = lazy(() => import('../pages/Beta/BugReporting'))
const CrashAnalytics = lazy(() => import('../pages/Beta/CrashAnalytics'))
const ReleaseChannelsPage = lazy(() => import('../pages/Releases/ReleaseChannelsPage'))
const DeveloperOnboarding = lazy(() => import('../pages/Onboarding/DeveloperOnboarding'))
const SponsorOnboarding = lazy(() => import('../pages/Onboarding/SponsorOnboarding'))
const Community = lazy(() => import('../pages/Community/Community'))
const SupportCenter = lazy(() => import('../pages/Support/SupportCenter'))
const KnowledgeBase = lazy(() => import('../pages/Support/KnowledgeBase'))
const StatusPage = lazy(() => import('../pages/Support/StatusPage'))
const FeedbackPortal = lazy(() => import('../pages/Support/FeedbackPortal'))
const IssueTracking = lazy(() => import('../pages/Support/IssueTracking'))
const LaunchChecklist = lazy(() => import('../pages/Launch/LaunchChecklist'))
const AdminSetup = lazy(() => import('../pages/Admin/AdminSetup'))
const AdminInstallation = lazy(() => import('../pages/Admin/AdminInstallation'))
const AdminDashboard = lazy(() => import('../pages/Admin/AdminDashboard'))
const AdminCmsBuilder = lazy(() => import('../pages/Admin/AdminCmsBuilder'))
const AdminThemeEditor = lazy(() => import('../pages/Admin/AdminThemeEditor'))
const AdminConfig = lazy(() => import('../pages/Admin/AdminConfig'))
const AdminJobs = lazy(() => import('../pages/Admin/AdminJobs'))
const AdminEvents = lazy(() => import('../pages/Admin/AdminEvents'))
const AdminSecrets = lazy(() => import('../pages/Admin/AdminSecrets'))
const AdminServices = lazy(() => import('../pages/Admin/AdminServices'))
const AdminConnections = lazy(() => import('../pages/Admin/AdminConnections'))
const AdminDeployment = lazy(() => import('../pages/Admin/AdminDeployment'))
const AdminMonitoring = lazy(() => import('../pages/Admin/AdminMonitoring'))
const AdminRecovery = lazy(() => import('../pages/Admin/AdminRecovery'))
const PublicBetaHub = lazy(() => import('../pages/Beta/PublicBetaHub'))
const CustomerOnboarding = lazy(() => import('../pages/Onboarding/CustomerOnboarding'))
const LearningCenter = lazy(() => import('../pages/Learning/LearningCenter'))
const DemoProjects = lazy(() => import('../pages/Demos/DemoProjects'))

const DeveloperDashboard = lazy(() => import('../pages/DeveloperPortal/DeveloperDashboard'))
const DeveloperSdk = lazy(() => import('../pages/DeveloperPortal/DeveloperSdk'))
const DeveloperDocs = lazy(() => import('../pages/DeveloperPortal/DeveloperDocs'))
const DeveloperApiKeys = lazy(() => import('../pages/DeveloperPortal/DeveloperApiKeys'))
const DeveloperProjects = lazy(() => import('../pages/DeveloperPortal/DeveloperProjects'))
const DeveloperAnnouncements = lazy(() => import('../pages/DeveloperPortal/DeveloperAnnouncements'))
const DeveloperAnalytics = lazy(() => import('../pages/DeveloperPortal/DeveloperAnalytics'))
const DeveloperOrganizations = lazy(() => import('../pages/DeveloperPortal/DeveloperOrganizations'))
const DeveloperMarketplaceWizard = lazy(() => import('../pages/DeveloperPortal/DeveloperMarketplaceWizard'))
const DeveloperReleaseHistory = lazy(() => import('../pages/DeveloperPortal/DeveloperReleaseHistory'))
const DeveloperSimulation = lazy(() => import('../pages/DeveloperPortal/DeveloperSimulation'))
const DeveloperApplications = lazy(() => import('../pages/DeveloperPortal/DeveloperApplications'))
const DeveloperRobotRegistry = lazy(() => import('../pages/DeveloperPortal/DeveloperRobotRegistry'))
const DeveloperApiExplorer = lazy(() => import('../pages/DeveloperPortal/DeveloperApiExplorer'))
const DeveloperSdkExplorer = lazy(() => import('../pages/DeveloperPortal/DeveloperSdkExplorer'))
const DeveloperPlayground = lazy(() => import('../pages/DeveloperPortal/DeveloperPlayground'))
const DeveloperTutorialEngine = lazy(() => import('../pages/DeveloperPortal/DeveloperTutorialEngine'))
const DeveloperSdkWizard = lazy(() => import('../pages/DeveloperPortal/DeveloperSdkWizard'))
const DeveloperAiAssistant = lazy(() => import('../pages/DeveloperPortal/DeveloperAiAssistant'))
const UnifiedCopilotPage = lazy(() => import('../pages/Copilot/UnifiedCopilotPage'))
const VisualDevHubPage = lazy(() => import('../pages/VisualDev/VisualDevHubPage'))
const AtlasEngineeringHubPage = lazy(() => import('../pages/AtlasEngineering/AtlasEngineeringHubPage'))
const DeveloperCertificationDashboard = lazy(() => import('../pages/DeveloperPortal/DeveloperCertificationDashboard'))
const DeveloperExampleLibrary = lazy(() => import('../pages/DeveloperPortal/DeveloperExampleLibrary'))
const DeveloperReputation = lazy(() => import('../pages/DeveloperPortal/DeveloperReputation'))
const DeveloperCodeGenerator = lazy(() => import('../pages/DeveloperPortal/DeveloperCodeGenerator'))

const BehaviorList = lazy(() => import('../pages/Behavior/BehaviorList'))
const BehaviorEditor = lazy(() => import('../pages/Behavior/BehaviorEditor'))
const BehaviorDetail = lazy(() => import('../pages/Behavior/BehaviorDetail'))

const SponsorPartnershipStatus = lazy(() => import('../pages/SponsorPortal/SponsorPartnershipStatus'))
const SponsorApply = lazy(() => import('../pages/SponsorPortal/SponsorApply'))
const SponsorOrganization = lazy(() => import('../pages/SponsorPortal/SponsorOrganization'))
const SponsorTiers = lazy(() => import('../pages/SponsorPortal/SponsorTiers'))
const SponsorRoadmapAccess = lazy(() => import('../pages/SponsorPortal/SponsorRoadmapAccess'))

const PricingPage = lazy(() => import('../pages/Commercial/PricingPage'))
const WaitlistPage = lazy(() => import('../pages/Commercial/WaitlistPage'))
const CheckoutSuccessPage = lazy(() => import('../pages/Commercial/CheckoutSuccessPage'))
const CheckoutCancelPage = lazy(() => import('../pages/Commercial/CheckoutCancelPage'))
const DeveloperBillingPage = lazy(() => import('../pages/Commercial/DeveloperBillingPage'))
const DeveloperPayoutsPage = lazy(() => import('../pages/Commercial/DeveloperPayoutsPage'))
const DeveloperActivityFeed = lazy(() => import('../pages/DeveloperPortal/DeveloperActivityFeed'))
const SponsorBillingPage = lazy(() => import('../pages/Commercial/SponsorBillingPage'))
const Mission = lazy(() => import('../pages/Mission/Mission'))
const News = lazy(() => import('../pages/News/News'))
const Company = lazy(() => import('../pages/Company/Company'))
const About = lazy(() => import('../pages/About/About'))
const Vision = lazy(() => import('../pages/Vision/Vision'))
const Technology = lazy(() => import('../pages/Technology/Technology'))
const Robots = lazy(() => import('../pages/Robots/Robots'))
const Investors = lazy(() => import('../pages/Investors/Investors'))
const Careers = lazy(() => import('../pages/Careers/Careers'))
const Legal = lazy(() => import('../pages/Legal/Legal'))
const Privacy = lazy(() => import('../pages/Legal/Privacy'))
const Terms = lazy(() => import('../pages/Legal/Terms'))
const DownloadMarketing = lazy(() => import('../pages/Download/DownloadMarketing'))
const SdkLanding = lazy(() => import('../pages/Sdk/SdkLanding'))
const StudioDownload = lazy(() => import('../pages/Download/StudioDownload'))

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/atlas" element={<Atlas />} />
          <Route path="/nova" element={<Nova />} />
          <Route path="/sentinel" element={<Sentinel />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/sponsors/tiers" element={<SponsorTiersPublic />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/docs" element={<DocsHub />} />
          <Route path="/docs/sdk" element={<SdkDocsHub />} />
          <Route path="/docs/sdk/:sectionId" element={<SdkDocSection />} />
          <Route path="/docs/api" element={<DocsSectionPage sectionId="api" />} />
          <Route path="/docs/tutorials" element={<DocsSectionPage sectionId="tutorials" />} />
          <Route path="/docs/tutorials/:slug" element={<MdxDocPage />} />
          <Route path="/docs/guides" element={<DocsSectionPage sectionId="guides" />} />
          <Route path="/docs/guides/:slug" element={<MdxDocPage />} />
          <Route path="/docs/examples" element={<DocsSectionPage sectionId="examples" />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/pages/:slug" element={<CmsDynamicPage />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/releases/channels" element={<ReleaseChannelsPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/developers/onboarding" element={<DeveloperOnboarding />} />
          <Route path="/sponsors/onboarding" element={<SponsorOnboarding />} />
          <Route path="/support" element={<SupportCenter />} />
          <Route path="/copilot" element={<UnifiedCopilotPage />} />
          <Route path="/visual-dev" element={<VisualDevHubPage />} />
          <Route path="/atlas-engineering" element={<AtlasEngineeringHubPage />} />
          <Route path="/support/knowledge" element={<KnowledgeBase />} />
          <Route path="/support/knowledge/:slug" element={<KnowledgeBase />} />
          <Route path="/support/feedback" element={<FeedbackPortal />} />
          <Route path="/support/issues" element={<IssueTracking />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/launch/checklist" element={<LaunchChecklist />} />
          <Route path="/admin/create-administrator" element={<CreateAdministrator />} />
          <Route path="/admin/setup" element={<AdminSetup />} />
          <Route path="/admin/installation" element={<AdminInstallation />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <RoleGuard allowedRoles={platformAdminRoles} portalName="Platform Administration">
                  <AdminLayout />
                </RoleGuard>
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="cms" element={<AdminCmsBuilder />} />
            <Route path="theme" element={<AdminThemeEditor />} />
            <Route path="config" element={<AdminConfig />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="secrets" element={<AdminSecrets />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="connections" element={<AdminConnections />} />
            <Route path="deployment" element={<AdminDeployment />} />
            <Route path="monitoring" element={<AdminMonitoring />} />
            <Route path="recovery" element={<AdminRecovery />} />
          </Route>
          <Route path="/beta" element={<PublicBetaHub />} />
          <Route path="/beta/apply" element={<BetaApplicationPage />} />
          <Route path="/customers/onboarding" element={<CustomerOnboarding />} />
          <Route path="/learning" element={<LearningCenter />} />
          <Route path="/demos" element={<DemoProjects />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
          <Route path="/docs/architecture" element={<ArchitectureHub />} />
          <Route path="/docs/architecture/:docId" element={<ArchitectureDocPage />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/company" element={<Company />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/news" element={<News />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/robots" element={<Robots />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/download" element={<DownloadMarketing />} />
          <Route path="/sdk" element={<SdkLanding />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/verify-email" element={<VerifyEmail />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/downloads"
            element={
              <ProtectedRoute>
                <DownloadCenter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/download/studio"
            element={
              <ProtectedRoute>
                <StudioDownload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/developers/portal"
            element={
              <ProtectedRoute>
                <RoleGuard allowedRoles={developerPortalRoles} portalName="Developer Portal">
                  <DeveloperPortalLayout />
                </RoleGuard>
              </ProtectedRoute>
            }
          >
            <Route index element={<DeveloperDashboard />} />
            <Route path="sdk" element={<DeveloperSdk />} />
            <Route path="docs" element={<DeveloperDocs />} />
            <Route path="api-keys" element={<DeveloperApiKeys />} />
            <Route path="projects" element={<DeveloperProjects />} />
            <Route path="announcements" element={<DeveloperAnnouncements />} />
            <Route path="applications" element={<DeveloperApplications />} />
            <Route path="organizations" element={<DeveloperOrganizations />} />
            <Route path="robot-registry" element={<DeveloperRobotRegistry />} />
            <Route path="behaviors" element={<BehaviorList />} />
            <Route path="behaviors/new" element={<BehaviorEditor />} />
            <Route path="behaviors/:behaviorId" element={<BehaviorDetail />} />
            <Route path="simulation" element={<DeveloperSimulation />} />
            <Route path="marketplace-uploads" element={<DeveloperMarketplaceWizard />} />
            <Route path="release-history" element={<DeveloperReleaseHistory />} />
            <Route path="analytics" element={<DeveloperAnalytics />} />
            <Route path="api-explorer" element={<DeveloperApiExplorer />} />
            <Route path="sdk-explorer" element={<DeveloperSdkExplorer />} />
            <Route path="playground" element={<DeveloperPlayground />} />
            <Route path="tutorials" element={<DeveloperTutorialEngine />} />
            <Route path="sdk-wizard" element={<DeveloperSdkWizard />} />
            <Route path="beta" element={<BetaDashboard />} />
            <Route path="invitations" element={<DeveloperInvitations />} />
            <Route path="feedback" element={<FeedbackCenter />} />
            <Route path="bug-report" element={<BugReporting />} />
            <Route path="crashes" element={<CrashAnalytics />} />
            <Route path="billing" element={<DeveloperBillingPage />} />
            <Route path="payouts" element={<DeveloperPayoutsPage />} />
            <Route path="activity" element={<DeveloperActivityFeed />} />
            <Route path="ai-assistant" element={<DeveloperAiAssistant />} />
            <Route path="certification" element={<DeveloperCertificationDashboard />} />
            <Route path="examples" element={<DeveloperExampleLibrary />} />
            <Route path="reputation" element={<DeveloperReputation />} />
            <Route path="code-generator" element={<DeveloperCodeGenerator />} />
          </Route>
          <Route
            path="/sponsors/portal"
            element={
              <ProtectedRoute>
                <RoleGuard allowedRoles={sponsorPortalRoles} portalName="Sponsor Portal">
                  <SponsorPortalLayout />
                </RoleGuard>
              </ProtectedRoute>
            }
          >
            <Route index element={<SponsorPartnershipStatus />} />
            <Route path="apply" element={<SponsorApply />} />
            <Route path="organization" element={<SponsorOrganization />} />
            <Route path="tiers" element={<SponsorTiers />} />
            <Route path="roadmap" element={<SponsorRoadmapAccess />} />
            <Route path="billing" element={<SponsorBillingPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
