#!/bin/bash

# Initialize Git repository script
# This script sets up a new Git repository with branch protection rules

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Initializing Git repository for AuraColor...${NC}"

# Check if git is already initialized
if [ -d ".git" ]; then
  echo -e "${YELLOW}Git repository already exists.${NC}"
else
  # Initialize git repository
  git init
  echo -e "${GREEN}Git repository initialized.${NC}"
  
  # Add all files
  git add .
  
  # Initial commit
  git commit -m "chore: initial commit"
  echo -e "${GREEN}Initial commit created.${NC}"
fi

# Create main branch if not on it
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  git branch -M main
  echo -e "${GREEN}Renamed branch to main.${NC}"
fi

# Setup remote repository if not already set
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")
if [ -z "$REMOTE_URL" ]; then
  echo -e "${YELLOW}No remote repository set.${NC}"
  echo -e "To add a remote repository, run:"
  echo -e "git remote add origin <repository-url>"
  echo -e "git push -u origin main"
else
  echo -e "${GREEN}Remote repository already configured: ${REMOTE_URL}${NC}"
fi

echo -e "${GREEN}Repository setup complete!${NC}"
echo -e "${YELLOW}NOTE: Branch protection rules must be set up in your Git provider (GitHub/GitLab/etc.)${NC}"
echo -e "For GitHub, go to: Settings > Branches > Branch protection rules > Add rule"
echo -e "Recommended settings:"
echo -e "  - Require pull request reviews before merging"
echo -e "  - Require status checks to pass before merging"
echo -e "  - Require branches to be up to date before merging"
echo -e "  - Include administrators"