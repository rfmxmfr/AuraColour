#!/bin/bash

echo "🔧 Installing recommended VSCode extensions..."

# List of recommended extensions
EXTENSIONS=(
  "dbaeumer.vscode-eslint"
  "esbenp.prettier-vscode"
  "bradlc.vscode-tailwindcss"
  "ms-vscode.vscode-typescript-next"
  "formulahendry.auto-rename-tag"
  "streetsidesoftware.code-spell-checker"
  "naumovs.color-highlight"
  "dsznajder.es7-react-js-snippets"
)

# Check if code command is available
if ! command -v code &> /dev/null; then
  echo "❌ VSCode CLI not found. Please install it first:"
  echo "  1. Open VSCode"
  echo "  2. Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows/Linux)"
  echo "  3. Type 'Shell Command: Install 'code' command in PATH'"
  echo "  4. Press Enter"
  echo "  5. Restart your terminal"
  exit 1
fi

# Install extensions
for extension in "${EXTENSIONS[@]}"; do
  echo "Installing $extension..."
  code --install-extension "$extension" --force
done

echo "✅ VSCode extensions installed successfully!"