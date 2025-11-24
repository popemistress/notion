# Contributing to Notion Dashboard

Thank you for your interest in contributing to Notion Dashboard! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, browser)

### Suggesting Features

Feature suggestions are welcome! Please include:
- Clear use case
- Expected behavior
- Why it would be useful
- Mockups or examples (optional)

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write/update tests if applicable
5. Update documentation
6. Commit with clear messages (`git commit -m 'Add amazing feature'`)
7. Push to your branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Notion account with OAuth integration

### Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/notion-dashboard.git
cd notion-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

### Project Structure

```
notion-dashboard/
├── src/
│   ├── app/            # Next.js pages and API routes
│   ├── components/     # React components
│   ├── lib/           # Utility libraries and services
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── docs/             # Documentation
```

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Export types from `src/types/index.ts`

### React Components

- Use functional components with hooks
- Follow component naming: `ComponentName.tsx`
- Keep components small and focused
- Use proper prop typing

Example:
```typescript
interface MyComponentProps {
  title: string
  onClick?: () => void
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  return (
    <button onClick={onClick}>
      {title}
    </button>
  )
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow existing color scheme (Notion-inspired)
- Ensure responsive design (mobile-first)
- Use semantic HTML

### Code Organization

- One component per file
- Group related utilities
- Keep business logic in services (`lib/`)
- Use barrel exports for cleaner imports

### Git Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Build/config changes

Examples:
```
feat: add filtering by tags
fix: resolve OAuth redirect issue
docs: update API documentation
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run type-check

# Linting
npm run lint
```

### Writing Tests

- Write tests for new features
- Ensure existing tests pass
- Aim for meaningful coverage
- Test edge cases

## Documentation

### Updating Documentation

- Update README.md for user-facing changes
- Update API.md for API changes
- Add JSDoc comments for complex functions
- Include code examples where helpful

### Code Comments

- Comment complex logic
- Explain "why" not "what"
- Keep comments up to date
- Use TypeScript types to reduce need for comments

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests pass
- [ ] No console errors or warnings
- [ ] Tested in development environment

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test the changes

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed
- [ ] Documentation updated
- [ ] Tests pass
```

### Review Process

1. Automated checks must pass
2. Code review by maintainer
3. Address feedback
4. Final approval
5. Merge to main

## Areas for Contribution

### Good First Issues

Look for issues labeled `good-first-issue`:
- Documentation improvements
- UI enhancements
- Bug fixes
- Small feature additions

### Feature Ideas

- Advanced filtering and sorting
- Data visualization dashboards
- Export functionality
- Custom database templates
- Keyboard shortcuts
- Dark mode
- Offline support
- Mobile app

### Performance Improvements

- Optimize API calls
- Implement caching strategies
- Reduce bundle size
- Improve load times

## Architecture Decisions

### Why Next.js?

- Server-side rendering capabilities
- API routes for backend
- Built-in optimization
- Great developer experience

### Why NextAuth.js?

- Robust OAuth implementation
- Session management
- Security best practices
- Wide provider support

### Why Tailwind CSS?

- Utility-first approach
- Small bundle size
- Consistent design system
- Fast development

## Getting Help

- Open a discussion on GitHub
- Check existing issues and PRs
- Review documentation
- Ask questions in PR comments

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Recognized in README (for significant contributions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue for any questions about contributing!

---

Thank you for contributing to Notion Dashboard! 🎉
