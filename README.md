# TypeScript Inventory Management System

This project is a simple inventory management system built using TypeScript and Express. It allows users to manage a collection of products, including adding new products, updating their quantity, retrieving a list of all products, getting the total price of all products in stock, and finding a specific product by name. The data is currently stored in memory using an array.

## Project Structure

```plaintext
.
├── node_modules
├── package.json
├── tsconfig.json
├── README.md
├── .gitignore
├── .git
└── src
    ├── app.ts
    ├── controllers
    │   ├── IWarehouseController.ts
    │   └── WarehouseController.ts
    ├── models
    │   └── Product.ts
    ├── payloads
    │   ├── AddProductPayload.ts
    │   ├── FindProductPayload.ts
    │   └── UpdateProductPayload.ts
    ├── repositories
    │   ├── IProductRepository.ts
    │   └── ProductRepository.ts
    ├── routes
    │   └── routing.ts
    └── services
        └── WarehouseService.ts
```

## Running the Server

To start the development server, run the following command in the project root:

```bash
npm run dev
```

This will start the server on port 3000 (as defined in src/app.ts).

## Running Unit Tests

To execute the unit tests, run the following command in the project root:

`npm test`

This command will use Jest to find and run all the test files located in the src/tests directory.

## GRASP and SOLID Principles

This project is designed with adherence to the GRASP (General Responsibility Assignment Software Patterns) and SOLID principles in mind, aiming for a maintainable, extensible, and understandable codebase.

### GRASP Principles

* **Information Expert:** Responsibilities are assigned to the class that has the necessary information. For example, `ProductRepository` is responsible for managing the collection of `Product` objects, and `WarehouseService` contains the business logic for operations on these products.
* **Creator:** The `WarehouseService` is responsible for creating `Product` objects when a new product is added to the inventory.
* **High Cohesion:** Classes have focused responsibilities. Each class performs a set of closely related tasks. For instance, the `WarehouseController` focuses on handling HTTP requests and delegating to the `WarehouseService`.
* **Low Coupling:** Dependencies between classes are minimized. The `WarehouseService` depends on the `IProductRepository` interface, allowing for different implementations of data storage without affecting the service logic. The `WarehouseController` depends on the `WarehouseService` to perform business operations.
* **Controller:** The `WarehouseController` acts as a controller, receiving HTTP requests from the routing layer and delegating the business logic to the `WarehouseService`.
* **Pure Fabrication:** The `IProductRepository` interface is an example of pure fabrication. It doesn't represent a domain entity but is introduced to reduce coupling between the `WarehouseService` and the concrete data storage implementation (`ProductRepository`). The `WarehouseController` can also be seen as a pure fabrication, mediating between the routes and the `WarehouseService`.
* **Protected Variations:** The use of the `IProductRepository` interface protects the `WarehouseService` from variations in the data storage mechanism. If the way products are stored needs to change, only a new implementation of `IProductRepository` is required, leaving the `WarehouseService` unaffected.
* **Polymorphism:** While the current implementation uses only one concrete `ProductRepository`, the design with the `IProductRepository` interface allows for polymorphism. If different types of product storage were needed (e.g., in-memory, database, file), each could implement `IProductRepository`, and the `WarehouseService` could work with any of them through the interface.


### SOLID Principles

* **Single Responsibility Principle (SRP):** Each class has one specific responsibility:
    * `Product`: Represents the data of a product.
    * `ProductRepository`: Handles the storage and retrieval of products.
    * `WarehouseService`: Implements the business rules for managing the inventory.
    * `WarehouseController`: Handles the presentation layer logic for interacting with the inventory.
* **Open/Closed Principle (OCP):** The design allows for extending the functionality of the system without modifying the existing code. For example, you could potentially add a new type of repository (e.g., for persistent storage) by implementing the `IProductRepository` interface, without needing to change the `WarehouseService`.
* **Liskov Substitution Principle (LSP):** While not explicitly demonstrated with inheritance in the core logic, the use of interfaces like `IProductRepository` ensures that any concrete implementation of the repository can be substituted without breaking the `WarehouseService`.
* **Interface Segregation Principle (ISP):** The interfaces (`IWarehouseController`, `IProductRepository`) ensure that classes only need to implement the methods they actually use.
* **Dependency Inversion Principle (DIP):** The `WarehouseService` depends on the abstraction `IProductRepository`, rather than a concrete implementation. This decouples the service from the specific data storage mechanism. The `WarehouseController` depends on the `WarehouseService` to handle business logic.

By adhering to these principles, the project aims to be well-structured, easy to maintain, testable, and adaptable to future requirements.


## Services and Repositories

This project employs a layered architecture, specifically utilizing Service and Repository layers. This design pattern offers several benefits:

* **Separation of Concerns:** The Service layer (`WarehouseService`) is responsible for the application's business logic, while the Repository layer (`ProductRepository` and `IProductRepository`) handles data access. This separation ensures that changes to the business rules do not necessarily impact the data access implementation, and vice versa.
* **Testability:** By separating these concerns, it becomes easier to test different parts of the application in isolation. For example, the `WarehouseService` can be tested by mocking the `IProductRepository` interface, without needing to interact with an actual data source. Similarly, the data access logic in `ProductRepository` can be tested independently.
* **Maintainability:** This structure improves the maintainability of the codebase. If you need to change how data is stored (e.g., switch from an in-memory array to a database), you would primarily modify the `ProductRepository` implementation. The `WarehouseService`, which depends on the `IProductRepository` interface, would largely remain unchanged.
* **Flexibility:** The use of an interface (`IProductRepository`) for the Repository layer provides flexibility. You can easily switch between different data storage mechanisms by creating new classes that implement the `IProductRepository` interface. This adheres to the Dependency Inversion Principle (DIP) from SOLID.

In this project:

* The `WarehouseService` contains the core logic for managing products, such as adding, updating, retrieving, and calculating the total price. It depends on the `IProductRepository` interface to interact with the product data.
* The `ProductRepository` is the current implementation of `IProductRepository`, responsible for managing the `Product` objects in an in-memory array.

This separation allows for a more organized, testable, and maintainable codebase.