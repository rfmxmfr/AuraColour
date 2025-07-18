#!/bin/bash

# Initialize GitHub repository script for AuraColor
# This script creates a new GitHub repository and pushes the code

# Set variables
REPO_NAME="auracolor-app"
REPO_DESCRIPTION="Professional color analysis and styling service platform"
GITHUB_USERNAME=""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI is not installed. Please install it first."
    echo "Visit: https://cli.github.com/"
    exit 1
fi

# Check if logged in to GitHub
if ! gh auth status &> /dev/null; then
    echo "You are not logged in to GitHub. Please login first."
    gh auth login
fi

# Get GitHub username if not provided
if [ -z "$GITHUB_USERNAME" ]; then
    GITHUB_USERNAME=$(gh api user | jq -r '.login')
    if [ -z "$GITHUB_USERNAME" ]; then
        echo "Could not determine GitHub username. Please set it manually in the script."
        exit 1
    fi
fi

# Create GitHub repository
echo "Creating GitHub repository: $REPO_NAME..."
gh repo create "$REPO_NAME" --description "$REPO_DESCRIPTION" --private

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
fi

# Add remote origin
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: AuraColor app with NextAuth integration"

# Push to GitHub
echo "Pushing code to GitHub..."
git push -u origin main

echo "Repository created and code pushed successfully!"
echo "Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"