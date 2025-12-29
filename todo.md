# Fantasy Cricket Platform - TODO

Based on the 37-page PDF guide "The Ultimate Guide to Building a Fantasy Cricket Platform"

## Part 1: Project Setup, Core Configuration, and Base Styles (Pages 1-3)
- [x] Step 1.1: Project initialization (adapted to existing template)
- [x] Step 1.2: Install dependencies (using template dependencies)
- [x] Step 1.3: Environment variables (using template env system)
- [x] Step 1.4: Base styles - dark theme in index.css
- [x] Step 1.5: Root layout with metadata

## Part 2: Database Schema, ORM, and Initialization API (Pages 3-6)
- [x] Step 2.1: Drizzle ORM configuration
- [x] Step 2.2: Database schema with 5 tables:
  - [x] users (id, name, email, openId, role, createdAt)
  - [x] user_teams (id, userId, matchId, name, captainId, viceCaptainId, totalCreditsUsed, createdAt)
  - [x] team_players (id, teamId, playerId, playerName, playerRole, playerCredits)
  - [x] contests (id, matchId, name, entryFee, prizePool, maxEntries, currentEntries, status, createdAt)
  - [x] contest_entries (id, contestId, userId, teamId, points, rankPosition, createdAt)
- [x] Step 2.3: Database connection (server/db.ts)
- [x] Step 2.4: Database queries for all tables
- [x] Step 2.5: Generate and apply migrations

## Part 3: Authentication and User API (Pages 7-12)
- [x] Step 3.1: Authentication system (using Manus OAuth)
- [x] Step 3.2: User registration (handled by Manus OAuth)
- [x] Step 3.3: Login (handled by Manus OAuth)
- [x] Step 3.4: User session management

## Part 4: Cricket Data API Integration and Match Display (Pages 12-14)
- [x] Step 4.1: Cricket API library (server/cricketApi.ts)
  - [x] getMatches() function with demo data fallback
  - [x] getMatchSquad(matchId) function with demo data
- [x] Step 4.2: CricScore API route (tRPC cricket.getMatches)
- [x] Step 4.3: Match squad API route (tRPC cricket.getSquad)

## Part 5: Core Application Pages (Pages 14-19)
- [x] Step 5.1: Header component with navigation and auth state
- [x] Step 5.2: Footer component with Quick Links, Legal links, company info
- [x] Step 5.3: Homepage with:
  - [x] Hero section ("Fantasy Cricket Reimagined")
  - [x] Stats section (Active Users, Daily Contests, Prizes Won, Secure)
  - [x] Features section
  - [x] Match sections (Live, Upcoming, Completed)
  - [x] CTA section
- [x] Step 5.4: Dashboard page (/dashboard)
- [x] Step 5.5: Matches page (/matches)

## Part 6: Team Creation Flow (Pages 19-22)
- [x] Step 6.1: Team creation API (tRPC teams.create)
  - [x] Validate 11 players selected
  - [x] Validate captain and vice-captain
  - [x] Insert into user_teams and team_players tables
- [x] Step 6.2: Team creation page (/create-team/:matchId) with multi-step flow:
  - [x] Step 1: Player selection interface with credit system (100 credits)
  - [x] Step 2: Captain (2x) and Vice-Captain (1.5x) selection
  - [x] Step 3: Team preview and save
  - [x] Player credits: random 7-10 credits per player
  - [x] MatchCard component for displaying players

## Part 7: Contest System (Pages 22-26)
- [x] Step 7.1: Contest list API (tRPC contests.getByMatch)
- [x] Step 7.2: Contest seeding API (tRPC contests.seed) with sample contests:
  - [x] Mega Contest (entry: 10, prize: 1000, max: 100)
  - [x] Head to Head (entry: 50, prize: 90, max: 2)
  - [x] Winner Takes All (entry: 25, prize: 225, max: 10)
- [x] Step 7.3: Join contest API (tRPC contests.join) with validation
- [x] Step 7.4: Match contests page (/contests/:matchId)
- [x] My entries API (tRPC contests.myEntries)
- [x] Contest leaderboard API (tRPC contests.leaderboard)
- [x] Leaderboard page (/leaderboard/:contestId)

## Part 8: Live Score System and Automated Contest Sync (Pages 26-29)
- [x] Step 8.1: Live score page (/live-score/:matchId) with:
  - [x] Auto-refresh every 30 seconds
  - [x] Toggle button to enable/disable auto-refresh
  - [x] Match score display (teams, score, status)
- [x] Step 8.2: Contest sync API (tRPC contests.sync)
  - [x] Update contest statuses based on match status
  - [x] Auto-create contests for new upcoming matches
- [ ] Step 8.3: Cron job for automated sync (to be configured)

## Part 9: Informational Pages and Final Touches (Pages 30-31)
- [x] Step 9.1: Create 8 informational pages:
  - [x] About page (/about)
  - [x] How to Play page (/how-to-play)
  - [x] FAQ page (/faq)
  - [x] Contact page (/contact)
  - [x] Terms of Service page (/terms)
  - [x] Privacy Policy page (/privacy)
  - [x] Fair Play Policy page (/fair-play)
  - [x] Responsible Gaming page (/responsible-gaming)
- [x] Step 9.2: Final styling and UI polish
  - [x] Dark theme consistency
  - [x] Text visibility check
  - [x] Logo and branding
  - [x] Images created
  - [x] Responsive design
- [x] Step 9.3: Environment variables configured

## Part 10: Deployment and Final Verification (Pages 31-32)
- [ ] Step 10.1: Build the project (pnpm build)
- [x] Step 10.2: Write and run tests (11 tests passing)
- [ ] Step 10.3: Final verification checklist:
  - [ ] User login via Manus OAuth
  - [ ] Match display on homepage and matches page
  - [ ] Team creation for upcoming match
  - [ ] Contest seeding
  - [ ] Join contest with team
  - [ ] Live scores with auto-refresh
  - [ ] Contest sync and status updates
  - [ ] Leaderboard rankings

## Additional Components (Appendix A, Pages 33-35)
- [x] My Teams page (/my-teams)
- [x] My Contests page (/my-contests)
- [x] Live Score page (/live-score/:matchId)
- [x] Leaderboard page (/leaderboard/:contestId)

## Public Assets
- [x] logo-full.png
- [x] logo-icon.png
- [x] favicon.ico
- [x] images/hero-bg.png
- [x] images/feature-team.png
- [x] images/feature-contest.png
- [x] images/feature-live.png
- [x] images/auth-bg.png
- [x] images/about-hero.png
- [x] images/faq-hero.png

## Shared Types
- [x] shared/types.ts - TypeScript type definitions

## Branding Updates (New Requirements)
- [x] Update company name to: IMAGINITIATE VENTURES PRIVATE LIMITED
- [x] Update brand name to: IMAGINITIATE
- [x] Update tagline to: Fantasy Sports
- [x] Update company address
- [x] Update domain to: imaginitiatesports.com
- [x] Create custom logo for IMAGINITIATE
- [x] Design new color scheme (Electric Blue + Purple)
- [x] Create hero background images
- [x] Create feature images (team, contest, live)
- [x] Create auth background image
