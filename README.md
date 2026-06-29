# 🤖 FRIDAY AI — React Native Mobile Assistant

> F.R.I.D.A.Y — Female Replacement Intelligent Digital Assistant Youth  
> Powered by Claude Sonnet 4 (Anthropic)

---

## 📁 Project Structure

```
FridayAI/
├── App.js                          # Root app + navigation + splash screen
├── index.js                        # Entry point
├── app.json
├── package.json
├── babel.config.js
│
├── android/
│   └── app/src/main/
│       └── AndroidManifest.xml    # ALL Android permissions
│
├── ios/
│   └── FridayAI/
│       └── Info.plist             # ALL iOS permission descriptions
│
└── src/
    ├── screens/
    │   ├── ChatScreen.js          # Main AI chat + voice input
    │   ├── DeviceScreen.js        # Device controls (WiFi, brightness, etc.)
    │   ├── PermissionsScreen.js   # Permission toggle UI
    │   └── AboutScreen.js        # App info
    └── utils/
        ├── FridayAPI.js           # Claude API integration
        ├── PermissionManager.js   # All permissions handler
        └── DeviceController.js    # Native device action executor
```

---

## 🔐 All Permissions Included

### Android (`AndroidManifest.xml`)
| Category | Permissions |
|----------|------------|
| Phone | CALL_PHONE, READ_CALL_LOG, WRITE_CALL_LOG, READ_PHONE_STATE, ANSWER_PHONE_CALLS |
| SMS | SEND_SMS, RECEIVE_SMS, READ_SMS, RECEIVE_MMS |
| Contacts | READ_CONTACTS, WRITE_CONTACTS, GET_ACCOUNTS |
| Location | ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION, ACCESS_BACKGROUND_LOCATION |
| Audio | RECORD_AUDIO, MODIFY_AUDIO_SETTINGS |
| Camera | CAMERA |
| Storage | READ/WRITE_EXTERNAL_STORAGE, READ_MEDIA_IMAGES/VIDEO/AUDIO |
| Calendar | READ_CALENDAR, WRITE_CALENDAR |
| Notifications | POST_NOTIFICATIONS, ACCESS_NOTIFICATION_POLICY |
| System | WRITE_SETTINGS, SYSTEM_ALERT_WINDOW, CHANGE_CONFIGURATION |
| Network | INTERNET, ACCESS_WIFI_STATE, CHANGE_WIFI_STATE, CHANGE_NETWORK_STATE |
| Bluetooth | BLUETOOTH_CONNECT, BLUETOOTH_SCAN, BLUETOOTH_ADMIN |
| Alarm | SET_ALARM, SCHEDULE_EXACT_ALARM, WAKE_LOCK |
| Battery | BATTERY_STATS, REQUEST_IGNORE_BATTERY_OPTIMIZATIONS |
| Biometrics | USE_BIOMETRIC, USE_FINGERPRINT |
| Sensors | BODY_SENSORS, ACTIVITY_RECOGNITION |
| Other | VIBRATE, FLASHLIGHT, FOREGROUND_SERVICE, RECEIVE_BOOT_COMPLETED |

### iOS (`Info.plist`)
- NSMicrophoneUsageDescription
- NSCameraUsageDescription
- NSPhotoLibraryUsageDescription
- NSLocationWhenInUseUsageDescription + NSLocationAlwaysUsageDescription
- NSContactsUsageDescription
- NSCalendarsUsageDescription + NSRemindersUsageDescription
- NSSpeechRecognitionUsageDescription
- NSMotionUsageDescription
- NSHealthShareUsageDescription + NSHealthUpdateUsageDescription
- NSFaceIDUsageDescription
- NSBluetoothAlwaysUsageDescription
- Background modes: audio, fetch, remote-notification, location, voip

---

## ⚡ Setup Instructions

### Prerequisites
```bash
node >= 18
npm >= 9
React Native CLI (not Expo)
Android Studio (for Android)
Xcode 14+ (for iOS)
```

### 1. Install dependencies
```bash
cd FridayAI
npm install
```

### 2. Add your Anthropic API Key
Open `src/utils/FridayAPI.js` and replace:
```js
const API_KEY = 'YOUR_ANTHROPIC_API_KEY';
```
> ⚠️ In production, never ship API keys in client code.  
> Use a backend proxy: your app → your server → Anthropic API.

### 3. iOS Setup
```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

### 4. Android Setup
```bash
# In android/local.properties add:
# sdk.dir=/Users/yourname/Library/Android/sdk

npx react-native run-android
```

### 5. Link native modules
```bash
npx react-native link react-native-vector-icons
npx react-native link react-native-tts
```

---

## 🎤 Features

### Chat Screen
- Full AI conversation powered by Claude Sonnet 4
- Voice input via device microphone (SpeechRecognition API)
- Text-to-speech responses (TTS)
- Quick command cards
- Conversation history preserved per session

### Device Control
- WiFi & Bluetooth toggle
- Brightness slider (10% increments)
- Volume control & mute
- Quick launch: camera, maps, alarm, web search, calls

### Permissions Screen
- Visual toggle for every permission group
- "Grant All" button — requests every permission at once
- Live status: GRANTED / DENIED / BLOCKED / N/A
- Progress bar showing grant percentage

### Voice Commands (say these to Friday)
```
"Call [name or number]"
"Text [contact] [message]"
"Navigate to [destination]"
"Set alarm for [time]"
"Open camera"
"Turn on/off WiFi"
"Turn on/off Bluetooth"
"Set brightness to [%]"
"Volume up/down/mute"
"What's my battery level?"
"Search for [query]"
"Open [app name]"
"What's the weather?"
"Read my notifications"
"Schedule meeting at [time]"
```

---

## 🔑 Key Dependencies

| Package | Purpose |
|---------|---------|
| `@react-navigation/bottom-tabs` | Tab navigation |
| `react-native-permissions` | Permission management |
| `@react-native-voice/voice` | Voice recognition |
| `react-native-tts` | Text-to-speech |
| `react-native-system-setting` | WiFi/Bluetooth/Brightness |
| `react-native-linear-gradient` | UI gradients |
| `react-native-animatable` | Animations |
| `axios` | API calls to Claude |

---

## 🛡️ Security Notes

1. **API Key**: Store in a backend, not in the app bundle
2. **Permissions**: Only request what's needed per action
3. **Data**: No audio sent to servers — only text transcripts
4. **Storage**: Use `react-native-encrypted-storage` for sensitive data

---

## 📱 Screenshots (description)

| Screen | Description |
|--------|-------------|
| Splash | Animated FRIDAY logo with boot sequence |
| Chat | Dark HUD interface with cyan accents, message bubbles |
| Device | Toggle controls with sliders for brightness/volume |
| Permissions | Live status grid with grant-all button |
| About | Feature overview and branding |

---

## 🚀 Build for Production

### Android APK
```bash
cd android
./gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/app-release.apk
```

### iOS IPA
Build via Xcode → Product → Archive

---

*FRIDAY AI — Your mobile companion. All systems online.*
