#!/bin/bash

# Setup GitHub repository script for AuraColor
# This script installs GitHub CLI, creates a repository, and pushes the code

echo "Setting up GitHub repository for AuraColor..."

# Install GitHub CLI if not already installed
if ! command -v gh &> /dev/null; then
    echo "Installing GitHub CLI..."
    brew install gh
else
    echo "GitHub CLI already installed."
fi

# Login to GitHub
echo "Logging in to GitHub..."
gh auth login

# Create new repository
echo "Creating new GitHub repository..."
gh repo create aura2025color-app --private

# Initialize git repository
echo "Initializing git repository..."
git init

# Add all files
echo "Adding files to git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Initial commit: AuraColor app with NextAuth integration"

# Add remote and push
echo "Setting up remote and pushing code..."
git remote add origin https://github.com/rfmxmfr/aura2025color-app.git
git push -u origin main

echo "Repository setup complete!"
echo "Your code is now available at: https://github.com/rfmxmfr/aura2025color-app"