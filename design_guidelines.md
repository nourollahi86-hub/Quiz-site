# Design Guidelines: True/False Quiz Platform

## Design Approach

**Selected System:** Clean productivity application inspired by Linear and Notion
**Justification:** This is a utility-focused educational tool where clarity, efficiency, and learnability are paramount. Students need to quickly scan questions and submit answers, while instructors need a straightforward upload interface. A minimalist, structured approach ensures maximum usability.

**Core Principles:**
- Clarity over decoration
- Efficient information hierarchy
- Minimal cognitive load
- Purposeful whitespace

## Typography

**Font Family:** Inter (Google Fonts) for all text
**Hierarchy:**
- Page titles: 32px, weight 700, tracking tight
- Section headers: 24px, weight 600
- Question text: 18px, weight 500, line-height 1.6
- Body/labels: 16px, weight 400
- Helper text: 14px, weight 400, reduced opacity

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, and 12 consistently
- Component padding: p-6 or p-8
- Section spacing: mb-8 or mb-12
- Input/button spacing: gap-4
- Card spacing: p-6 to p-8

**Container Structure:**
- Max width: 800px centered (max-w-3xl mx-auto)
- Page padding: px-8 py-12
- Card-based layout with subtle borders

## Component Library

### Navigation/Header
Simple horizontal header with logo/title on left, role toggle (Instructor/Student mode) on right. Height: h-16, border bottom, centered content with max-w-6xl container.

### Instructor Interface

**Question Upload Card:**
- Large textarea for bulk question input (min-h-64)
- Each line becomes one question
- Clear formatting instructions above textarea: "Enter one True/False question per line"
- Primary action button below: "Upload Questions"
- Secondary button: "Clear All Questions"

**Question Management List:**
- Display uploaded questions in numbered list format
- Each question row includes: question number badge, question text, delete icon button
- Striped rows for easy scanning (alternate subtle background)
- Empty state with instructional text when no questions uploaded

### Student Interface

**Student Name Input:**
- Single input field at top of quiz
- Label: "Your Name"
- Full width within container (w-full)
- Required indicator

**Question Display:**
- Each question in individual card (mb-6)
- Question number badge (circular, top-left)
- Question text prominent and readable
- Two large radio button options below question:
  - "True" and "False" horizontally aligned
  - Radio buttons with labels, generous click targets (p-4)
  - Clear selected state with border accent

**Submit Section:**
- Fixed bottom bar (sticky bottom-0) with subtle shadow
- Large primary button: "Submit Quiz"
- Button centered, generous padding (px-12 py-4)

### Form Elements

**Inputs:**
- Height: h-12
- Padding: px-4
- Border radius: rounded-lg
- Border width: border-2
- Focus state: border accent, no color reference

**Buttons:**
- Primary: Large (px-8 py-3), rounded-lg, weight 600
- Secondary: Border button style, same sizing
- Destructive: Same sizing, weight 500

**Radio Buttons:**
- Custom styled with larger click area
- Label and input wrapped together
- Horizontal layout for True/False options
- Clear visual feedback for selected state

### Feedback Components

**Success Message:**
- Full-width banner after submission
- Centered text: "Quiz submitted successfully!"
- Appears at top of page
- Include checkmark icon from icon library

**Empty States:**
- Centered content with icon
- Instructional text below
- Suggested action button

## Icons

Use Heroicons (CDN link) for all interface icons:
- Trash icon for delete actions
- Check icon for success states
- Plus icon for add actions
- User icon for student name field

## Layout Patterns

**Instructor View:**
1. Header with title "Quiz Management"
2. Question upload card (prominent, top section)
3. Question list below (scrollable if many questions)

**Student View:**
1. Header with title "True/False Quiz"
2. Student name input (fixed at top)
3. Scrollable question list (each question well-spaced)
4. Submit button (sticky at bottom)

**Vertical Rhythm:**
- Consistent 8-unit spacing between major sections
- 6-unit spacing between related elements
- 4-unit spacing within components

## Accessibility

- All form inputs have visible labels
- Radio buttons have proper name grouping (one group per question)
- Focus states clearly visible on all interactive elements
- Sufficient contrast for all text (handled by engineer)
- Semantic HTML structure (proper heading hierarchy)