# AuraColor Database Schema

This document outlines the database schema for the AuraColor application.

## Overview

The AuraColor database is built on PostgreSQL and uses Supabase for authentication and storage. The schema includes tables for user management, services, questionnaires, bookings, payments, and more.

## Tables

### User Management

#### profiles
- `id` - UUID (Primary Key, references auth.users)
- `email` - TEXT (Unique)
- `full_name` - TEXT
- `role` - TEXT (user, admin, analyst)
- `avatar_url` - TEXT
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

### Services

#### services
- `id` - UUID (Primary Key)
- `name` - TEXT
- `description` - TEXT
- `price` - DECIMAL
- `duration` - INTEGER (minutes)
- `is_active` - BOOLEAN
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

### Questionnaire System

#### questionnaires
- `id` - UUID (Primary Key)
- `title` - TEXT
- `description` - TEXT
- `service_id` - UUID (Foreign Key to services)
- `is_active` - BOOLEAN
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

#### questions
- `id` - UUID (Primary Key)
- `questionnaire_id` - UUID (Foreign Key to questionnaires)
- `question_text` - TEXT
- `question_type` - TEXT (multiple_choice, text, image_selection, file_upload)
- `is_required` - BOOLEAN
- `order_index` - INTEGER
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

#### question_options
- `id` - UUID (Primary Key)
- `question_id` - UUID (Foreign Key to questions)
- `option_text` - TEXT
- `option_value` - TEXT
- `image_url` - TEXT
- `order_index` - INTEGER
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

#### questionnaire_responses
- `id` - UUID (Primary Key)
- `user_id` - UUID (Foreign Key to profiles)
- `booking_id` - UUID (Foreign Key to bookings)
- `questionnaire_id` - UUID (Foreign Key to questionnaires)
- `completed` - BOOLEAN
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

#### question_answers
- `id` - UUID (Primary Key)
- `response_id` - UUID (Foreign Key to questionnaire_responses)
- `question_id` - UUID (Foreign Key to questions)
- `answer_text` - TEXT
- `selected_option_id` - UUID (Foreign Key to question_options)
- `file_url` - TEXT
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

### Booking System

#### bookings
- `id` - UUID (Primary Key)
- `user_id` - UUID (Foreign Key to profiles)
- `service_id` - UUID (Foreign Key to services)
- `booking_date` - TIMESTAMP
- `status` - TEXT (pending, confirmed, cancelled, completed)
- `notes` - TEXT
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

### Payment System

#### payments
- `id` - UUID (Primary Key)
- `booking_id` - UUID (Foreign Key to bookings)
- `user_id` - UUID (Foreign Key to profiles)
- `amount` - DECIMAL
- `currency` - TEXT
- `status` - TEXT (pending, completed, failed, refunded)
- `payment_method` - TEXT
- `stripe_payment_id` - TEXT
- `stripe_customer_id` - TEXT
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

### Analysis System

#### analyst_reports
- `id` - UUID (Primary Key)
- `booking_id` - UUID (Foreign Key to bookings)
- `analyst_id` - UUID (Foreign Key to profiles)
- `season_analysis` - TEXT
- `color_recommendations` - JSONB
- `styling_notes` - TEXT
- `confidence_score` - INTEGER
- `status` - TEXT (draft, published)
- `ai_analysis` - JSONB
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

#### color_palettes
- `id` - UUID (Primary Key)
- `name` - TEXT
- `season` - TEXT (spring, summer, autumn, winter)
- `sub_season` - TEXT
- `colors` - JSONB
- `description` - TEXT
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

### File Management

#### file_uploads
- `id` - UUID (Primary Key)
- `user_id` - UUID (Foreign Key to profiles)
- `booking_id` - UUID (Foreign Key to bookings)
- `file_path` - TEXT
- `file_type` - TEXT
- `file_size` - INTEGER
- `original_filename` - TEXT
- `purpose` - TEXT (questionnaire, report, profile)
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

### Notification System

#### notifications
- `id` - UUID (Primary Key)
- `user_id` - UUID (Foreign Key to profiles)
- `title` - TEXT
- `message` - TEXT
- `type` - TEXT (info, success, warning, error)
- `is_read` - BOOLEAN
- `action_url` - TEXT
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

### Email System

#### email_templates
- `id` - UUID (Primary Key)
- `name` - TEXT (Unique)
- `subject` - TEXT
- `body` - TEXT
- `variables` - JSONB
- `is_active` - BOOLEAN
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

#### email_logs
- `id` - UUID (Primary Key)
- `user_id` - UUID (Foreign Key to profiles)
- `template_id` - UUID (Foreign Key to email_templates)
- `subject` - TEXT
- `recipient` - TEXT
- `body` - TEXT
- `status` - TEXT (sent, failed, delivered, opened)
- `error_message` - TEXT
- `created_at` - TIMESTAMP

### Gift System

#### gift_vouchers
- `id` - UUID (Primary Key)
- `code` - TEXT (Unique)
- `amount` - DECIMAL
- `currency` - TEXT
- `is_redeemed` - BOOLEAN
- `redeemed_by` - UUID (Foreign Key to profiles)
- `redeemed_at` - TIMESTAMP
- `purchased_by` - UUID (Foreign Key to profiles)
- `expires_at` - TIMESTAMP
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

### Application Settings

#### settings
- `id` - UUID (Primary Key)
- `key` - TEXT (Unique)
- `value` - JSONB
- `description` - TEXT
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

## Row Level Security (RLS)

The database uses Row Level Security to ensure data privacy and security:

- Users can only view and update their own profiles
- Admins can view and update all profiles
- Additional RLS policies are implemented for other tables as needed

## Triggers

Automatic timestamp updates are implemented for all tables to track when records are modified.

## Initial Data

The schema includes initial data for services to get started with the application.