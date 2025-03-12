# Acme Commerce

Acme Commerce is a modern, fully-featured e-commerce web application built with the latest web technologies. It provides users with an intuitive shopping experience, offering product browsing, reviews, and a seamless auth process.

## Demo 🎥

Check out the live demo of Acme!

[Demo](https://acme-commerce-beta.vercel.app/)

Feel free to explore and interact with the store's features.

## Tech-stack ⚡

Acme Commerce is built with a modern stack to deliver a top-notch e-commerce experience:

- React & Next.js ⚛️: Dynamic, server-side rendered UIs.
- [Tailwind CSS](https://tailwindcss.com/) 🌈: Utility-first styling for fast development.
- [Storybook](https://storybook.js.org/) 📖: Develop and test UI components in isolation.
- [NextAuth.js](https://next-auth.js.org/) 🔒: Secure authentication and user management.
- [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/) 🧪: For reliable testing and bug-free code.
- TypeScript 💻: Type safety for smoother development.
- [HeroUI](https://www.heroui.com/) 🎨: A design system for consistent UI components.
- [Next-Intl](https://next-intl.dev/) 🌍: For internationalization and localization support.
- [React Hook Form](https://react-hook-form.com/) 📝: For easy and performant form handling.

## Prerequisites 🛠️

Make sure you have Node.js version **18.20.4** or higher installed to run the project. You can check your Node.js version by running:

```bash
node --version
```

Also, ensure that pnpm is installed. You can check this by running:

```bash
pnpm --version
```

If pnpm is not installed, you can install it globally by running:

```bash
npm install -g pnpm
```

## Getting Started ⚙️

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/anilkaraabali/acme-commerce.git
cd acme-commerce
```

Then, install the project dependencies:

```bash
pnpm install
```

### Start the development server 🚀

Now, you can start the development server:

```bash
pnpm dev
```

#### Permissions Issue (If Occurs After Running pnpm dev) ⚠️

If you encounter the following error during the development server startup:

```bash
sh: ./scripts/merge-products/run.sh: Permission denied
sh: ./scripts/merge-all-products/run.sh: Permission denied
```

You can resolve it by changing the permissions of the script to make it executable:

```bash
chmod +x ./scripts/merge-products/run.sh
chmod +x ./scripts/merge-all-products/run.sh
```

Then, re-run the development server:

```bash
pnpm dev
```

## Running Tests 🧪

This project uses Vitest for running unit tests.

To run the tests, use the following command:

```bash
pnpm test
```

This will run all the tests in the project and output the results in the terminal.

### Running Tests in Watch Mode 👀

If you want to run the tests continuously as you make changes, you can use the following command:

```bash
pnpm test:watch
```

This will watch for changes to your test files and automatically rerun the tests.

### Running Tests with Coverage 📊

To run the tests with coverage reports, use:

```bash
pnpm test:coverage
```

This will generate a code coverage report that shows how much of your code is covered by tests.

## TypeScript Validation 🛠️

To check for TypeScript errors in your project, you can run:

```bash
pnpm validate-types
```

This will use the TypeScript compiler to validate your types and show any errors or warnings related to type issues in your code.

## Storybook 📚

To start Storybook for viewing UI components, run the following command:

```bash
pnpm storybook
```

This will start Storybook, allowing you to interact with the components in isolation.
