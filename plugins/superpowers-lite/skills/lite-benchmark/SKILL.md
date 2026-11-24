---
name: lite-benchmark
description: "Load BEFORE producing, reporting, comparing, or choosing from any measured speedup, slowdown, throughput, or latency number (including rough single-run estimates). Do not use for ordinary non-performance completion claims."
---

# Lite Benchmark

Vet a measured performance number before reporting it or choosing from it. Answer from a run, not from a guess about the code.

A rough magnitude the user asked for needs one run. Check errors and whether the work happened, and say that it is one run. Skip the limiter, configuration, limits, repeatability, and end-to-end share unless that run looks wrong. Choosing between implementations, libraries, or configurations, or reporting a difference you will act on, is never a rough magnitude.

## Before measuring

Write the claim in the words you would report, such as "export is 30% faster at p50 on the 60k-row dataset." Read the measurement script and note what it times, counts, and ignores. Check whether the machine is busy. `uptime` and `nproc` are examples. If you cannot stop the other work, interleave the sides so both see the same noise, and say so.

If the measurement will guide a choice, state that choice and what result would change it before running the comparison. Use any agreed threshold and apply the repeatability check below.

## Check the number

A rough magnitude checks only items 4 and 7. Run another item when that one run looks wrong. A comparison, or a number you will act on, uses every applicable item.

1. **Limiter.** Name what bounds the result. Profile in a run you do not report, because profilers change the timing. Map the hot spot to source. If the load generator saturates first, you measured the load generator. If a change did not move the number, the limiter explains why.
2. **Configuration.** Run every side in the configuration the claim is about: build mode, flags, batching, pools, caches, versions, and data. Defaults are the right configuration when the claim is about out-of-the-box behavior. A side that does not match the claim, such as a debug build in a production comparison, is not configured for this comparison. Match it and measure again before picking a winner. If you cannot, do not pick a winner for that claim.
3. **Limits.** Compare the result with the hardware and with the time the changed piece actually took. Removing a piece that takes 10% of the run can make the run at most about 11% faster. A result past a physical or accounting limit measured something other than the work.
4. **Errors.** Count failures and non-success responses, and check that outputs are correct. Rejections are often fast, and timeouts and retries are slow. If the script does not count errors, add the count.
5. **Repeatability.** For a comparison, alternate sides and report the median and range. A gap smaller than the run-to-run variation is no measurable difference.
6. **Share of the wait.** Next to a local result, measure the path a user waits on, with realistic data and concurrency, and report the local result as a share of that path.
7. **Work happened.** Confirm the work ran inside the timed region: the request arrived, the rows were written, the bytes were read, and the code used the result. Lazy work nobody consumes, and timeouts, produce numbers for work that never happened.

## Report

Lead with one verdict: faster, slower, no measurable difference, or inconclusive. Give the number, its unit, the run count, and the range. For a comparison, also name the limiter.

A rough magnitude reports the one run and the error and work-happened results. It does not become inconclusive merely because it has no limiter profile.

Call a comparison inconclusive when you claim a difference but cannot name the limiter, when a side was not configured for the claim, or when errors or work-happened were not checked. Name the gap.

Put the verdict in the reply. Do not create a notes file unless the user asks for one. Return control to the caller. Do not open a spec, plan, or review from this skill.
