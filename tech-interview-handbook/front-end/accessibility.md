Accessibility
==

## Glossary

- **Accessibility** -
- **ARIA** - Accessible Rich Internet Applications.

## What is Accessibility?

Making sure that the content and the websites we create are usable to people with impairments or abilities.

## WebAIM Checklist

The following is a checklist that contains recommendations for implementing HTML-related principles and techniques for those seeking WCAG 2.0 conformance (it is NOT the Web Content Accessibility Guidelines (WCAG) 2.0).

- **Perceivable** - Web content is made available to the senses - sight, hearing, and/or touch.
  - Text Alternatives: Provide text alternatives for any non-text content.
  - Time-based Media: Provide alternatives for time-based media.
  - Adaptable: Create content that can be presented in different ways (for example simpler layout) without losing information or structure.
  - Distinguishable: Make it easier for users to see and hear content including separating foreground from background.
- **Operable** - Interface forms, controls, and navigation are operable.
  - Keyboard Accessible: Make all functionality available from a keyboard.
  - Enough Time: Provide users enough time to read and use content.
  - Seizures: Do not design content in a way that is known to cause seizures.
  - Navigable: Provide ways to help users navigate, find content, and determine where they are.
- **Understandable** - Content and interface are understandable.
  - Readable: Make text content readable and understandable.
  - Predictable: Make Web pages appear and operate in predictable ways.
  - Input Assistance: Help users avoid and correct mistakes.
- **Robust** - Content can be used reliably by a wide variety of user agents, including assistive technologies.
  - Compatible: Maximize compatibility with current and future user agents, including assistive technologies.

**Source:** http://webaim.org/standards/wcag/checklist

## Focus

- Making sure your application has a sensible tab order is important.
- HTML forms and inputs are focusable and handle keyboard events by default.
- Focus tab order relies on the DOM order in the HTML.
- Be careful when using CSS when changing the order of elements on the screen, it can cause the order to be unintuitive and messy.
- `tabindex` attribute:
  - `-1`: Not in the natural tab order, but programatically focusable using JavaScript with `focus()` method. Useful for off-screen content which later appears on screen. Children elements are **NOT** pulled out of the tab order.
  - `0`: In the natural tab order and can be programatically focused.
  - `1` (bigger than 1): In the natural tab order but jumped in front of the tab order regardless of where it is in the DOM. It can be considered an anti-pattern.
- Add focus behavior to interactive controls, like buttons, tabs, dropdowns, stuff that users will interactive with.
- Use skip links to allow users to skip directly to the main content without having to tab through all the navigation.
- `document.activeElement` is useful in tracking the current element that has focus on.

## Semantics

- Using proper labeling not only helps accessibility but it makes the element easier to target for all users!
- Use `<label>` with `for` attributes for form elements.
- Use `alt` attribute for `<img>` elements. Alt text must describe the image.
- TODO

