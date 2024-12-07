# Overview

This document defines the scope of AppXpert by outlining its functional and non-functional requirements, detailing what the application must accomplish and how it will operate. Serving as a Software Requirements Specification (SRS), it provides a clear framework for dividing the development process into manageable tasks, specifying the criteria the final product must meet, and defining the expected interactions between users and the system.

# Software Requirements

This section describes the functional and non-functional requirements for the project. 

## Functional Requirements

### <Name of Feature 1> 

| ID  | Requirement |
| :-------------: | :----------: |
| FR1 | <Requirement 1> |
| FR2 | <Requirement 2> |
| FR3 | <Requirement 3> |
| … | … | … |

### <Name of Feature 2>

| ID  | Requirement |
| :-------------: | :----------: |
| FR4 | <Requirement 1> |
| FR5 | <Requirement 2> |
| FR6 | <Requirement 3> |
| … | … |

## Non-Functional Requirements

### <Name of Feature 1> 

| ID  | Requirement |
| :-------------: | :----------: |
| NFR1 | <Non-Functional Requirement 1> |
| NFR2 | < Non-Functional Requirement 2> |
| NFR3 | < Non-Functional Requirement 3> |
| … | … | … |

# Change Management Plan

AppXpert is designed to be user-friendly and intuitive, allowing engineers to quickly familiarize themselves with its functionalities by exploring the tabs and practicing basic operations such as creating, reading, updating, and deleting applications and events. Currently, the app is accessible by cloning our GitHub repository and running it on an iOS simulator or Android emulator, with a consistent interface across both platforms. While most users should find the app straightforward to navigate, step-by-step video tutorials are available upon request to demonstrate core features and help users make the most of the app's capabilities with minimal effort.

To ensure seamless integration into an organization's ecosystem, engineers should first verify compatibility with their development environment, including resolving any conflicting dependencies and ensuring access to an iOS simulator and an Android emulator. AppXpert is built to complement existing workflows, with the potential for future enhancements such as integrations with external tools like calendar systems or email platforms to automate application status tracking. Testing the app in a controlled environment will help engineers confirm compatibility and integrate it smoothly without disruptions.

Finally, the AppXpert repository will remain public, allowing engineers to report discovered bugs or suggest enhancements directly as GitHub issues. Our team will regularly review these submissions, prioritizing critical issues and continuously releasing updates to enhance functionality and improve the overall user experience. By maintaining an open and collaborative development process, we aim to ensure AppXpert remains reliable and valuable for its users.

# Traceability links

This section outlines the relationships between the system requirements and the corresponding artifacts, such as use case diagrams, class diagrams, and activity diagrams.

## Use Case Diagram Traceability

| Artifact ID  | Artifact Name | Requirement ID |
| :-------------: | :----------: | :----------: |
| UseCase1 | Move Player | FR5 |
| … | … | … |


## Class Diagram Traceability

| Artifact Name | Requirement ID |
| :-------------: |:----------: |
| classPlayer | NFR3, FR5 |
| … | … | … |


## Activity Diagram Traceability

<In this case, it makes more sense (I think, feel free to disagree) to link to the file and to those requirements impacted>

| Artifact ID  | Artifact Name | Requirement ID |
| :-------------: | :----------: | :----------: |
| <filename> | Handle Player Input | FR1-5, NFR2 |
| … | … | … |


# Software Artifacts

This section holds the direct links to the artifacts referenced in the traceability section. 

| Artifact ID | Link |
| :-------------: | :----------: |
| 1 | [something](linktoartifact)
