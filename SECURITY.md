# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.5.x   | :white_check_mark: |
| < 1.5   | :x:                |

## Reporting a Vulnerability

The SimpleQBN team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to the project maintainer. You can find contact information in the package.json `author` field or on the GitHub profile.

Include the following information in your report:

- Type of vulnerability
- Full paths of affected source files
- Location of the affected code (tag/branch/commit/direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability and how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours
- **Confirmation**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: Within 7 days
  - High: Within 30 days
  - Medium/Low: Next release cycle

### Public Disclosure

We practice responsible disclosure:

1. We will confirm the vulnerability and determine its impact
2. We will release a fix as soon as possible
3. We will credit you in the release notes (unless you prefer to remain anonymous)
4. We ask that you do not publicly disclose the vulnerability until we have released a fix

## Security Best Practices

When using SimpleQBN:

1. **Keep Dependencies Updated**
   - Regularly update to the latest version
   - Monitor for security advisories
   - Use `npm audit` to check for vulnerabilities

2. **Validate User Input**
   - If using user-provided expressions, validate and sanitize them
   - Be cautious with expressions that could expose sensitive data
   - Implement proper access controls for quality-based content

3. **Server-Side Validation**
   - Don't rely solely on client-side state management
   - Validate state changes server-side when applicable
   - Protect sensitive game logic from client manipulation

4. **Data Privacy**
   - Don't store sensitive information in state objects
   - Be mindful of what data is exposed through card content
   - Follow data protection regulations (GDPR, etc.)

## Known Security Considerations

### Expression Evaluation

SimpleQBN uses the [Quis](https://www.npmjs.com/package/quis) library for expression evaluation. While Quis is designed to be safe:

- It does not execute arbitrary JavaScript code
- It evaluates expressions in a controlled environment
- However, complex expressions may impact performance

### State Management

- State objects can grow large with many quality-based checks
- Monitor memory usage in long-running applications
- Clear unused state data when appropriate

## Security Updates

Security updates will be published:

- As GitHub Security Advisories
- In CHANGELOG.md with security fix notes
- In npm package release notes
- On the GitHub repository README

## Acknowledgments

We thank the security research community for helping keep SimpleQBN and its users safe.
