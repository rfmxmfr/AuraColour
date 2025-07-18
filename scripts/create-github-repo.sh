#!/bin/bash

# Simple script to create a GitHub repository and push code
# This script uses git commands directly without requiring the GitHub CLI

# Set repository name
REPO_NAME="auracolor-app"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install it first."
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
fi

# Add all files
echo "Adding files to git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Initial commit: AuraColor app with NextAuth integration"

echo "Repository initialized locally."
echo ""
echo "To push to GitHub:"
echo "1. Create a new repository on GitHub at: https://github.com/new"
echo "2. Name it: $REPO_NAME"
echo "3. Do NOT initialize with README, .gitignore, or license"
echo "4. After creating, run these commands:"
echo ""
echo "git remote add origin https://github.com/YOUR_USERNAME/$REPO_NAME.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""
echo "Replace YOUR_USERNAME with your GitHub username"