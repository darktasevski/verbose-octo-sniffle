Front End Job Interview Questions
==

Unlike typical software engineer job interviews, front end job interviews have less emphasis on algorithms and have more questions on intricate knowledge and expertise about the domain — HTML, CSS, JavaScript, just to name aspects.

While there are some existing resources to help front end developers in preparing for interviews, they aren't as abundant as materials for a software engineer interview. Among the existing resources, probably the most helpful question bank would be [Front End Job Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions). Unfortunately, I couldn't find many complete and satisfactory answers for these questions online, hence here is my attempt at answering them. Being an open source repository, the project can live on with the support of the community as the state of web evolves.

## Table of Contents

  1. [HTML Questions](#html-questions)
  1. [CSS Questions](#css-questions)
  1. [JS Questions](#js-questions) TODO

## HTML Questions

Answers to [Front-end Job Interview Questions - HTML Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions#html-questions). Pull requests for suggestions and corrections are welcome!

#### What does a `doctype` do?

`doctype` is an abbreviation for document type. It is a declaration used in HTML5 to distinguish between a standards-compliant parsing mode and a quirks parsing mode. Hence its presence tells the browser to parse and render the webpage in standards mode.

Moral of the story, just add `<!DOCTYPE html>` to the start of your page.

###### References

- https://stackoverflow.com/questions/7695044/what-does-doctype-html-do
- https://www.w3.org/QA/Tips/Doctype

#### What's the difference between full standards mode, almost standards mode and quirks mode?

- **Quirks mode** - Layout emulates non-standard behavior in Netscape Navigator 4 and Internet Explorer 5. This is essential in order to support websites that were built before the widespread adoption of web standards. The list of quirks can be found [here](https://developer.mozilla.org/en-US/docs/Mozilla/Mozilla_quirks_mode_behavior).
- **Full standards mode** - The layout behavior is the one described by the HTML and CSS specifications.
- **Almost standards mode** - There are only a very small number of quirks implemented. Differences can be found [here](https://developer.mozilla.org/en-US/docs/Gecko's_Almost_Standards_Mode).

###### References

- https://developer.mozilla.org/en-US/docs/Quirks_Mode_and_Standards_Mode

#### What's the difference between HTML and XHTML?

XHTML belongs to the family of XML markups languages and is different from HTML. Some of differences are as follows:

- XHTML documents have to be well-formed, unlike HTML, which is more forgiving.
- XHTML is case-sensitive for element and attribute names, while HTML is not.
- Raw `<` and `&` characters are not allowed except inside of `CDATA` Sections (`<![CDATA[ ... ]]>`). JavaScript typically contains characters which can not exist in XHTML outside of CDATA Sections, such as the `<` operator. Hence it is tricky to use inline `styles` or `script` tags in XHTML and should be avoided.
- A fatal parse error in XML (such as an incorrect tag structure) causes document processing to be aborted.

Full list of differences can be found on [Wikipedia](https://en.wikipedia.org/wiki/XHTML#Relationship_to_HTML).

###### References

- https://developer.mozilla.org/en-US/docs/Archive/Web/Properly_Using_CSS_and_JavaScript_in_XHTML_Documents_
- https://en.wikipedia.org/wiki/XHTML

#### Are there any problems with serving pages as `application/xhtml+xml`?

Basically the problems lie in the differences between parsing HTML and XML as mentioned above.

- XHTML, or rather, XML syntax is less forgiving and if your page isn't fully XML-compliant, there will be parsing errors and users get unreadable content.
- Serving your pages as `application/xhtml+xml` will cause Internet Explorer 8 to show a download dialog box for an unknown format instead of displaying your page, as the first version of Internet Explorer with support for XHTML is Internet Explorer 9.

###### References

- https://developer.mozilla.org/en-US/docs/Quirks_Mode_and_Standards_Mode#XHTML

#### How do you serve a page with content in multiple languages?

The question is a little vague, I will assume that it is asking about the most common case, which is how to serve a page with content available in multiple languages, but the content within the page is only in a single language.

When an HTTP request is made to a server, the requesting user agent usually sends information about language preferences, such as in the `Accept-Language` header. The server can then use this information to return a version of the document in the appropriate language if such an alternative is available. The returned HTML document should also declare the `lang` attribute in the `<html>` tag, such as `<html lang="en">...</html>`.

In the back end, the HTML markup will contain `i18n` placeholders and content for the specific language stored in YML or JSON formats. The server then dynamically generates the HTML page with content in that particular language, usually with the help of a back end framework.

###### References

- https://www.w3.org/International/getting-started/language

#### What kind of things must you be wary of when designing or developing for multilingual sites?

- Use `lang` attribute in your HTML.
- Directing users to their native language - Allow a user to change his country/language easily without hassle.
- Text in images is not a scalable approach - Placing text in an image is still a popular way to get good-looking, non-system fonts to display on any computer. However to translate image text, each string of text will need to have it's a separate image created for each language. Anything more than a handful of replacements like this can quickly get out of control.
- Restrictive words / sentence length - Some content can be longer when written in another language. Be wary of layout or overflow issues in the design. It's best to avoid designing where the amount of text would make or break a design. Character counts come into play with things like headlines, labels, and buttons. They are less of an issue with free flowing text such as body text or comments.
- Be mindful of how colors are perceived - Colors are perceived differently across languages and cultures. The design should use color appropriately.
- Formatting dates and currencies - Calendar dates are sometimes presented in different ways. Eg. "May 31, 2012" in the U.S. vs. "31 May 2012" in parts of Europe.
- Do not concatenate translated strings - Do not do anything like `"The date today is " + date`. It will break in languages with different word order. Using template parameters instead.

###### References

- https://www.quora.com/What-kind-of-things-one-should-be-wary-of-when-designing-or-developing-for-multilingual-sites

#### What are `data-` attributes good for?

Before JavaScript frameworks became popular, front end developers used `data-` attributes to store extra data within the DOM itself, without other hacks such as non-standard attributes, extra properties on the DOM. It is intended to store custom data private to the page or application, for which there are no more appropriate attributes or elements.

These days, using `data-` attributes is not encouraged. For one thing, users can modify the data attribute easily by using inspect element in the browser. The data model is better stored within JavaScript itself and stay updated with the DOM via data binding possibly through a library or a framework.

###### References

- http://html5doctor.com/html5-custom-data-attributes/

#### Consider HTML5 as an open web platform. What are the building blocks of HTML5?

- Semantics - Allowing you to describe more precisely what your content is.
- Connectivity - Allowing you to communicate with the server in new and innovative ways.
- Offline and storage - Allowing webpages to store data on the client-side locally and operate offline more efficiently.
- Multimedia - Making video and audio first-class citizens in the Open Web.
- 2D/3D graphics and effects - Allowing a much more diverse range of presentation options.
- Performance and integration - Providing greater speed optimization and better usage of computer hardware.
- Device access - Allowing for the usage of various input and output devices.
- Styling - Letting authors write more sophisticated themes.

###### References

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5

#### Describe the difference between a `cookie`, `sessionStorage` and `localStorage`.

All the above mentioned technologies are key-value storage mechanisms on the client side. They are only able to store values as strings.

|  |`cookie`|`localStorage`|`sessionStorage`|
|--|--|--|--|
| Initiator | Client or server. Server can use `Set-Cookie` header | Client | Client |
| Expiry | Manually set | Forever | On tab close |
| Persistent across browser sessions | Depends on whether expiration is set | Yes | No |
| Have domain associated | Yes | No | No |
| Sent to server with every HTTP request| Cookies are automatically being sent via `Cookie` header | No | No |
| Capacity (per domain) | 4kb | 5MB | 5MB |
| Accessibility | Any window | Any window | Same tab |

###### References

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- http://tutorial.techaltum.com/local-and-session-storage.html

#### Describe the difference between `<script>`, `<script async>` and `<script defer>`.

- `<script>` - HTML parsing is blocked, the script is fetched and executed immediately, HTML parsing resumes after the script is executed.
- `<script async>` - The script will be fetched in parallel to HTML parsing and executed as soon as it is available (potentially before HTML parsing completes). Use `async` when the script is independent of any other scripts on the page, for example analytics.
- `<script defer>` - The script will be fetched in parallel to HTML parsing and executed when the page has finished parsing. If there are multiple of them, each deferred script is executed in the order they were encoun­tered in the document. If a script relies on a fully-parsed DOM, the `defer` attribute will be useful in ensuring that the HTML is fully parsed before executing. There's not much difference from putting a normal `<script>` at the end of `<body>`. A deferred script must not contain `document.write`.

Note: The `async` and `defer` attrib­utes are ignored for scripts that have no `src` attribute.

###### References

- http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
- https://stackoverflow.com/questions/10808109/script-tag-async-defer
- https://bitsofco.de/async-vs-defer/

#### Why is it generally a good idea to position CSS `<link>`s between `<head></head>` and JS `<script>`s just before `</body>`? Do you know any exceptions?

**Placing `<link>`s in the `<head>`**

Putting `<link>`s in the head is part of the specification. Besides that, placing at the top allows the page to render progressively which improves user experience. The problem with putting stylesheets near the bottom of the document is that it prohibits progressive rendering in many browsers, including Internet Explorer. Some browsers block rendering to avoid having to repaint elements of the page if their styles change. The user is stuck viewing a blank white page. It prevents the flash of unstyled contents.

**Placing `<scripts>`s just before `<body>`**

`<script>`s block HTML parsing while they are being downloaded and executed. Downloading the scripts at the bottom will allow the HTML to be parsed and displayed to the user first.

An exception for positioning of `<script>`s at the bottom is when your script contains `document.write()`, but these days it's not a good practice to use `document.write()`. Also, placing `<script>`s at the bottom means that the browser cannot start downloading the scripts until the entire document is parsed. One possible workaround is to put `<script>` in the `<head>` and use the `defer` attribute.

###### References

- https://developer.yahoo.com/performance/rules.html#css_top

#### What is progressive rendering?

Progressive rendering is the name given to techniques used to improve performance of a webpage (in particular, improve perceived load time) to render content for display as quickly as possible.

It used to be much more prevalent in the days before broadband internet but it is still useful in modern development as mobile data connections are becoming increasingly popular (and unreliable)!

Examples of such techniques:

- Lazy loading of images - Images on the page are not loaded all at once. JavaScript will be used to load an image when the user scrolls into the part of the page that displays the image.
- Prioritizing visible content (or above-the-fold rendering) - Include only the minimum CSS/content/scripts necessary for the amount of page that would be rendered in the users browser first to display as quickly as possible, you can then use deferred scripts or listen for the `DOMContentLoaded`/`load` event to load in other resources and content.
- Async HTML fragments - Flushing parts of the HTML to the browser as the page is constructed on the back end. More details on the technique can be found [here](http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/).

###### References

- https://stackoverflow.com/questions/33651166/what-is-progressive-rendering
- http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/

#### Have you used different HTML templating languages before?

Yes, Jade, ERB, Slim, Handlebars, Jinja, Liquid, just to name a few. In my opinion, they are more or less the same and provide similar functionality of escaping content and helpful filters for manipulating the data to be displayed. Most templating engines will also allow you to inject your own filters in the event you need custom processing before display.

### Other Answers

- https://neal.codes/blog/front-end-interview-questions-html/

## CSS Questions

Answers to [Front-end Job Interview Questions - CSS Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions#css-questions). Pull requests for suggestions and corrections are welcome!

#### What is the difference between classes and IDs in CSS?

- **IDs** - Meant to be unique within the document. Can be used to identify an element when linking using a fragment identifier. Elements can only have one `id` attribute.
- **Classes** - Can be reused on multiple elements within the document. Mainly for styling and targeting elements.

#### What's the difference between "resetting" and "normalizing" CSS? Which would you choose, and why?

- **Resetting** - Resetting is meant to strip all default browser styling on elements. For e.g. `margin`s, `padding`s, `font-size`s of all elements are reset to be the same. You will have to redeclare styling for common typographic elements.
- **Normalizing** - Normalizing preserves useful default styles rather than "unstyling" everything. It also corrects bugs for common browser dependencies.

I would choose resetting when I have very a customized or unconventional site design such that I need to do a lot of my own styling do not need any default styling to be preserved.

###### References

- https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css

#### Describe `float`s and how they work.

Float is a CSS positioning property. Floated elements remain a part of the flow of the page, and will affect the positioning of other elements (e.g. text will flow around floated elements), unlike `position: absolute` elements, which are removed from the flow of the page.

The CSS `clear` property can be used to be positioned below `left`/`right`/`both` floated elements.

If a parent element contains nothing but floated elements, its height will be collapsed to nothing. It can be fixed by clearing the float after the floated elements in the container but before the close of the container.

The `.clearfix` hack uses a clever CSS pseudo selector (:after) to clear floats. Rather than setting the overflow on the parent, you apply an additional class like `clearfix` to it. Then apply this CSS:

```css
.clearfix:after {
  content: '.';
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
```

Alternatively, give `overflow: auto` or `overflow: hidden` property to the parent element which will establish a new block formatting context inside the children and it will expand to contain its children.

###### References

- https://css-tricks.com/all-about-floats/

#### Describe `z-index` and how stacking context is formed.

The `z-index` property in CSS controls the vertical stacking order of elements that overlap. `z-index` only effects elements that have a `position` value which is not `static`.

Without any `z-index` value, elements stack in the order that they appear in the DOM (the lowest one down at the same hierarchy level appears on top). Elements with non-static positioning (and their children) will always appear on top of elements with default static positioning, regardless of HTML hierarchy.

A stacking context is an element that contains a set of layers. Within a local stacking context, the `z-index` values of its children are set relative to that element rather than to the document root. Layers outside of that context — i.e. sibling elements of a local stacking context — can't sit between layers within it. If an element B sits on top of element A, a child element of element A, element C, can never be higher than element B even if element C has a higher `z-index` than element B.

Each stacking context is self-contained - after the element's contents are stacked, the whole element is considered in the stacking order of the parent stacking context. A handful of CSS properties trigger a new stacking context, such as `opacity` less than 1, `filter` that is not `none`, and `transform that is not `none`.

###### References

- https://css-tricks.com/almanac/properties/z/z-index/
- https://philipwalton.com/articles/what-no-one-told-you-about-z-index/
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

#### Describe Block Formatting Context (BFC) and how it works.

A Block Formatting Context (BFC) is part of the visual CSS rendering of a web page in which block boxes are laid out. Floats, absolutely positioned elements, `inline-blocks`, `table-cells`, `table-caption`s, and elements with `overflow` other than `visible` (except when that value has been propagated to the viewport) establish new block formatting contexts.

A BFC is an HTML box that satisfies at least one of the following conditions:

- The value of `float` is not `none`.
- The value of `position` is neither `static` nor `relative`.
- The value of `display` is `table-cell`, `table-caption`, `inline-block`, `flex`, or `inline-flex`.
- The value of `overflow` is not `visible`.

In a BFC, each box's left outer edge touches the left edge of the containing block (for right-to-left formatting, right edges touch).

Vertical margins between adjacent block-level boxes in a BFC collapse. Read more on [collapsing margins](https://www.sitepoint.com/web-foundations/collapsing-margins/).

###### References

- https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
- https://www.sitepoint.com/understanding-block-formatting-contexts-in-css/

#### What are the various clearing techniques and which is appropriate for what context?

- Empty `div` method - `<div style="clear:both;"></div>`.
- Clearfix method - Refer to the `.clearfix` class above.
- `overflow: auto` or `overflow: hidden` method - Parent will establish a new block formatting context and expand to contains its floated children.

In large projects, I would write a utility `.clearfix` class and use them in places where I need it. `overflow: hidden` might clip children if the children is taller than the parent and is not very ideal.

#### Explain CSS sprites, and how you would implement them on a page or site.

CSS sprites combine multiple images into one single larger image. It is commonly used technique for icons (Gmail uses it). How to implement it:

1. Use a sprite generator that packs multiple images into one and generate the appropriate CSS for it.
1. Each image would have a corresponding CSS class with `background-image`, `background-position` and `background-size` properties defined.
1. To use that image, add the corresponding class to your element.

**Advantages:**

- Reduce the number of HTTP requests for multiple images (only one single request is required per spritesheet). But with HTTP2, loading multiple images is no longer much of an issue.
- Advance downloading of assets that won't be downloaded until needed, such as images that only appear upon `:hover` pseudo-states. Blinking wouldn't be seen.

#### What are your favorite image replacement techniques and which do you use when?

CSS image replacement is a technique of replacing a text element (usually a header tag like an `<h1>`) with an image (often a logo). It has its origins in the time before web fonts and SVG. For years, web developers battled against browser inconsistencies to craft image replacement techniques that struck the right balance between design and accessibility.

It's not really relevant these days. Check out the link below for all the available techniques.

###### References

- https://css-tricks.com/the-image-replacement-museum/

#### How would you approach fixing browser-specific styling issues?

- After identifying the issue and the offending browser, use a separate style sheet that only loads when that specific browser is being used. This technique requires server-side rendering though.
- Use libraries like Bootstrap that already handles these styling issues for you.
- Use `autoprefixer` to automatically add vendor prefixes to your code.
- Use Reset CSS or Normalize.css.

#### How do you serve your pages for feature-constrained browsers? What techniques/processes do you use?

- Graceful degradation - The practice of building an application for modern browsers while ensuring it remains functional in older browsers.
- Progressive enhancement - The practice of building an application for a base level of user experience, but adding functional enhancements when a browser supports it.
- Use [caniuse.com](https://caniuse.com/) to check for feature support.
- Autoprefixer for automatic vendor prefix insertion.
- Feature detection using [Modernizr](https://modernizr.com/).

#### What are the different ways to visually hide content (and make it available only for screen readers)?

These techniques are related to accessibility (a11y).

- `visibility: hidden`. However the element is still in the flow of the page, and still takes up space.
- `width: 0; height: 0`. Make the element not take up any space on the screen at all, resulting in not showing it.
- `position; absolute; left: -99999px`. Position it outside of the screen.
- `text-indent: -9999px`. This only works on text within the `block` elements.

I would go with the `absolute` positioning approach, as it has the least caveats and works for most elements.

#### Have you ever used a grid system, and if so, what do you prefer?

I like the `float`-based grid system because it still has the most browser support among the alternative existing systems (flex, grid). It has been used in for Bootstrap for years and has been proven to work.

#### Have you used or implemented media queries or mobile-specific layouts/CSS?

Yes. An example would be transforming a stacked pill navigation into a fixed-bottom tab navigation beyond a certain breakpoint.

#### Are you familiar with styling SVG?

No... Sadly.

#### How do you optimize your webpages for print?

- Create a stylesheet for print or use media queries.

```html
<!-- Main stylesheet on top -->
<link rel="stylesheet" href="/global.css" media="all" />
<!-- Print only, on bottom -->
<link rel="stylesheet" href="/print.css" media="print" />
```

Make sure to put non-print styles inside `@media screen { ... }`.

```css
@media print {
  ...
}
```

- Deliberately add page breaks.

```html
<style>
.page-break {
  display: none;
  page-break-before: always;
}
</style>

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce eu felis. Curabitur sit amet magna. Nullam aliquet. Aliquam ut diam...
<div class="page-break"></div>
Lorem ipsum dolor sit amet, consectetuer adipiscing elit....
```

###### References

- https://davidwalsh.name/optimizing-structure-print-css

#### What are some of the "gotchas" for writing efficient CSS?

Firstly, understand that browsers match selectors from rightmost (key selector) to left. Browsers filter out elements in the DOM according to the key selector, and traverse up its parent elements to determine matches. The shorter the length of the selector chain, the faster the browser can determine if that element matches the selector. Hence avoid key selectors that are tag and universal selectors. They match a large numbers of elements and browsers will have to do more work in determining if the parents do match.

[BEM (Block Element Modifier)](https://bem.info/) methodology recommends that everything has a single class, and, where you need hierarchy, that gets baked into the name of the class as well, this naturally makes the selector efficient and easy to override.

Be aware of which CSS properties trigger reflow, repaint and compositing. Avoid writing styles that change the layout (trigger reflow) where possible.

###### References

- https://developers.google.com/web/fundamentals/performance/rendering/
- https://csstriggers.com/

#### What are the advantages/disadvantages of using CSS preprocessors?

**Advantages:**

- CSS is made more maintainable.
- Easy to write nested selectors.
- Variables for consistent theming. Can share theme files across different projects.
- Mixins to generate repeated CSS.
- Splitting your code into multiple files. CSS files can be split up too but doing so will require a HTTP request to download each CSS file.

**Disadvantages:**

- Requires tools for preprocessing. Re-compilation time can be slow.

#### Describe what you like and dislike about the CSS preprocessors you have used.

**Likes:**

- Mostly the advantages mentioned above.
- Less is written in JavaScript, which plays well with Node.

**Dislikes:**

- I use Sass via `node-sass`, which is a binding for LibSass, which is written in C++. Have to frequently recompile it when switching between node versions.
- In Less, variable names are prefixed with `@`, which can be confused with native CSS keywords like `@media`, `@import` and `@font-face` rule.

#### How would you implement a web design comp that uses non-standard fonts?

Use `@font-face` and define `font-family` for different `font-weight`s.

#### Explain how a browser determines what elements match a CSS selector.

This part is related to the above about writing efficient CSS. Browsers match selectors from rightmost (key selector) to left. Browsers filter out elements in the DOM according to the key selector, and traverse up its parent elements to determine matches. The shorter the length of the selector chain, the faster the browser can determine if that element matches the selector.

For example with this selector `p span`, browsers firstly find all the `<span>` elements, and traverse up its parent all the way up to the root to find the `<p>` element. For a particular `<span>`, as soon as it finds a `<p>`, it knows that the `<span>` matches and can stop its matching.

###### References

- https://stackoverflow.com/questions/5797014/why-do-browsers-match-css-selectors-from-right-to-left

#### Describe pseudo-elements and discuss what they are used for.

A CSS pseudo-element is a keyword added to a selector that lets you style a specific part of the selected element(s). They can be used for decoration (`:first-line`, `:first-letter`) or adding elements to the markup (combined with `content: ...`) without having to modify the markup (`:before`, `:after`).

- `:first-line` and `:first-letter` can be used to decorate text.
- Used in the `.clearfix` hack as shown above to add a zero-space element with `clear: both`.
- Triangular arrows in tooltips use `:before` and `:after`. Encourages separation of concerns because the triangle is considered part of styling and not really the DOM, but not really possible to draw a triangle with just CSS styles.

###### References

- https://css-tricks.com/almanac/selectors/a/after-and-before/

#### Explain your understanding of the box model and how you would tell the browser in CSS to render your layout in different box models.

The CSS box model describes the rectangular boxes that are generated for elements in the document tree and laid out according to the visual formatting model. Each box has a content area (e.g. text, an image, etc.) and optional surrounding padding, border, and margin areas.

The CSS box model is responsible for calculating:

- How much space a block-level element takes up.
- Whether or not borders and/or margins overlap, or collapse.
- A box's dimensions.

The box model has the following rules:

- The dimensions of a block element are calculated by `width`, `height`, `padding`, `border`s, and `margin`s.
- If no height is specified, a `block` element will be as high as the content it contains, plus padding (unless there are floats, for which see below).
- If no width is specified, a non-floated `block` element will expand to fit the width of its parent minus padding.
- The `height` of an element is calculated by the content's height.
- The `width` of an element is calculated by the content's width.
- By default, `padding`s and `border`s are not part of the `width` and `height` of an element.

###### References

- https://www.smashingmagazine.com/2010/06/the-principles-of-cross-browser-css-coding/#understand-the-css-box-model

#### What does `* { box-sizing: border-box; }` do? What are its advantages?

- By default, elements have `box-sizing: content-box` applied, and only the content size is being accounted for.
- `box-sizing: border-box` changes how the `width` and `height` of elements are being calculated, `border` and `padding` are also being included in the calculation.
- The `height` of an element is now calculated by the content's height + vertical `padding` + vertical `border` width.
- The `width` of an element is now calculated by the content's width + horizontal `padding` + horizontal `border` width.

#### List as many values for the `display` property that you can remember.

- `none`, `block`, `inline`, `inline-block`, `table`, `table-row`, `table-cell`, `list-item`.

#### What's the difference between `inline` and `inline-block`?

I shall throw in a comparison with `block` for good measure.

|  |`block`|`inline-block`|`inline`|
|--|--|--|--|
| Size | Fills up the width of its parent container. | Depends on content. | Depends on content. |
| Positioning | Start on a new line and tolerates no HTML elements next to it (except when you add `float`) | Flows along with other content and allows other elements beside. | Flows along with other content and allows other elements beside. |
| Can specify `width` and `height` | Yes | Yes | No. Will ignore if being set. |
| Can be aligned with `vertical-align` | No | Yes | Yes |
| Margins and paddings | All sides respected. | All sides respected. | Only horizontal sides respected. Vertical sides, if specified, do not affect layout. Vertical space it takes up depends on `line-height`, even though the `border` and `padding` appear visually around the content. |
| Float | - | - | Becomes like a `block` element where you can set vertical margins and paddings. |

**What's the difference between a `relative`, `fixed`, `absolute` and `static`-ally positioned element?**

A positioned element is an element whose computed `position` property is either `relative`, `absolute`, `fixed` or `sticky`.

- `static` - The default position; the element will flow into the page as it normally would. The `top`, `right`, `bottom`, `left` and `z-index` properties do not apply.
- `relative` - The element's position is adjusted relative to itself, without changing layout (and thus leaving a gap for the element where it would have been had it not been positioned).
- `absolute` - The element is removed from the flow of the page and positioned at a specified position relative to its closest positioned ancestor if any, or otherwise relative to the initial containing block. Absolutely positioned boxes can have margins, and they do not collapse with any other margins. These elements do not affect the position of other elements.
- `fixed` - The element is removed from the flow of the page and positioned at a specified position relative to the viewport and doesn't move when scrolled.
- `sticky` - Sticky positioning is a hybrid of relative and fixed positioning. The element is treated as relative positioned until it crosses a specified threshold, at which point it is treated as fixed positioned.

###### References

- https://developer.mozilla.org/en/docs/Web/CSS/position

#### The 'C' in CSS stands for Cascading. How is priority determined in assigning styles (a few examples)? How can you use this system to your advantage?

Browser determines what styles to show on an element depending on the specificity of CSS rules. We assume that the browser has already determined the rules that match a particular element. Among the matching rules, the specificity, four comma-separate values, `a, b, c, d` are calculated for each rule based on the following:

1. `a` is whether inline styles are being used. If the property declaration is an inline style on the element, `a` is 1, else 0.
2. `b` is the number of ID selectors.
3. `c` is the number of classes, attributes and pseudo-classes selectors.
4. `d` is the number of tags and pseudo-elements selectors.

The resulting specificity is not a score, but a matrix of values that can be compared column by column. When comparing selectors to determine which has the highest specificity, look from left to right, and compare the highest value in each column. So a value in column `b` will override values in columns `c` and `d`, no matter what they might be. As such, specificity of `0,1,0,0` would be greater than one of `0,0,10,10`.

In the cases of equal specificity: the latest rule is the one that counts. If you have written the same rule into your style sheet (regardless of internal or external) twice, then the lower rule in your style sheet is closer to the element to be styled, it is deemed to be more specific and therefore will be applied.

I would write CSS rules with low specificity so that they can be easily overridden if necessary. When writing CSS UI component library code, it is important that they have low specificities so that users of the library can override them without using too complicated CSS rules just for the sake of increasing specificity or resorting to `!important`.

###### References

- https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/
- https://www.sitepoint.com/web-foundations/specificity/

#### What existing CSS frameworks have you used locally, or in production? How would you change/improve them?

- **Bootstrap** - Slow release cycle. Bootstrap 4 has been in alpha for almost 2 years. Add a spinner button component, as it is widely-used.
- **Semantic UI** - Source code structure makes theme customization is extremely hard to understand. Painful to customize with unconventional theming system. Hardcoded config path within the vendor library. Not well-designed for overriding variables unlike in Bootstrap.
- **Bulma** - A lot of non-semantic and superfluous classes and markup required. Not backward compatible. Upgrading versions breaks the app in subtle manners.

#### Have you played around with the new CSS Flexbox or Grid specs?

Yes. Flexbox is mainly meant for 1-dimensional layouts while Grid is meant for 2-dimensional layouts.

Flexbox solves many common problems in CSS, such as vertical centering of elements within a container, sticky footer, etc. Bootstrap and Bulma are based on Flexbox, and it is probably the recommended way to create layouts these days. Have tried Flexbox before but ran into some browser incompatibility issues (Safari) in using `flex-grow`, and I had to rewrite my code using `inline-blocks` and math to calculate the widths in percentages, it wasn't a nice experience.

Grid is by far the most intuitive approach for creating grid-based layouts (it better be!) but browser support is not wide at the moment.

###### References

- https://philipwalton.github.io/solved-by-flexbox/

#### How is responsive design different from adaptive design?

Both responsive and adaptive design attempt to optimize the user experience across different devices, adjusting for different viewport sizes, resolutions, usage contexts, control mechanisms, and so on.

Responsive design works on the principle of flexibility - a single fluid website that can look good on any device. Responsive websites use media queries, flexible grids, and responsive images to create a user experience that flexes and changes based on a multitude of factors. Like a single ball growing or shrinking to fit through several different hoops.

Adaptive design is more like the modern definition of progressive enhancement. Instead of one flexible design, adaptive design detects the device and other features, and then provides the appropriate feature and layout based on a predefined set of viewport sizes and other characteristics. The site detects the type of device used, and delivers the pre-set layout for that device. Instead of a single ball going through several different-sized hoops, you'd have several different balls to use depending on the hoop size.

###### References

- https://developer.mozilla.org/en-US/docs/Archive/Apps/Design/UI_layout_basics/Responsive_design_versus_adaptive_design
- http://mediumwell.com/responsive-adaptive-mobile/
- https://css-tricks.com/the-difference-between-responsive-and-adaptive-design/

#### Have you ever worked with retina graphics? If so, when and what techniques did you use?

I tend to use higher resolution graphics (twice the display size) to handle retina display. The better way would be to use a media query like `@media only screen and (min-device-pixel-ratio: 2) { ... }` and change the `background-image`.

For icons, I would also opt to use svgs and icon fonts where possible, as they render very crisply regardless of resolution.

Another method would be to use JavaScript to replace the `<img>` `src` attribute with higher resolution versions after checking the `window.devicePixelRatio` value.

###### References

- https://www.sitepoint.com/css-techniques-for-retina-displays/

#### Is there any reason you'd want to use `translate()` instead of `absolute` positioning, or vice-versa? And why?

`translate()` is a value of CSS `transform`. Changing `transform` or `opacity` does not trigger browser reflow or repaint, only compositions, whereas changing the absolute positioning triggers `reflow`. `transform` causes the browser to create a GPU layer for the element but changing absolute positioning properties uses the CPU. Hence `translate()` is more efficient and will result in shorter paint times for smoother animations.

When using `translate()`, the element still takes up its original space (sort of like `position: relative`), unlike in changing the absolute positioning.

###### References

- https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/

### Other Answers

- https://neal.codes/blog/front-end-interview-css-questions
- http://jgthms.com/css-interview-questions-and-answers.html
- https://quizlet.com/28293152/front-end-interview-questions-css-flash-cards/
