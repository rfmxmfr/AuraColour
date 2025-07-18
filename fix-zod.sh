#!/bin/bash

echo "🔧 Fixing Zod compatibility issues"

# Remove current zod installation
npm remove zod

# Install specific compatible version
npm install zod@3.20.2 --save

echo "✅ Zod fixed! Using version 3.20.2 which doesn't have Unicode property escape issues"