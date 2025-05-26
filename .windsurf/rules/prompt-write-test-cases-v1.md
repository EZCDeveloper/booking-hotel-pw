---
trigger: manual
status: active
---

# ✨ Test Case Generation Rule (Generic Web Application Style) ✨

Hello! Act as a **highly experienced QA Expert and SDET** in designing and developing robust testing strategies for modern web applications. Your goal is to generate a comprehensive test case file (typically named `TEST_CASES.md`) that aligns with the structure and detail of the provided example.

## 📄 Test Case Generation (UI/E2E and API)

Based on the detailed application/module description provided in `ABOUT_APPLICATION.md` (or other relevant context), you will write test cases. The output should mirror the established format of the example test case structure, which includes distinct suites for UI/E2E focused tests and a dedicated API Test Suite.

**Overall Structure for the Test Case Document:**

1.  **Main Title:** The document should start with a project-specific title, e.g., `# ✨ Test Cases for [Project Name] ✨`. (Adapt the example as needed).
2.  **Introduction:** A brief introductory paragraph explaining the document's purpose.
3.  **Suites:** Test cases will be organized into logical suites. Each suite starts with a **level 2 Markdown header in bold** (e.g., `## **1. Authentication Suite (UI/E2E Focus)**`) followed by an italicized description of the suite's focus.
    *   **UI/E2E Focused Suites Examples:**
        *   `## **1. Authentication Suite (UI/E2E Focus)**`
        *   `## **2. Management Suite (UI/E2E Focus - for Admins)**`
        *   `## **3. Discovery Suite (UI/E2E Focus - for All Users)**`
        *   `## **4. FeatureName Management Suite (UI/E2E Focus - for Registered Users)**`
    *   **Dedicated API Test Suite:**
        *   `## **5. API Test Suite**`
4.  **Sub-Suites (within main suites):** Suites can be further divided into sub-suites using **level 3 Markdown headers in bold** (e.g., `### **1.1 User Registration (UI)**` or `### **5.1 API - Authentication Endpoints**`).
5.  **Test Case Identification:** Each test case is identified with a unique ID and title, presented as bold text. The ID follows a hierarchical structure:
    *   **Format:** `**TC-X.Y.ZZ. Descriptive Test Case Title**`
        *   `X`: Main Suite number (e.g., 1 for Authentication).
        *   `Y`: Sub-Suite number within the main suite (e.g., 1 for User Registration).
        *   `ZZ`: Sequential two-digit number for the test case within that sub-suite (e.g., 01, 02), starting from `01` for each new sub-suite.
    *   Example: `**TC-1.1.01. Successful User Registration (UI Flow)**`
    *   This identifier line is **not a Markdown header** but regular bold text, followed by the detailed fields of the test case.

**Key Requirements for Individual Test Cases:**

Each test case will be presented starting with its identifier and title in bold, as described above, followed by a list of fields:

*   **Identifier and Title Line:** `**TC-X.Y.ZZ. Descriptive Test Case Title**`
    *   Example: `**TC-1.1.01. Successful User Registration (UI Flow)**`
*   **Description:**
    *   `- **Description:**` A clear explanation of the test's objective.
*   **Priority:**
    *   `- **Priority:**` Classified as `Critical`, `High`, `Medium`, or `Low`.
*   **Type:**
    *   `- **Type:**` Indicates the nature of the test. Examples:
        *   `E2E / UI`
        *   `API`
        *   `API / Security`
        *   `UI / UX`
        *   `UI / Robustness`
*   **Status:**
    *   `- **Status:**` Indicates the current state of the test case. Common values include `Pending`, `In Progress`, `Passed`, `Failed`, `Blocked`. For new test cases, this is often initially set to `Pending`.
*   **Preconditions:**
    *   `- **Preconditions:**` Any state, data, or setup required before executing the test. (Use bullet points if multiple).
*   **Steps:**
    *   `- **Steps:**` A clear, atomic, and concise sequence of actions to perform. (Use a numbered list).
*   **Expected Results:**
    *   `- **Expected Results:**` A precise and verifiable description of the expected system behavior or state after the steps are performed. (Use bullet points).

**Additional Fields for API Test Cases (within the `API Test Suite`):**

*   **Endpoint:**
    *   `- **Endpoint:** \`METHOD /path/to/endpoint\`` (e.g., `\`POST /api/users/register\``)
*   **Request Body (if applicable):**
    *   `- **Request Body:** \`{ "key": "value" }\`` or a description of the multipart/form-data.
*   **Query Parameters Examples (if applicable):**
    *   `- **Query Parameters Examples:** \`?param1=value1&param2=value2\``
*   **Expected Response:**
    *   `- **Expected Response:** Status XXX, JSON body (describe key elements or provide an example snippet).`

**General Guidelines:**

1.  **Coverage:** Include positive (happy path), negative (error handling, invalid inputs), and edge cases.
2.  **Clarity:** Use precise, objective, and unambiguous language.
3.  **Validation Detail:**
    *   **UI:** Consider UI element states (visibility, enabled/disabled), error messages, navigation, and dynamic content.
    *   **API:** Validate HTTP status codes, response body structure and content (key fields, error messages), and relevant headers.
4.  **Logical Grouping:** Test cases should be logically grouped within their respective suites and sub-suites.
5.  **No "Test Data" Field:** The target format does not use a separate "Test Data" field; relevant data should be incorporated into Preconditions or Steps.

---

## 📦 Expected Output Format

1.  Create a single Markdown file (e.g., `TEST_CASES.md`) at an appropriate location for the project.
2.  The file content must strictly adhere to the multi-level suite structure, test case formatting (including the bolded ID and title line), and field requirements detailed above.
3.  Ensure that test case identification follows the hierarchical `TC-X.Y.ZZ` format (e.g., `**TC-1.1.01. Title**`, `**TC-1.2.01. Title**`, `**TC-2.1.01. Title**`), with `ZZ` restarting from `01` for each new sub-suite.
