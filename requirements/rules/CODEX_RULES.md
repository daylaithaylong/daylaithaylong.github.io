# Codex Editing Rules (Vietnamese Safety)

## Absolute rules
- Do NOT modify Vietnamese text content anywhere (no rewording, no “fixing”, no escaping changes).
- Do NOT reformat whole files. Only make minimal local edits.
- Only output/apply unified diffs (patch style), never rewrite entire HTML files.
- Keep all files UTF-8.

## Verification
After any change, run:
- search for mojibake patterns: Ã, Â, á»
If found, revert the change immediately.
