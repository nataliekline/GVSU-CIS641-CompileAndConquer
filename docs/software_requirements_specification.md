# Overview

This document defines the scope of AppXpert, outlining specific functional and non-functional requirements that detail what the application should and should not do. Ultimately, this document serves as a Software Requirements Specification (SRS), capturing the essential specifications needed for successful implementation and validation of the application.

# Functional Requirements

1. Notification System
    1. The application shall display a notification to the user when an interview related to an application process is scheduled for the following day. This notification shall appear automatically, ensuring the user is informed of upcoming interviews.
    2. The app shall send push notifications to users regarding application deadlines only if notifications are enabled.
2. Calendar View
    1. When the user navigates to the “Events” tab, the application shall present a calendar view. This calendar shall allow the user to visualize scheduled events such as interviews and deadlines associated with various application processes.
    2. Upon accessing the “Events” tab, the calendar shall display all events tied to the user’s application processes, filtered and organized by the current date. The system shall ensure that events are displayed chronologically and associated with the relevant application.
3. Account Management
    1. Users shall be able to log in using their email and password specified during account registration.
    2. Users shall be able to delete their account, including all associated data entered.
4. Application Management
    1. The user shall be able to input, update, and edit all details related to their application processes within the “Applications” tab. This includes fields such as company name, position, interview dates, application status, and deadlines.
    2. Users shall be able to search their applications based on the company name or position title. 

# Non-Functional Requirements

1. Security
    1. The application shall implement a secure authentication protocol to protect user accounts and sensitive data. The protocol shall ensure that only authorized users can access their personal information and application processes.
2. Platform Compatibility
    1. The application shall be developed for and compatible with mobile devices running both Android and iOS operating systems. It shall adhere to platform-specific guidelines to ensure consistent performance across both environments.
    2. The app shall run consistently on both iOS and Android simulators without any change in behavior, compatible with the latest stable versions of each platform. 
3. Notification Integration
    1. The application shall integrate with the native notification systems of the user’s mobile device to send timely reminders about upcoming events, such as interviews and deadlines. These notifications shall be customizable and delivered through the operating system’s standard notification interface.
4. Database Management
    1. The application shall utilize a real-time database to manage and synchronize event data related to application processes. This database shall ensure that any updates to events, such as interview dates or status changes, are reflected immediately across the user’s devices and are available for offline use when needed.
5. Performance
    1. The app shall be able to handle up to 100 applications without performance deterioration, maintaining a response time of no more than two seconds for all actions.
    2. The splash screen shall be visible no more than two seconds upon launching the app.
    3. The app shall terminate after three unsuccessful login attempts, notifying the user after reaching the maximum number of attempts.
    
