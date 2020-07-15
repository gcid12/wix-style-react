# How to create a PR for wix-style-react

wix-style-react is an open source ui library, therefore everyone is invited to contribute by solving bugs, improving documentation, and add new components (as long as they are aligned with our design guidelines).

### Prerequisites

1. Code must be compatible with required React and Stylable versions mentioned in [Readme.md](../../README.md).
2. Your commits must be signed (relevant only if you're a part of wix organization)

### Sign commits
##### Motivation:
Due to security reasons we decided to enforce signed commits.
This way we can prevent attackers to use spoofed addresses.

##### How to sign commits:
1. Generate a PGP key - read more [here](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-gpg-key).
  Make sure you create the key with the email you use to sign-in to your Github account, which should be the same email you get when running this: `git config --global user.email` (If your email isn't configured, you can add it by running `git config --global user.email "email@example.com"`)
2. Set your Public key on you GitHub account - https://github.com/settings/keys
3. Use this command to `commit - git commit -S -am "…"` to sign your commit, or `git config --global commit.gpgsign true` for automatic sign.
4. You can verify your commit is signed - `git log --show-signature`

More information on [signing commits](https://docs.github.com/en/github/authenticating-to-github/signing-commits)

##### FAQ:

Q: I'm getting the following error:
```bash
error: gpg failed to sign the data
fatal: failed to write commit object
```
A: Tell your local git client about your newly generated PGP key [instructions here](https://docs.github.com/en/github/authenticating-to-github/telling-git-about-your-signing-key).

Q: I'm not a wix employee, can I contribute to wix-style-react without signing my commits?

A: Sure! after you commit, a maintainer will check your code and verify it for you.
