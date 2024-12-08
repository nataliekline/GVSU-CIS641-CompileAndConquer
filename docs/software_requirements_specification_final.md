# Overview

This document defines the scope of AppXpert by outlining its functional and non-functional requirements, detailing what the application must accomplish and how it will operate. Serving as a Software Requirements Specification (SRS), it provides a clear framework for dividing the development process into manageable tasks, specifying the criteria the final product must meet, and defining the expected interactions between users and the system.

# Software Requirements

This section describes the functional and non-functional requirements for the project. 

## Functional Requirements

### Login Screen 

| ID  | Requirement |
| :-------------: | :----------: |
| FR1 | The user shall be able to log in using their email and password specified during account registration. |
| FR2 | The app shall navigate to the sign-up screen when "Create new account" is pressed. |
| FR3 | The user shall receive an alert if their login credentials are incorrect when "Login" is pressed. |
| FR4 | The app shall navigate to the dashboard screen if their login credentials are correct when "Login" is pressed. |
| FR5 | The app shall show an error if "Login" is pressed and the email address or password field is empty. |

### Sign Up Screen 

| ID  | Requirement |
| :-------------: | :----------: |
| FR6 | The user shall be able to create an account by inputting their name, email, password, and confirmed password. |
| FR7 | The app shall navigate to the login screen when "Back to Login" is pressed. |
| FR8 | The user shall receive an alert if their sign-up credentials are invalid when "Sign Up" is pressed. |
| FR9 | The app shall navigate to the Dashboard screen if their sign-up credentials are valid when "Sign Up" is pressed. |
| FR10 | The app shall show an error if "Sign Up" is pressed and one or more fields are empty. |
| FR11 | The app shall show an error if the password and confirmed password fields do not match. |
| FR12 | The user's password shall be a minimum of 6 characters.

### Dashboard 

| ID  | Requirement |
| :-------------: | :----------: |
| FR13 | The dashboard screen shall greet the user by their name as entered during registration. |
| FR14 | The dashboard screen shall display the number of applications that were entered into the app during the current week. |
| FR15 | The dashboard screen shall display the total number of applications that have been entered into the app regardless of their status. |
| FR16 | The dashboard screen shall display the user's success rate, calculated as the percentage of applications that are in the "Action Required", "waiting for Response", or "Offer Received" statuses. |
| FR17 | The dashboard screen shall display the user's in review rate, calculated as the percentage of applications that are in the "Applied" status. |
| FR18 | The dashboard screen shall display the user's rejection rate, calculated as the percentage of applications that are in the "Rejected" status. |
| FR19 | The dashboard screen shall include a visual representation such as bubbles of application statuses for easy understanding. |

### Applications

| ID  | Requirement |
| :-------------: | :----------: |
| FR20 | The app shall display a form to enter application details when the user clicks on the plus icon. |
| FR21 | The app shall show 5 columns on the applications screen, each representing a different application status title. |
| FR22 | The application card shall move to the correct column automatically when the user edits the status. |
| FR23 | Each application card shall display the position title and company name associated with the application ID. | 
| FR24 | The columns on the applications screen shall be horizontally scrollable. |
| FR25 | The cards within each column shall be vertically scrollable. |
| FR26 | The "Date Submitted" field on the form shall be prepopulated with today's date when the user clicks the plus icon. |
| FR27 | The "Application Status" field on the form shall be a dropdown with 5 predefined options. |
| FR28 | The "Format" field on the form shall be a dropdown with 3 predefined options. |
| FR29 | The "Salary" field on the form shall be a dropdown with 5 predefined ranges. |
| FR30 | The user shall be able to navigate back to the main applications screen by pressing the "Back" button when on the form. |
| FR31 | A new application card shall appear in the correct column upon clicking "Create" on the application form. |
| FR32 | The user shall be able to delete an application by selecting the card and clicking the "Delete" button. |
| FR33 | The user shall be able to edit all application details by selecting an existing application card and opening the form. |

### Calendar 

| ID  | Requirement |
| :-------------: | :----------: |
| FR34 | The app shall display a form for entering event details when the user clicks on the plus icon. |
| FR35 | The app shall highlight today's current date on the calendar with a blue dot. |
| FR36 | The app shall list all events that have been entered by the user for the selected day. |
| FR37 | The app shall display a message saying "No events for this day" if no events have been submitted for the selected date. |
| FR38 | The user shall be able to interact with the calendar to view months in the past and future. |
| FR39 | Each event card shall display the event type, company name, and time of the event associated with the event ID. |
| FR40 | The event cards shall be vertically scrollable to allow viewing all events for the selected day. |
| FR41 | The "Event Type" field on the event form shall be a dropdown with 2 predefined options. |
| FR42 | The "Application" field on the event form shall be a dropdown containing the company names from all submitted applications. |
| FR43 | The "Duration" field on the event form shall be a dropdown containing 6 predefined durations. |
| FR44 | The user shall be able to specify both the date and time for the event on the form. |
| FR45 | The user shall be able to navigate back to the main calendar screen by pressing the "Back" button on the form. |
| FR46 | A new event card shall appear on the Calendar screen upon clicking "Create" on the event form and selecting the correct date. |
| FR47 | The user shall be able to delete an event by selecting the card and clicking the "Delete" button. |
| FR48 | The user shall be able to edit all event details by selecting an existing event card, opening the form, and clicking "Save". |

### Settings 

| ID  | Requirement |
| :-------------: | :----------: |
| FR49 | The app shall display the user's name on the settings screen. |
| FR50 | The app shall display 4 options on the settings screen: Personal Information, Notifications, Logout, and Delete Account. |
| FR51 | All of the user's data shall be permanently deleted from the database when the user clicks "Delete Account" and confirms the action. |
| FR52 | The user shall navigate to the Personal Information screen when "Personal Information" is pressed. |
| FR53 | The user shall be able to add or update their age and profession on the Personal Information screen. |
| FR54 | The user shall be able to edit the name associated with their account on the Personal Information screen. |
| FR55 | The user shall navigate back to the Settings screen when "Back" is clicked, discarding any changes they may have entered. |
| FR56 | The user shall be logged out of their account and navigated to the login screen when "Logout" is pressed.  |
| FR57 | The app shall display a confirmation dialog when the user presses "Delete Account" to prevent accidental account deletion. |

## Non-Functional Requirements

### Security 

| ID  | Requirement |
| :-------------: | :----------: |
| NFR1 | The user's data shall not be shared with other users.  |
| NFR2 | The user's data shall be stored securely with Firestore Database. |
| NFR3 | The app shall encrypt sensitive user data, including passwords. |
| NFR4 | Password resets shall only be initiated through a secure link sent to the user's registered email address. |
| NFR5 | Users shall not have the ability to change the email address associated with their account to ensure data integrity. |

### Platform Compatibility 

| ID  | Requirement |
| :-------------: | :----------: |
| NFR6 | The app shall maintain a consistent user interface across Android and iOS devices. |
| NFR7 | The app shall support devices running iOS 14 or higher. |
| NFR8 | The app shall support devices running Android 10 or higher. |
| NFR9 | The app shall automatically adapt to various phone screen sizes. |
| NFR10 | The app shall function seamlessly in light mode on supported devices. |

### Authentication

| ID  | Requirement |
| :-------------: | :----------: |
| NFR12 | The password field shall have a masked sensitive format to hide the password while typing on the Login screen. |
| NFR13 | The password and confirm password fields shall have a masked sensitive format to hide the password while typing on the Signup screen. |
| NFR14 | The app shall validate the user's credentials within 2 seconds to log them in. |
| NFR15 | The app shall take no more than 3 seconds to connect to Firebase to create a user's account. |
| NFR16 | The app shall log out the user when the user clears the app from their background. |
| NFR17 | The app shall maintain session validity for a minimum of 2 hours unless the user logs out. |
| NFR18 | The app shall prevent duplicate account creation by verifying that the meial is unique before submission. |

### Calendar Software 

| ID  | Requirement |
| :-------------: | :----------: |
| NFR19 | The app shall use an open-source calendar library compatible with both iOS and Android platforms. |
| NFR20 | The calendar library shall include the option to select a time by scrolling in addition to the display of a calendar. |
| NFR21 | The calendar shall refresh within 2 seconds after the user adds or edits an event. |
| NFR22 | The calendar shall support localization for date sand times based on the user's device settings. |
| NFR23 | The calendar shall allow the user to navigate between months and years smoothly without performance lag. |

### Performance 

| ID  | Requirement |
| :-------------: | :----------: |
| NFR24 | The app shall be able to handle up to 100 applications per user without performance deterioration. |
| NFR25 | The app shall handle up to 50 concurrent users without degradation in performance. |
| NFR26 | The app shall ensure all transitions between screens are completed in under 1 second. |
| NFR27 | The app shall perform its features without crashing, maintaining a 95% reliability rate. |
| NFR28 | The splash screen shall be visible no more than two seconds upon launching the app. |
| NFR29 | The app shall have a UI that is easy to understand and follow. |
| NFR30 | The app shall maintain a smooth scrolling experience when displaying large lists of applications or events. |

# Change Management Plan

AppXpert is designed to be user-friendly and intuitive, allowing engineers to quickly familiarize themselves with its functionalities by exploring the tabs and practicing basic operations such as creating, reading, updating, and deleting applications and events. Currently, the app is accessible by cloning our GitHub repository and running it on an iOS simulator or Android emulator, with a consistent interface across both platforms. While most users should find the app straightforward to navigate, step-by-step video tutorials are available upon request to demonstrate core features and help users make the most of the app's capabilities with minimal effort.

To ensure seamless integration into an organization's ecosystem, engineers should first verify compatibility with their development environment, including resolving any conflicting dependencies and ensuring access to an iOS simulator and an Android emulator. AppXpert is built to complement existing workflows, with the potential for future enhancements such as integrations with external tools like calendar systems or email platforms to automate application status tracking. Testing the app in a controlled environment will help engineers confirm compatibility and integrate it smoothly without disruptions.

Finally, the AppXpert repository will remain public, allowing engineers to report discovered bugs or suggest enhancements directly as GitHub issues. Our team will regularly review these submissions, prioritizing critical issues and continuously releasing updates to enhance functionality and improve the overall user experience. By maintaining an open and collaborative development process, we aim to ensure AppXpert remains reliable and valuable for its users.

# Traceability links

This section outlines the relationships between the system requirements and the corresponding artifacts, such as use case diagrams, class diagrams, and activity diagrams.

## Use Case Diagram Traceability

| Artifact ID  | Artifact Name | Requirement ID |
| :-------------: | :----------: | :----------: |
| 1 | Register Account | FR2, 6, 7 // NFR1, 2, 5, 6-11, 15, 18, 26, 27 29, 30|
| 1 | Validate Credentials | FR3, 4, 5, 8, 9, 10, 11, 12 // NFR2, 3, 4, 12-18|
| 1 | Login/Logout of Account | FR1, 5, 50, 56 // NFR6-11, 15, 16, 17, 25, 26, 27 29, 30|
| 1 | Update Account Details | FR49, 50, 52, 53, 54, 55 // NFR2, 5, 6-11, 26, 27, 29, 30|
| 1 | View Account | FR49, 50, 52, 53, 54, 55 // NFR2, 5, 6-11, 26, 27, 29, 30|
| 1 | Delete Account | FR49, 50, 51, 57 // NFR6-11, 27, 29, 30|
| 2 | Add Application Details | FR20, 26, 27, 28, 29, 30, 31 // NFR 2, 6-11, 26, 27, 29, 30|
| 2 | View Job Application |  FR21, 22, 23, 24, 25, 30, 31 // NFR2, 6-11, 24, 26, 27, 29, 30|
| 2 | Update Application Information | FR33 // NFR2, 6-11, 26, 27, 29-30 |
| 2 | Delete Application | FR32 // NFR2, 6-11, 26, 27, 29, 30 |
| 3 | Add Event Details| FR34, 37, 41-46 // NFR2, 6-11, 19, 21, 26, 27, 29, 30|
| 3 | Update Event Information| FR41-45, 48 // NFR2, 6-11, 19, 21, 26, 27, 29, 30|
| 3 | View Event Details | FR35-40 // NFR2, 6-11, 19-23, 27, 29, 30|
| 3 | Delete Event | FR47 // NFR2, 6-11, 19, 21, 26, 27, 29, 30|


## Class Diagram Traceability

| Artifact ID  | Artifact Name | Requirement ID |
| :-------------: | :----------: | :----------: |
| 6 | User | FR1-12, 50-57 // NFR1-18, 25-30 |
| 6 | Event | FR34-46, 48 // NFR2, 6-11, 19-23, 26, 27, 29, 30|
| 6 | Application |FR 20-33 // NFR2, 6-11, 24, 26, 27, 29, 30|
| 6 | Interview | FR41 // NFR2, 6-11, 19-23, 26, 27, 29, 30|
| 6 | Information Session | FR41 // NFR2, 6-11, 19-23, 26, 27, 29, 30|


## Activity Diagram Traceability

<In this case, it makes more sense (I think, feel free to disagree) to link to the file and to those requirements impacted>

| Artifact ID  | Artifact Name | Requirement ID |
| :-------------: | :----------: | :----------: |
| 4 | Account Registration | FR1-12 // NFR1-18, 25-30  |
| 5 | Add Application | FR20, 26, 27, 28, 29, 30, 31 // NFR 2, 6-11, 26, 27, 29, 30 |


# Software Artifacts

This section holds the direct links to the artifacts referenced in the traceability section. 

| Artifact ID | Link |
| :-------------: | :----------: |
| 1 | [Use Case Diagram User Account](https://github.com/nataliekline/GVSU-CIS641-CompileAndConquer/blob/main/artifacts/traceabilityDiagrams/User%20Account%20Use%20Case%20Diagram.png) |
| 2 | [Use Case Diagram Application Information](https://github.com/nataliekline/GVSU-CIS641-CompileAndConquer/blob/main/artifacts/traceabilityDiagrams/Application%20Information%20Use%20Case%20Diagram.png) |
| 3 | [Use Case Diagram Event Information](https://github.com/nataliekline/GVSU-CIS641-CompileAndConquer/blob/main/artifacts/traceabilityDiagrams/Event%20Information%20Use%20Case%20Diagram.png) |
| 4 | [Activity Diagram Account Registration](https://github.com/nataliekline/GVSU-CIS641-CompileAndConquer/blob/main/artifacts/traceabilityDiagrams/Account%20Registration%20Activity%20Diagram.png) |
| 5 | [Activity Diagram Add Application](https://github.com/nataliekline/GVSU-CIS641-CompileAndConquer/blob/main/artifacts/traceabilityDiagrams/Add%20Application%20Activity%20Diagram.png) |
| 6 | [Class Diagram](https://github.com/nataliekline/GVSU-CIS641-CompileAndConquer/blob/main/artifacts/traceabilityDiagrams/Class%20Diagram.png) |
