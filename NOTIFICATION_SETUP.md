# Notification Integrations Setup

## ✅ **Already Working:**
- Email notifications (Resend)
- Browser push notifications

## 🔧 **Optional Integrations:**

### **Slack Integration**
1. Go to your Slack workspace
2. Create a new app: https://api.slack.com/apps
3. Add "Incoming Webhooks" feature
4. Create webhook for your channel
5. Add to `.env.local`: `SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...`

### **Discord Integration** 
1. Go to your Discord server
2. Server Settings → Integrations → Webhooks
3. Create New Webhook
4. Copy webhook URL
5. Add to `.env.local`: `DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...`

### **SMS Integration (Twilio)**
1. Sign up at https://twilio.com
2. Get Account SID, Auth Token, and Phone Number
3. Add to `.env.local`:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

### **Usage Examples:**

```typescript
// Send to all configured channels
await sendAdminAlert('Contact Message', { 
  email: 'user@example.com', 
  name: 'John Doe' 
})

// Send SMS
await sendSMS('+1234567890', 'New color analysis request!')

// Browser notification
sendPushNotification('New Message', 'You have a new contact form submission')
```

## 🎯 **Current Status:**
- ✅ Email: Fully configured
- ⚙️ Slack: Ready (needs webhook URL)
- ⚙️ Discord: Ready (needs webhook URL)  
- ⚙️ SMS: Ready (needs Twilio credentials)
- ✅ Push: Working (browser notifications)

All integrations are **optional** and the platform works perfectly with just email notifications.