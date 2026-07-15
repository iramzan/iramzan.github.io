---
title: "Migrating Data Centres to AWS, Part 1: What Discovery Actually Tells You"
description: "Lessons from running AWS MAP programmes as a consultant — why the Assess phase decides whether your migration succeeds, and what organisations discover about their own estates when the lights come on."
pubDate: 2026-07-14
tags: ["aws", "migration", "map", "cloud", "data-centre"]
series: "Data Centre Migrations to AWS"
part: 1
seriesTotal: 3
---

For roughly three years, I worked as a Lead Consultant at an AWS Premier Consulting Partner in Sydney, and a large share of that time was spent on AWS Migration Acceleration Program (MAP) engagements — moving entire on-premises estates to AWS for enterprises across banking, utilities, and retail. This series is my attempt to write down what those programmes actually taught me, because most of the interesting lessons aren't in the official documentation.

A quick orientation first. MAP structures a migration into three phases. **Assess** builds the business case: you discover what's actually running in the data centre, understand why the organisation wants to move, and produce a directional cost model. **Mobilize** builds the foundation: the AWS landing zone, the migration tooling, the detailed wave plans, and usually a pilot migration to prove the machinery works. **Migrate & Modernize** is the execution: waves of workloads moving, cutting over, and being optimised on the other side.

This first article is about Assess — because in my experience, migrations don't fail during migration. They fail during discovery, and you only find out later.

## Turning the lights on

The first practical problem in any migration is that nobody actually knows what's in the data centre. Not completely. The CMDB is out of date; the spreadsheet the infrastructure team maintains was last updated two years ago, and three rounds of staff turnover have led to gaps in institutional knowledge.

So discovery starts with tooling. We would deploy discovery agents or agentless collectors into the on-premise environment — using a combination of tools such as CloudAmize, AWS Application Discovery Service, and others depending on the client's environment — to capture server inventory, utilisation, and crucially, network dependency data. Which servers talk to which, on what ports, how often. That dependency map becomes the backbone of everything that follows.

Where the estate ran on VMware — which was almost always — we'd supplement this with the exports vCenter already provides. Tools like RVTools give you a remarkably complete picture of the virtual estate in an afternoon: every VM, its resource allocation, its actual utilisation, snapshots that have been quietly consuming storage for eighteen months. Between agent-based dependency data and VMware's own telemetry, you go from darkness to genuine visibility in a matter of weeks.

## The estate nobody knew they had

Here is what happens on every single engagement, without exception: the organisation discovers servers that no one can account for.

Machines that belonged to a project that ended in 2019. A "temporary" file server that became load-bearing. Development environments cloned for a proof of concept and never deleted. Servers where the answer to "who owns this?" is a chain of five emails ending at someone who resigned. On a typical enterprise estate, a meaningful percentage of running servers fall into the category of *should have been decommissioned long ago*.

This is not a criticism of any particular IT team. It's the natural entropy of a data centre that's been accumulating for fifteen years. But it matters enormously for the migration, because every one of those servers is a cost you don't need to carry into the cloud. One of the cheapest, highest-ROI activities in the entire programme is simply retiring what discovery flags as idle. You haven't migrated anything yet, and you've already improved the business case.

## The footprint that shouldn't move at all

Another, less obvious realisation: a significant slice of the on-premise estate exists purely to keep the on-premise estate running, and has no business existing in the cloud.

The VMware management stack — vCenter, management clusters, the supporting infrastructure. The on-premise backup estate: media servers, backup proxies, tape infrastructure. Monitoring platforms like SCOM and their gateway servers. Patching infrastructure, jump hosts, out-of-band management. None of this migrates. In AWS these functions are either native services (AWS Backup, CloudWatch, Systems Manager) or they simply cease to be necessary.

When you strip out the retire-candidates and the operational scaffolding, the estate that actually needs a migration treatment is often noticeably smaller than the raw server count suggested. That reframing — from "we have 2,000 servers to move" to "we have a much smaller set of workloads that matter, plus a long tail we can retire or replace" — changes the tone of the whole programme.

## The hardest part isn't technical

I'll be blunt: the discovery tooling is the easy bit. The hardest part of the Assess phase is extracting accurate information from the right stakeholders.

Application owners who inherited a system and genuinely don't know how it works. Teams who under-report dependencies because they've never had to think about them. And the truly difficult category: applications built and hosted in the on-premise data centre by external vendors, where the organisation doesn't fully control the system, the vendor contract never contemplated a cloud migration, and getting a straight answer about architecture requires commercial negotiation before technical discussion can even begin. Vendor-hosted workloads consistently generated more planning effort per server than anything else in the estate.

This is where structured discovery workshops deliver real value. At CMD we had invested in our own workshop framework and tooling — a structured question set spanning application architecture, dependencies, data, compliance, operational ownership, and business criticality — precisely so that stakeholder conversations produced consistent, comparable data rather than tribal knowledge. I won't go into the internals, but the principle is transferable: if your discovery conversations aren't following a repeatable structure, you're collecting stories, not data.

## Never skip the "why"

There's one workshop output people consistently forget about, and it's arguably the most important artifact of the entire Assess phase: *why does this organisation want to migrate?*

A key part of the initial discovery process was sitting the sponsoring stakeholders down and making them articulate their drivers. Data centre exit deadline? Cost reduction? Agility and deployment speed? Resilience? Regulatory pressure? The answers differ wildly between organisations, and those answers should drive key decisions for the next eighteen months. An organisation migrating to beat a data centre exit date should bias heavily toward rehosting and speed. An organisation migrating for agility should accept a slower programme with more replatforming. When there's later confusion about the migration treatment for an ambiguous workload — and there will be — the documented "why" settles it. Programmes that skip this step end up reopening strategic decisions in the middle of execution, which is the most expensive possible time to do it.

## The hardware refresh sweet spot

One more Assess-phase input that outsiders rarely appreciate: the data centre hardware refresh cycle is often the single biggest lever in the ROI model.

The economics work best in a sweet spot. If the refresh is too close — hardware already end-of-life, support contracts expiring in six months — the organisation is forced to buy new kit anyway, and the migration business case takes the hit of double-spend. If the refresh is too far away — hardware refreshed last year, depreciating happily for another four — finance will reasonably ask why you'd walk away from sunk cost. The ideal position is a refresh sitting eighteen months to three years out: near enough that avoided hardware spend funds a real chunk of the migration, far enough that the programme can complete before anyone is forced into an emergency purchase. Whenever we could time a migration against that window, the business case largely wrote itself.

## What Assess should hand to Mobilize

Done properly, the Assess phase ends with a rationalised inventory, a dependency map, a documented set of business drivers, a directional cost model anchored to the refresh cycle, and a stakeholder base that has already been forced to think hard about its own applications.

In [Part 2](#), I'll cover the Mobilize phase: designing the landing zone, choosing the right migration treatment for every workload, planning migration waves — and why Microsoft workloads deserve their own strategy entirely.

---

*Imran Ramzan | 21 years leading cloud, platform engineering, and AI platform strategy.
Drawing on real-world leadership and cloud engagements in the UAE and globally, I write about the realities of scaling platforms for the AI era. While I use AI tools to help shape and polish this content, the technical insights and opinions are entirely my own.*