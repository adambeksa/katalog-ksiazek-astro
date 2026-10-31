# Domain Modules

## Overview

This directory contains domain-driven modules organized by business domains. Each module represents a distinct business domain and is further divided into feature-based libraries (libs).

## Architecture Philosophy

### Modular Structure

- **Domain Modules**: Top-level organization by business domain (e.g., `product`, `user`, `order`)
- **Feature Libs**: Each module contains focused libraries for specific features
- **Layered Architecture**: Each lib follows a three-layer pattern

### Three-Layer Architecture

Each lib is organized into three layers:

```
lib-name/
├── application/     # Use cases and application services
├── domain/          # Business logic and domain models
├── infrastructure/  # External integrations and adapters
└── index.js        # Public API exports
```

#### Application Layer

- Orchestrates business workflows
- Implements use cases
- Coordinates between domain and infrastructure
- **Dependencies**: Can use domain layer

#### Domain Layer

- Contains core business logic
- Defines entities, value objects, and domain events
- Enforces business rules
- **Dependencies**: Should be independent (no dependencies on other layers)

#### Infrastructure Layer

- Handles external concerns (APIs, databases, etc.)
- Implements domain interfaces
- Provides technical implementations
- **Dependencies**: Can use domain layer interfaces

## Current Modules

### Product

Product-related functionality including product display, listing, and management.

**Libs:**

- `product-card`: Individual product display and interaction
- `product-listing`: Product collection views and navigation

See [Product Module README](./product/README.md) for details.

## Adding New Modules

When creating a new domain module:

1. Create a directory under `/src/modules/[domain-name]`
2. Identify feature-based libs within the domain
3. For each lib, create the three-layer structure:
   ```bash
   mkdir -p [lib-name]/{application,domain,infrastructure}
   ```
4. Add index.js files for clean exports
5. Document the module's purpose and structure in a README.md

## Best Practices

1. **Single Responsibility**: Each lib should focus on one feature or use case
2. **Layer Boundaries**: Respect the dependency rules between layers
3. **Encapsulation**: Use index.js to expose only public APIs
4. **Domain Independence**: Keep domain layer free from external dependencies
5. **Shared Code**: For cross-module shared code, consider a `shared` or `common` module
6. **Testing**: Test each layer independently with appropriate test strategies

## Import Patterns

```javascript
// Import from specific lib
import { SomeFeature } from "@/modules/domain-name/lib-name";

// Import from domain module (if exported)
import { SomeFeature } from "@/modules/domain-name";

// Import from specific layer (if needed for testing)
import { SomeEntity } from "@/modules/domain-name/lib-name/domain";
```

## Migration Strategy

When migrating existing code to this structure:

1. Start with one domain at a time
2. Identify natural feature boundaries
3. Extract code into appropriate layers
4. Update imports gradually
5. Maintain backward compatibility during transition
