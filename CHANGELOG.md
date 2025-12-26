# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-12-26

### Added

- **Pre-commit Hooks**: Added `.pre-commit-config.yaml` with comprehensive hooks:
  - Standard file hygiene (trailing-whitespace, end-of-file-fixer, check-yaml, check-json)
  - Security checks (detect-private-key, check-added-large-files)
  - ESLint linting with auto-fix for TypeScript/React files
  - Prettier formatting for code and config files
  - TypeScript type checking

- **CI Pipeline**: Added GitHub Actions workflow (`.github/workflows/ci.yml`):
  - Separate jobs for lint, typecheck, and build
  - Build job gated on lint and typecheck passing
  - Docker build job for production deployments
  - Proper npm dependency caching

- **ESLint Configuration**: Added comprehensive ESLint setup (`.eslintrc.json`):
  - Extended Next.js recommended rules with TypeScript support
  - Prettier integration to avoid style conflicts
  - Custom rules for unused variables, console usage, and React hooks
  - Per-file overrides for API routes and config files

- **Prettier Configuration**: Added Prettier for consistent code formatting:
  - `.prettierrc` with project conventions (double quotes, trailing commas, 100 char width)
  - `.prettierignore` to exclude build outputs and dependencies

- **New npm Scripts**:
  - `lint:fix`: Auto-fix linting issues
  - `typecheck`: Run TypeScript type checker
  - `format`: Format all files with Prettier
  - `format:check`: Check formatting without modifying
  - `check`: Run all quality checks (lint, typecheck, format)
  - `prepare`: Husky setup for git hooks

- **Husky + lint-staged**: Added git hooks for running linters on staged files

### Fixed

- Fixed 7 ESLint errors related to unescaped entities in JSX (`'` and `"`)
- Fixed code formatting inconsistencies across 15 source files

### Security

- Upgraded Next.js from 14.2.15 to 14.2.35 to address security vulnerability
  (see https://nextjs.org/blog/security-update-2025-12-11)
- Upgraded eslint-config-next to match Next.js version

### Changed

- Bumped version from 1.0.0 to 1.1.0 (minor release with new features)
- Reorganized devDependencies in package.json

## [1.0.0] - Initial Release

### Added

- Next.js 14 website with luxury real estate theme
- React components: Header, Hero, FeaturedProperties, AboutSection, StatsSection, Testimonials, ContactSection, Footer
- Contact form with API integration
- Tailwind CSS styling with custom luxury color palette
- Docker support with multi-stage build
- TypeScript with strict mode enabled
