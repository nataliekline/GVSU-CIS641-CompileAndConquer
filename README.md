# CompileAndConquer

AppXpert is a cross-functional mobile app designed to simplify the job search experience, especially for students, by centralizing everything in one place. Users begin by registering for an account to ensure their data is persisted and secure. The app's main functionality allows users to input and monitor details, including job application statuses and event-related information. They can then utilize their dashboard to view overall progress and success or rejection rates. Additionally, users can access a calendar for important dates like interviews or company information sessions. By serving as a comprehensive hub for all application-related information, AppXpert aims to reduce the stress and confusion often associated with managing multiple applications.

## Team Members

* [Natalie Kline](https://github.com/nataliekline/CIS641-HW2-Kline)
* [Marcos Diaz](https://github.com/diazpuem/CIS641-HW2-diaz)

## Prerequisites

**Step 1: Clone the Repository**

Run the following command to clone the repository from GitHub:
```
git clone https://github.com/nataliekline/GVSU-CIS641-CompileAndConquer.git
```

**Step 2: Set Up Simulators**

For an iOS Simulator:
1. Install Xcode from the Mac App Store.
2. Open Xcode and go to **Window > Devices and Simulators > Simulators**.
3. If no simulators are listed, install one (e.g., the latest iOS version for an iPhone).
4. Ensure the simulator is running before proceeding.

For an Anroid Emulator:
1. Install Android Studio.
2. Open Android Studio and go to **Tools > Device Manager**.
3. Create a new virtual device if one is not already available.
4. Ensure the emulator is running before proceeding.

**Step 3: Set Up Firebase Project**

1. Log in to the Firebase Console.
2. Create a new Firebase project.
3. Add your app to the Firebase project by registering its package name.
4. Download the following configuration files:
   - `google-services.json` (found in the Firebase Android settings)
   - `GoogleService-Info.plist` (found in the Firebase iOS settings)
5. Enable Firestore and Authentication in your Firebase project.

## Run Instructions

**Step 1: Navigate to the Project Directory**

Once inside the project folder, navigate to the app directory:
```
cd src/appxpert/
```

**Step 2: Configure Environment Variables**

Create the `.env` file from the provided `.env.template` by running:
```
cp .env.template .env
```

Fill in the following Firebase environment variables in the `.env` file:
```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGE_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

Move the downloaded Firebase configuration files into your current directory:
```
mv ~/Downloads/google-services.json ~/Downloads/GoogleService-Info.plist .
```

**Step 3: Install Dependencies**

Run the following command to install alll required packages:
```
npm install
```

**Step 4: Start the Development Server**

Start the Expo development server by running:
```
npm start
```

**Step 5: Open the Emulators**

Once the server is running, press the following keys in the terminal to open the project in your desired emulator:
- Press `i` to open the project in the iOS Simulator
- Press `a` to open the project in the Android Emulator

To reload the app while it is running, press `r` in the terminal.

**Step 6: Explore the App**

You should be all set now to explore the app!