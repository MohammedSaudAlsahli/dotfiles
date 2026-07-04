---
name: code-standards
description: Automated code review standards and checks
---

# Code Review Standards

Review code systematically using these steps:

1. **Critical Issues**: Security vulnerabilities, memory leaks, logic bugs, missing error handling
2. **Code Quality**: Functions over 50 lines, code duplication, confusing names, missing types
3. **Style Guide**: Check references/style-guide.md for naming and organization
4. **Linting**: Flag common issues like use of `var`, leftover `console.log` statements, and `debugger` statements

Provide feedback in this format:

**Summary**: One sentence overview

**Critical Issues**: List with line numbers

**Suggestions**: Improvements that would help

**Positive Notes**: What the code does well
