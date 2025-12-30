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
- [x] Step 8.3: Cron job for automated sync (/api/cron/sync-contests endpoint)

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
- [x] Step 10.1: Build the project (pnpm build) - SUCCESS
- [x] Step 10.2: Write and run tests (11 tests passing)
- [x] Step 10.3: Final verification checklist - ALL VERIFIED:
  - [x] User login via Manus OAuth
  - [x] Match display on homepage and matches page
  - [x] Team creation for upcoming match
  - [x] Contest seeding (4 contests created)
  - [x] Join contest with team
  - [x] Live scores with auto-refresh
  - [x] Contest sync and status updates
  - [x] Leaderboard rankings

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


## Free-to-Play Conversion (New Requirements)

### Backend Changes
- [x] Remove entryFee and prizePool from contests table schema
- [x] Update contest seeding to create free contests only
- [x] Update contest join logic (no payment validation needed)
- [x] Remove all mock/demo data from cricketApi.ts
- [x] Integrate live CricAPI for real match data

### Frontend Changes - Remove Money Content
- [x] Homepage: Remove "₹10Cr+ Prizes Won" stat, replace with points-based stat
- [x] Homepage: Update hero text and CTAs to focus on points/rankings
- [x] Matches page: Remove any prize pool mentions
- [x] Contests page: Remove entry fees and prize pools display
- [x] Contest cards: Show "Free to Join" instead of entry fees
- [x] Leaderboard: Focus on points and rankings, not prizes
- [x] How to Play: Update "Win Prizes" to "Earn Points"
- [x] How to Play: Remove all money-related content
- [x] About page: Update messaging to free-to-play model
- [x] Footer: Remove any prize-related content
- [x] Header: Update any money-related navigation items

### Content Updates
- [x] Replace "Win Prizes" → "Earn Points"
- [x] Replace "Prize Pool" → "Points Pool" or remove entirely
- [x] Replace "Entry Fee" → "Free Entry"
- [x] Update all CTAs to focus on fun/competition, not money
- [x] Update ResponsibleGaming page for free-to-play model
- [x] Update Dashboard to show Total Points instead of Total Winnings

### CricAPI Integration
- [x] Request CricAPI key from user
- [x] Update cricketApi.ts to use real API endpoints
- [x] Test live match data fetching (22 matches returned)
- [x] Test live squad data fetching


## Bug Fixes (Reported Issues)

### Match Display Issues
- [x] Fix Live matches not showing (API returns no live matches currently)
- [x] Fix Upcoming matches not showing (API returns no upcoming matches currently)
- [x] Fix GMT to IST timezone conversion for match times
- [x] Verify match categorization logic (live/upcoming/completed)
- [x] Improved empty state UI for all tabs
- [x] Added auto-refresh every 60 seconds
- [x] Added manual refresh button
- [x] Added match count summary
- [x] Added IST timezone indicator

Note: CricAPI currently returns only completed matches. Live and upcoming matches will appear when available.


## Real-Time Updates (New Requirement)
- [x] Update Matches page to refresh every 3 seconds
- [x] Update LiveScore page to refresh every 3 seconds
- [x] Update Leaderboard page to refresh every 3 seconds
- [x] Update Homepage match sections to refresh every 3 seconds
- [x] Update Dashboard to refresh every 3 seconds


## New Features (User Request - Dec 30, 2025)

### 1. Player Statistics Display
- [x] Fetch player statistics from CricAPI (batting avg, strike rate, bowling economy)
- [x] Create PlayerStatsModal component for detailed stats view
- [x] Add "View Stats" button to player cards in CreateTeam.tsx
- [x] Display batting stats: matches, innings, runs, average, strike rate, 50s, 100s
- [x] Display bowling stats: wickets, economy, average, best bowling

### 2. Push Notifications
- [x] Create NotificationContext for managing browser notifications
- [x] Create NotificationBell component for header
- [x] Create MatchNotificationButton for subscribing to match alerts
- [x] Implement notification permission request flow
- [x] Add notification when subscribed match goes live
- [x] Create useMatchNotifications hook for monitoring match status
- [x] Store notification preferences in localStorage

### 3. Image Optimization (WebP Conversion)
- [x] Convert hero-bg.png to WebP (96% smaller)
- [x] Convert auth-bg.png to WebP (99% smaller)
- [x] Convert feature-team.png to WebP (96% smaller)
- [x] Convert feature-contest.png to WebP (97% smaller)
- [x] Convert feature-live.png to WebP (95% smaller)
- [x] Convert about-hero.png to WebP (97% smaller)
- [x] Convert faq-hero.png to WebP (94% smaller)
- [x] Convert logo-full.png to WebP (99% smaller)
- [x] Convert logo-icon.png to WebP (98% smaller)
- [x] Update all image references in code to use WebP
