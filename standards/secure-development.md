# Principles of Secure Development
A number of principles of secure development have been identified In order to achieve the goals Confidentiality, Integrity, and Availability. Many of these are based upon the ones maintained by OWASP.

The goals of a secure system are as follows:

## Confidentiality
Access to information is only granted to those with right to it.
## Integrity
Information must not be tampered with or altered by unauthorized users. Failing that, altered information should be detectable.
## Availability
Information and systems to access it must be available when needed.
In order to achieve these goals, developers are expected to adhere to the principles of secure development and other resources available to ensure that that their changes do not introduce additional defects.

## Simplicity

Given a choice between a simple solution and complex one, favor the simple solution. Ease of understanding helps to ensure that misunderstood edge cases will slip through and cause security issues.

## Minimized Attack Surface

In short, don't create more code than necessary. Candidates for a "minimal attack surface" review include:

- API Entry Points
- Network Sockets
- Files
- Functions, Classes and Class Methods
- System Components
- Secure Defaults

The system should be maximally secure in its default configuration. Any confidential information necessary for full operation should be provided out of band.

## Separation of Concerns

Unless there is a need to share, favor solutions that keep information modular and isolated. When the need to share arises, favor a documented interface over simply merging the codebases or sharing access to a data store.

## Least Privilege

Minimize the number of privileges necessary for a given system component. At the minimum, code should never run as a system administrative user. If administrative permissions are necessary, they should be delegated on a per-permission, as-needed basis only.

## Fail Securely

The system must fail securely. For instance, if an exception occurs to might corrupt the user session, it should be throw out entirely rather than attempting to continue processing.

## Defense in Depth

Instead of relying on a single control, systems should be secure at as many points as feasible. The more depth in the security architecture, the lower the chance of information compromise in the event of a failure or exploit.

## Obscurity is not Security

While an unknown algorithm or non-standard port number may make an attackers job difficult, it is not a secure solution. At best, obscurity should be one of several layers of defense in depth.

## Fix Correctness

Once a security defect has been identified, extra care should be given to the creation and review of the patch. The bug may manifest in more than one location, or there may be subtle side-effects to the fix.

## Other Resources
- [https://www.owasp.org/index.php/Secure_Coding_Principles](OWASP Secure Coding Principles)
- [https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project](OWASP Top 10 Vulnerabilities)
- [http://www.djangobook.com/en/2.0/chapter20/](Django Book - Security)
- [http://www.sans.org/top25-software-errors/](SANS / CWE Top 25 Software Errors)
- [http://www.safecode.org/publications/SAFECode_Dev_Practices1108.pdf](SafeCode Dev Practices)