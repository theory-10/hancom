---
name: learning-journal
description: >
  This skill should be used ONLY when the user says the exact activation
  phrase "영역전개 학습일지정리" (minor spacing/particle variations are fine,
  e.g. "영역전개: 학습일지 정리"), or when a session-end hook signals that a
  web-development learning session just finished. It defines the format and
  process for turning errors, issues, and lessons from a coding session into
  a beginner-friendly markdown journal entry, and for confirming with the
  user before saving it.
metadata:
  version: "0.1.0"
---

# Learning Journal

Turn a web-development learning session into a short, beginner-friendly
markdown journal entry, then save it to a running log file only after the
user confirms the draft.

## When triggered

This skill is intentionally activated by a specific command phrase, not by
general conversation about learning or studying. Treat it like a deliberate
"activation command," similar to a fixed spell phrase — it should not fire
just because the conversation touches on errors, bugs, or things the user
learned.

- **Directly by the user**: only when they say the exact phrase "영역전개
  학습일지정리" (small spacing or particle variations are fine — e.g. "영역전개:
  학습일지 정리해줘" — but do not trigger on loose paraphrases like "오늘 배운거
  정리해줘" or "오늘 뭐 배웠지" with no mention of the activation phrase).
- **Questions about the phrase itself** (e.g. "영역전개가 뭐였지?", "그 명령어가
  뭐더라?") are not activations — only an actual invocation of the phrase
  triggers the skill.
- **Automatically at the end of a session** (via the Stop hook), which asks
  you to check whether anything worth logging happened. This path is
  separate from the manual activation phrase and stays enabled.

## Log file

- Path: `./learning-log.md`, relative to the current working directory (the
  user's project folder).
- If the file does not exist, create it with a top-level heading:
  `# 학습 일지` followed by a blank line.
- Always append new entries; never overwrite or remove existing entries.
- New entries go at the end of the file, in a new `## YYYY-MM-DD` section for
  today's date. If a section for today's date already exists, add to it
  instead of creating a duplicate section.

## Process

1. Delegate the actual review and drafting to the `learning-journal-writer`
   agent — pass it the context of what happened in this session (errors
   encountered, questions asked, concepts explained, code written).
2. If the agent determines nothing substantive happened (no errors, no new
   concepts, purely administrative chat), tell the user briefly that there's
   nothing worth logging today and stop. Do not create an empty or
   filler entry.
3. If there is something to log, show the user the full drafted entry
   (exactly as it would be written to the file) and ask for confirmation
   before saving, e.g.: "이렇게 학습 일지에 저장할까요?"
4. If the user asks for changes, revise the draft and confirm again. Only
   append to `learning-log.md` after explicit approval ("응", "좋아", "저장해
   줘" or similar).
5. After saving, briefly confirm what was added and where.

## Entry format

Write each entry in this structure. Keep language plain and beginner-friendly
— avoid unexplained jargon, and when a technical term is unavoidable, add a
short parenthetical explanation the first time it's used in the entry.

```markdown
## YYYY-MM-DD

### 오늘 겪은 에러/이슈
- (에러나 막혔던 지점을 한두 문장으로, 왜 발생했는지 쉬운 말로 설명)

### 배운 점
- (새로 이해한 개념이나 기법을 한두 문장으로)

### 참고한 자료
- (세션 중 참고했던 문서/링크가 있으면. 없으면 이 섹션은 생략)
```

Omit a subsection entirely (rather than leaving it empty) if there's nothing
to put in it. If both "오늘 겪은 에러/이슈" and "배운 점" would be empty, there is
nothing to log — follow step 2 above instead of writing the entry.

## Tone

Write as if explaining to someone who is still building their mental model of
how the web works. Prefer concrete, plain-language explanations over formal
technical definitions. The goal is that re-reading this entry weeks later
should refresh the user's memory of both what happened and why it mattered.
