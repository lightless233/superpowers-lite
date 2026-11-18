---
name: lite-unslop
description: Remove AI writing patterns from Chinese and English prose while preserving facts, tone, and established terms.
disable-model-invocation: true
---

# Lite Unslop

Edit Chinese and English prose where the patterns below make it harder to read. Preserve meaning, evidence, uncertainty, and the intended tone. Keep edits within the requested scope and leave code, identifiers, and verbatim quotes intact.

Choose rules by the language of each passage. A Chinese sentence with terms such as API or fixture still follows the Chinese rules. Preserve the original language and script, and leave passages in other languages unchanged.

Keep the project's established terms.

## 中文

- 直接写结论、事实或动作。删去「值得注意的是」「需要指出的是」一类只预告下文的引导语，保留它们引出的条件、风险或例外。已经说清楚的事，结尾无需再总结一遍。
- 把空泛的评价和套话写成具体动作或结果。原文有对象、条件或数字就用上。没有依据时，删掉「显著提升」「赋能」「形成闭环」这类空话，保留有依据的判断。
- 保留有实际意义的对比和并列。删掉为制造转折而加的铺垫，也别为凑三项重复同一个意思。
- 长句按意思拆开。主语明确时可以省略，责任或动作归属容易混淆时就写出来。标点和句式按中文习惯处理。
- 保留英文技术名词和有用的细节。只改影响阅读的地方，保留原文的肯定程度和作者有意保留的表达。

| 原文 | 改写 |
| --- | --- |
| 值得注意的是，当连续三次请求超时后，客户端将切换至备用 RPC。 | 连续三次请求超时后，客户端会切换到备用 RPC。 |
| 此次改造有效提升了整体运行效率。合并重复请求后，每轮调用从 12 次减到 4 次。 | 合并重复请求后，每轮调用从 12 次减到 4 次。 |
| 需要指出的是，根据现有日志，超时可能和连接池耗尽有关，仍需看连接数确认。 | 从现有日志看，超时可能和连接池耗尽有关。还得看连接数才能确认。 |

## English

Keep terms like harness, surface, and primitive when the project already uses them for the real concept.

English rule numbers are stable ids that other skills cite. A removed rule leaves a gap.

3. No trailing "-ing" phrases that add no fact ("highlighting...", "ensuring...").
5. No vague attributions ("experts believe"). Name the source or delete.
7. No AI vocabulary: additionally, crucial, delve, enhance, foster, landscape, pivotal, showcase, testament, underscore, vibrant.
8. Say "is" or "has", not "serves as", "stands as", "boasts", "features".
9. No "not just X, but Y". State the point.
10. Don't force ideas into threes.
11. One name per thing. Repeat it.
12. No "from X to Y" unless X and Y sit on a real scale.
13. No em dashes, en dashes, or hyphens used as dashes, and no parentheses in their place. Use a period or a comma.
14. A colon goes before a list or an example, never mid-sentence as a connector.
15. Don't bold every proper noun or acronym.
16. No bold label and colon that restates its line ("**Performance:** Performance improved..."). A bold lead-in that ends in a period and adds new detail is fine.
17. Sentence case headings.
18. No decorative emojis.
19. Straight quotes.
20. No chatbot phrases ("I hope this helps!", "Let me know if...").
22. No praise or agreement openers. Respond directly.
23. Cut filler. "In order to" becomes "to". Delete "it is important to note that".
24. One hedge at most: "may".
25. No generic conclusions. State specific plans or facts.
26. No abstract metaphor nouns: substrate, wedge, vector, nexus, primitive, harness, surface, scaffolding, paradigm, ratchet, north star, flywheel. Use the concrete word. Keep the word when it is the established name of the thing.
27. Say what it does, not how it feels. Name the mechanism or the number. Cut a sentence that could appear unchanged in another project's docs.
28. One idea per sentence. Split a sentence the reader has to reread.
29. Active voice. Name the actor unless it is unknown or doesn't matter.
30. Cut adverbs or use a stronger verb. Give the number.
31. Use the plain word: "use", not "utilize" or "leverage".
32. No metaphor, aphorism, personified code, or figurative verb where a literal phrase exists.
33. Write whole sentences with their articles and verbs. Spell out arrows and abbreviations.
