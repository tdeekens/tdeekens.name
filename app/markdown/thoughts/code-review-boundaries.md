# Boundaries of code review (or who to involve)

Software engineering seems to agree that code review is a meaningful and important activity. Still, it seems to disagree in how to carry out the act and who to involve. Pre and post commit review is often thrown into the bowl and stirred up and boiled with efficiency (time to production) spices - a mostly misleading argument. Code review should be a first class citizen and priority to software development otherwise it will be perceived as a bottleneck and will slowly be discarded.

Code review is to tighten and stabilise code. Creating an agreement around it accepting that it will embody all communication previously performed around it. The more of this being carried out upfront, the lower the fragility of code and need to reiterate around it. New code is easier to get in than out and will be read more often than it is written. Poor decisions will hit a department and slow it down over time. Hence, there is a higher cost in change after merging than there is before.

The often forgotten stakeholder and participant in code review is the consumer of an API or component. He is to judge if it fits his domain and integrates well. In order not to allow to too many cooks spoiling the broth different roles can help and be set up. Roles defining themselves around the area they have a say in. Cohesion and consistency - even though often overrated - should be judged by the creators of a module and the owners of a project. External facing artefacts such as APIs or UX should be evaluated by the appropriate party.

Lastly, the importance of review friendliness increases with the number of its participants. An approach to this to commit early and often to tighten the interaction loops. Communication around a feature is linear in time as should the history of changes. This allows everybody to step in early and avoids the big bang review.

Summarising the above: do not underestimate the impact and importance of code review. Do not hesitate to involve different parties from across an organisation with it but define their roles.
