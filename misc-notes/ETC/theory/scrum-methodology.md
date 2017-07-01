Scrum Methodology
=================

> In an attempt to produce a [more leakproof abstraction](http://www.joelonsoftware.com/articles/DevelopmentAbstraction.html).

Scrum is a software development management framework for incremental product development associated with the [Agile software development](https://en.wikipedia.org/wiki/Agile_software_development) movement. It defines a flexible, holistic product development strategy where a development team works as a unit to reach a common goal; challenging assumptions of the traditional, sequential approach to product development. 

[Agility](http://pragdave.me/blog/2014/03/04/time-to-kill-agile/) in software development is built on the principle of a simple feedback loop: find out where you are, take a small step towards your goal, adjust your understanding based on what you learned and then repeat.

### Contents ###

1. Introduction to Scrum
2. Backlog Refinement Meeting
3. Sprint Planning Meeting
4. Daily Scrum Meeting
5. Sprint Review Meeting
6. Sprint Retrospective Meeting

### A Note About the Videos ###

The header of each main section below links to a video with additional notes. Neither the notes on the videos nor the notes here are a substitute for watching the videos, as each one shows a fictional team implementing the topic under discussion and working through some of the challenges they may face. 

### Scrum Reference Card ###

Additionally, you can download a nice [Scrum Reference Card](http://scrumreferencecard.com/ScrumReferenceCard.pdf) in PDF format for quick reference.

## [Introduction to Scrum](http://scrumtrainingseries.com/Intro_to_Scrum/Intro_to_Scrum.htm) and Agility ##

In rugby, a scrum (short for scrummage) involves players packing closely together with their heads down, attempting to gain possession of the ball. In Scrum,  the whole product development process is performed by one cross-functional team across multiple overlapping phases, where the team "tries to go the distance as a unit, passing the ball back and forth".

While Scrum encourages physical proximity of the team, it is possible to do the same thing with close online collaboration of all team members.

### [Cone of Uncertainty](https://en.wikipedia.org/wiki/Cone_of_Uncertainty) ###

The Cone of Uncertainty is a graphic depiction of the increasing accuracy that is possible for estimates as the technical and functional details of a project become more known over time. It is a heuristic used to guide estimates and manage expectations.

During the development process a project starts out with a large degree of variability. An estimate *may* be accurate but that **cannot be assumed**. Generally, any estimates will be very loose and may be wildly inaccurate. As decisions are made, research is conducted and more of the project is completed, the degree of variability decreases. This is why a project estimates might start out with high variable percentages (±40%) in the beginning, but see the rate of variance decrease over time.

Understanding this variability is key to developing realistic plans.

**Narrowing The Cone**

> One question that managers and customers ask is, "If I give you another week to work on your estimate, can you refine it so that it contains less uncertainty?" That’s a reasonable request, but unfortunately it’s not possible to deliver on that request. Research has found that the accuracy of the software estimate depends on the level of refinement of the software’s definition. The more refined the definition, the more accurate the estimate. The reason the estimate contains variability is that the software project itself contains variability. The only way to reduce the variability in the estimate is to reduce the variability in the project itself. - **[construx.com](http://www.construx.com/Thought_Leadership/Books/The_Cone_of_Uncertainty/)**


### Roles ###

As Scrum principles are centered around self-organizing teams, only three roles are "officially" identified.

- [**Product Owner**](https://www.youtube.com/watch?v=502ILHjX9EE&noredirect=1)
*The Product Owner should be a person with __vision__, __authority__, and __availability__. The Product Owner is responsible for continuously communicating the vision and priorities to the development team.*
	- Single person responsible for maximizing the return on investment (ROI) of the development effort.
	- Responsible for product vision.
	- Constantly re-prioritizes the Product Backlog, adjusting any long-term expectations such as release plans.
	- Final arbiter of requirements questions.
	- Accepts or rejects each product increment.
	- Decides whether to ship.
	- Decides whether to continue development.
	- Considers stakeholder interests.
	- May contribute as a team member.

>It’s sometimes hard for Product Owners to strike the right balance of involvement. Because Scrum values self-organization among teams, a Product Owner must fight the urge to [micromanage](https://en.wikipedia.org/wiki/Micromanagement). At the same time, Product Owners must be available to answer questions from the team.


- **Development Team**
*A Scrum development team contains about seven fully dedicated members (officially 3-9), ideally in one team room protected from outside distractions. For software projects, a typical team includes a mix of software engineers, architects, programmers, analysts, QA experts, testers, and UI designers. Each sprint, the team is responsible for determining how it will accomplish the work to be completed. The team has autonomy and responsibility to meet the goals of the sprint.*
	- Cross-functional (e.g., includes members with testing skills, and often others not traditionally called developers: business analysts, domain experts, etc.).
	- Self-organizing / self-managing, without externally assigned roles.
	- Negotiates commitments with the Product Owner, one Sprint at a time.
	- Has autonomy regarding how to reach commitments.
	- Intensely collaborative.
	- Most successful when located in one team room, particularly for the first few Sprints.
	- Most successful with long-term, full-time membership. Scrum moves work to a flexible learning team and avoids moving people or splitting them between teams.

> In general, the community is shifting away from the term 'commit' in favor of the word 'forecast', acknowledging the inherit uncertainty embraced by agility in software development.

- **Scrum Master**
*The Scrum Master does not manage the team. The Scrum Master works to remove any impediments that are obstructing the team from achieving its sprint goals. This helps the team remain creative and productive while making sure its successes are visible to the Product Owner.*
	- Facilitates the Scrum process.
	- Helps resolve impediments.
	- Creates an environment conducive to team self-organization.
	- Captures empirical data to adjust forecasts.
	- Shields the team from external interference and distractions to keep it in group flow (a.k.a. the zone).
	- Enforces timeboxes.
	- Keeps Scrum artifacts visible.
	- Promotes improved engineering practices.
	- Has no management authority over the team.

### Artifacts ###

- **Product Backlog**
The Product Backlog is a force-ranked list of everything we might ever do, prioritized (or "ordered") by the Product Owner. Product Backlog Items (PBIs) are often written in User Story form. One symptom of a less-effective Scrum implementation is a Product Backlog containing conventional tasks rather than well-formed Product Backlog Items representing customer-centric functionality.

- **Sprint Backlog**
The Sprint Backlog is the work planned to do to achieve the goal of the current Sprint only, typically committed (or "forecasted") PBIs and related Sprint Tasks. While PBIs should focus on the what, Sprint Tasks represent the how.

- **Information Radiators**
Most Agile methodologies make use of big visible charts (or BVCs) for tracking progress and issues; the idea is to display important project information not in some formal way that is on the web or lost in some tool, but in charts on the wall that no one can miss. Scrum makes frequent use of **burndown charts**. Common ones include Sprint Burndown Charts, Product Burndown Charts and Release Burndown Charts. However, these charts are not generally considered *artifacts* in that they typically do not survive beyond their scope.

### The Five Scrum Meetings ###

- Backlog Grooming
- Sprint Planning
- Daily Scrum
- Sprint Review
- Sprint Retrospective

### Using Scrum ###

Scrum was not originally intended for repeatable types of production and services. Scrum is intended for the kinds of work people have found unmanageable using defined processes - uncertain requirements combined with unpredictable technology implementation risks. When deciding whether to apply Scrum - as opposed to plan-driven approaches - consider:

- Are the underlying mechanisms well-understood?
- Does the work depends on knowledge creation and collaboration?

In smaller organizations, teams tend to focus on entire products. In larger organizations, teams are generally focused only on a feature of the overall product. 

### [Development Spikes](http://agiledictionary.com/209/spike/) ###

> If we knew what we were doing, it wouldn't be research. - Albert Einstein

Spikes are a special type of story that are used for activities such as research, design, exploration and prototyping. The purpose of a spike is to gain the knowledge necessary to reduce the risk of a technical approach, better understand a requirement, or increase the reliability of a story estimate - rather than at producing a shippable product. Spikes primarily come in two forms, technical and functional.

- Functional spikes are used to analyze aggregate functional behavior and to determine how to break it down, how it might be organized and where risk and complexity exists, in turn influencing implementation decisions.

- Technical spikes are used to determine feasibility and impact of design strategies.

Like other stories, spikes are estimated, owned by a team member, and are demonstrated at the end of the iteration.

If you want to know more about development spikes, you can [read more here](http://scaledagileframework.com/spikes/).

## [Backlog Refinement Meeting](http://scrumtrainingseries.com/BacklogRefinementMeeting/BacklogRefinementMeeting.htm) ##

This meeting is typically held a few days before the Sprint Planning meeting and facilitated by the Scrum Master. In it, PBIs are clarified, decomposed, prioritized and estimated. Taking time outside of sprint execution to do this is valuable for several reasons - such as that the Product Owner has time to resolve any questions that come out of the meeting before the Sprint Planning Meeting, resulting in the Sprint Planning Meeting moving faster because everything is (mostly) prioritized and estimated.

> Any work that must be done by the team **and** represents business value or consumes time and attention from the team is worth listing in the Product Backlog.

### [INVEST and SMART](http://xp123.com/articles/invest-in-good-stories-and-smart-tasks/) ###

Characteristics of Good User Stories:
```
I - Independent
N - Negotialble
V - Valuable
E - Estimable
S - Small
T - Testable
```

Characteristics of Good Tasks:
```
S - Specific
M - Measurable
A - Achievable
R - Relevant
T - Time-Boxed
```

### Estimation ###

It's important that everyone agree on the method used for estimating User Stories and tasks. Some popular methods are:

- T-shirt Sizes: S, M, L and XL
- Fibonacci Numbers: 1, 2, 3, 5, 8, 13, etc.
- Small, or it needs to be broken down

Having used all three, I prefer the last options - small or it needs to be broken down - for smaller teams, and T-shirt sizes for larger teams. Ultimately, estimates don't really matter that much in Scrum. Rather, teams should use their experience, expertise and gut-feeling to determine what to do in a Sprint.

### Splitting User Stories ###

These links are incredibly useful to teams just getting started and need help figuring out how (and when) to split user stories.

- [15 Ways to Split an Epic, a Team Exercise](http://blogs.collab.net/agile/15-ways-to-split-an-epic-a-team-exercise#.ViAhQH6rQuU)
- [How To Split A User Story](http://www.agileforall.com/wp-content/uploads/2012/01/Story-Splitting-Flowchart.pdf) (pdf)


## [Sprint Planning Meeting](http://scrumtrainingseries.com/SprintPlanningMeeting/SprintPlanningMeeting.htm) ##

Facilitated by the Scrum Master and held at the beginning of each sprint, this meeting is where the Product Owner and the Development Team negotiate which PBIs they will attempt to convert to working product during the sprint. The product owner sets the priorities (while the Backlog Grooming should have taken care of most of that), and the development team selects the amount of work they feel they can implement without accruing [technical debt](https://en.wikipedia.org/wiki/Technical_debt).

When teams are given complex work that has inherent uncertainty, they must work together to intuitively gauge their capacity to commit to items, while learning from previous Sprints. By contrast, planning their hourly capacity and comparing their estimates to actuals makes the team **pretend to be precise** and reduces ownership of their commitments. Unless the work is truly predictable, they should discard such practices.

Until a team has learned how to complete a potentially-shippable product increment each Sprint, it should reduce the amount of functionality it commits to. Failure to do so leads to technical debt and eventual design death.

Toward the end of the Sprint Planning Meeting, the team breaks the selected items into an initial list of Sprint Tasks, and makes a final commitment to attempt the work. Keep in mind that [working overtime on a Scrum project is an unhealthy sign](https://agilepainrelief.com/notesfromatooluser/2014/03/scrummaster-tales-overtime-on-a-scrum-team-is-an-unhealthy-sign.html), and that having too much work in progress (WIP) will actually slow things down.

> Unsurprisingly (hopefully), the development team is not expected to know all the tasks necessary to complete the committed PBIs prior to the Sprint Planning Meeting. Neither, however, should they be expected to figure all of them out during this meeting. According to [Agile Project Management](http://www.amazon.com/Agile-Project-Management-Developer-Practices/dp/073561993X/), only 60% of tasks are likely to be identified during the Sprint Planning Meeting. Other tasks, such as unanticipated dependencies, will be discovered during sprint execution.

Avoid the temptation to assign tasks to team members at this point. Instead, team member should wait until the last possible moment to volunteer for a task.

### Definition of Done ###

*Note that this is for a PBI, not a task.*

The definition of done establishes what must be true of each PBI for it to be considered done. Having and knowing your teams definition beforehand adds clarity the "feature is done" statement so commonly said by development. While the definition of done for a given team is not static - it can and should evolve over time - some common aspects of that definition include:

- The code is well written. It doesn't have to be perfect, but we shouldn't feel like it immediately needs to be rewritten.
- The code (and related artifacts, as applicable) are checked in to source control.
- The code has been properly reviewed.
- The code comes with and is passing tests at all appropriate levels.
- The feature implemented by the code has been documented in all appropriate places.

When considering the above list or any additional items for your teams definition of done, ask:

- Can we do this for each features?
- Can we do this for each sprint?
- Do we need to do this for each release?

Some teams will have [multiple definitions of done](https://www.mountaingoatsoftware.com/blog/multiple-levels-of-done), according to their business needs and industry expectations. This should be considered the rare exception to the rule, not a loophole to avoid doing work the team does not want to do.

### Code Review Guidelines ###

As a summary of [Code Review Like You Mean It](http://haacked.com/archive/2013/10/28/code-review-like-you-mean-it.aspx/) and [How To Write The Perfect Pull Request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request):

- Review a reasonable amount of code at a time
- Focus on code and not the author
- Keep a code review checklist
- Step through the code

## [Daily Scrum Meeting](http://scrumtrainingseries.com/DailyScrumMeeting/DailyScrumMeeting.htm) ##

In addition to clear, short-term goals, a key to the success of a self-organized teams is the ability to gauge the groups progress - and the daily scrum meetings fill this purpose. They also provide the opportunity to observe each others contributions. Daily scrum is a regularly scheduled meeting - ideally, as the name suggests, daily and at the same time - of no more than 15 minutes where each member of the development team responds to the same three questions. To help keep the meeting short, participants are encouraged to stand; hence the other common term for this meeting: [Stand-up](https://en.wikipedia.org/wiki/Stand-up_meeting).

**The Three Questions**

- What did I do yesterday?
- What are my roadblocks?
- What am I doing today?

During Sprint execution it is common to discover additional tasks necessary to achieve the Sprint goals, and those tasks should be added to whatever mechanism is being used to track work in the sprint. Impediments caused by issues beyond the team’s control are considered organizational impediments, and in addition to being noted by the team, they should be raised by the scrum master to the appropriate organizational level necessary to resolve the impediment.

> A common mechanism for managing the tasks in a sprint is the use of a [Kanban board](https://en.wikipedia.org/wiki/Kanban_board), of which [Trello](https://trello.com/) would be an example of a digital implementation.

This meeting is not the place to discuss problems or dig deep into solutions. If that needs to happen, interested parties should engage after the meeting to have the requisite discussions. **Do not hijack the stand-up meeting for this!** While the scrum master can help facilitate, it is the responsibility of every team member to help stay on topic. If necessary, keep a parking lot or sidebar for those things.

### Pair Programming ###

TODO: Sensitive topic, tread lightly

### Test Driven Development ###

TODO: https://en.wikipedia.org/wiki/Test-driven_development

## [Sprint Review Meeting](http://scrumtrainingseries.com/SprintReviewMeeting/SprintReviewMeeting.htm) ##

At the end of each sprint, the team will demonstrate the working product increment to the Product Owner and any other interested stakeholders. This should feature a live demonstration, not a report. A typical Sprint Review meeting will consist of the following agenda items, in the order listed below.

> The sprint is done at the end of the time box, not when all the tasks have been completed.

### Product Demonstration ###

Every sprint is designed to produce a potentially shippable product, however small. So it naturally falls that the primary purpose of the Sprint Review will be to demonstrate what was completed. It's important to stick to what was committed to and completed during the sprint, and not get caught up in discussions of what needs to be changed or done next. There will be time for that later in this meeting.

It's also a good time to note that any kind of feedback, positive or negative, is not appropriate for this meeting. Extrinsic manipulation (e.g. praise) is considered harmful to intrinsic motivation and transparency.

> Before attempting to motivate people, **it would be wise to have a clear understanding of [what motivates them](https://www.youtube.com/watch?v=u6XAPnuFjJc)**.

### Decide On Done ###

Based on the previously determined definition of done, the Product Owner determines which PBIs were completed in this sprint. Incomplete PBIs are returned to the Product Backlog, regardless of how far towards completion they are. Nor does it matter how many tasks were completed in relation to the PBI - if it doesn't match the definition of done, it's not done.

### Measure Velocity ###

Velocity is determined by measuring how much work was determined by the product owner to be **done** in the sprint. Use the same unit of measure that was used to provide the initial estimates for the PBI.


Items are counted toward velocity only after the Product Owner considers them done, as the only purpose of velocity is for the product owner to make forecasts.

http://scrumreferencecard.com/MacroMeasurementWhitepaper.pdf

### Get Stakeholder Feedback ###



## [Sprint Retrospective Meeting](http://scrumtrainingseries.com/SprintRetrospectiveMeeting/SprintRetrospectiveMeeting.htm) ##

