# 🎥 Message Mitra - Demo Script (4-Minute Walkthrough)

## 🕒 [0:00 - 0:30] Introduction & Landing Page
**Speaker:** "Welcome to Message Mitra, a digital companion designed to help rural communities, elders, and first-time smartphone users understand complex SMS messages and stay safe from fraud."
*Action:* Show the beautifully designed Landing Page.
**Speaker:** "The app has a warm, accessible design with large buttons and soft colors. Users can register, log in, or continue as a guest for a quick check."

## 🕒 [0:30 - 1:30] User Flow (Safe Message & Localization)
*Action:* Log in as a normal user. Change language to Telugu or Hindi in the Profile tab.
**Speaker:** "Let's paste a normal bank message. The system analyzes it locally—no paid APIs, ensuring total privacy."
*Action:* Paste **Sample 1** (Bank) and click 'Check Message'.
**Speaker:** "The result card shows 'Safe' with a green indicator. The text is translated into the user's preferred language. By tapping the 'Listen' button, the Web Speech API reads the explanation aloud, making it accessible for non-readers."

## 🕒 [1:30 - 2:30] Fraud Detection & Actions
*Action:* Go back to Home, paste **Sample 9** (Electricity Scam).
**Speaker:** "Now let's see what happens with a common scam. We paste a message threatening electricity disconnection."
*Action:* Click 'Check Message'.
**Speaker:** "The UI instantly flashes a pulsing red 'Danger' meter. It explains exactly *why* this is a scam—scammers use panic to steal money. Below, the app suggests actionable steps like 'Contact your bank' or 'Ask family members'."
*Action:* Show the 'Ask Family' tab.
**Speaker:** "Users can add trusted contacts here. On a dangerous message, one tap shares the alert and the original text directly via WhatsApp to their son or daughter."

## 🕒 [2:30 - 3:00] History & Saved Messages
*Action:* Navigate to the History and Saved tabs.
**Speaker:** "Every analyzed message is saved in the user's History, categorized clearly. Important messages like doctor appointments can be bookmarked to the 'Saved' page so elders don't have to dig through their messy SMS inbox."

## 🕒 [3:00 - 4:00] Admin Portal & Dynamic Scams
*Action:* Log out, and log in with Admin credentials (`0000000000` / `Admin@123`).
**Speaker:** "Message Mitra includes a powerful Admin Portal."
*Action:* Show Dashboard.
**Speaker:** "Here, admins see real-time stats and a dynamic chart of message categories."
*Action:* Click on 'Scam Patterns'.
**Speaker:** "Our fraud detection is rule-based and dynamic. Admins can add new trending scam keywords here, and the app will instantly start catching them without needing a software update. Message Mitra keeps users safe, educated, and connected."

---

## 📝 12 Sample SMS Messages for Demo

### Bank / Financial (Safe)
1. `Dear Customer, Rs.500 has been debited from your A/c ending 1234 on 15-Oct towards UPI. Avl Bal: Rs 14,200.`
2. `Your salary of Rs 25,000 has been credited to A/C XXXXXX999 on 01-Nov.`

### OTP (Safe)
3. `Your Amazon OTP is 482910. Valid for 10 minutes. Do not share.`
4. `123456 is the OTP for your bank login. Never share this with anyone.`

### Delivery / E-commerce (Safe)
5. `Your Flipkart order containing 'Shoes' is out for delivery. PIN is 4421.`
6. `Swiggy: Your food is arriving in 10 minutes. Delivery partner is at the gate.`

### Government / Appointments (Safe)
7. `Your Aadhaar update request is processed successfully.`
8. `Appointment confirmed at Apollo Hospital for Dr. Sharma on 12-Nov at 10 AM.`

### Scams / Frauds (Danger)
9. **Electricity Scam:** `Dear consumer, your electricity power will be disconnected tonight at 9:30 PM because your previous month bill was not updated. Call officer 9876543210 immediately.`
10. **Fake KYC/Block:** `URGENT: Your SBI account will be blocked today. Click http://kyc-update-sbi.com to update PAN immediately.`
11. **Lottery/Prize:** `Congratulations! Your mobile number won Rs. 10 Lakhs in WhatsApp lucky draw. Send your bank details and OTP to claim your prize.`
12. **OTP Theft:** `We are calling from Bank. Your debit card is expiring. Please tell the 6 digit OTP sent to your phone to renew it.`
