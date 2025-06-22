# MyStore: A Scalable Frontend Architecture for Modern E-commerce

This repository contains the source code for MyStore, a feature-rich, fully responsive, and internationalized e-commerce Single-Page Application. While developed as a frontend technical assessment, the project was architected as a proof-of-concept for a scalable and maintainable e-commerce platform, emphasizing modern development patterns and a superior user experience.

---

## 🚀 Live Demo & Built With

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

**[➡️ View the live application here](https://online-store-pond.vercel.app)**

---

## 🏛️ Architectural Philosophy & Design Patterns

The core architecture was designed with scalability, maintainability, and separation of concerns as first-class citizens. Key decisions were made to ensure the application is robust, easy to debug, and prepared for future feature expansion.

### 1. State Management Strategy

A hybrid approach to state management was deliberately chosen over a single global library to select the right tool for each specific domain of state.

* **Complex Shared State (Cart, Wishlist): The Context API + `useReducer` pattern was implemented.**
    * **Why `useReducer`?** For state logic with multiple, well-defined actions (ADD, REMOVE, UPDATE), `useReducer` provides a centralized and predictable state transition model. It decouples the "what" (dispatching an action) from the "how" (the logic inside the reducer), making the cart's behavior easier to test and debug. It also helps prevent prop-drilling for actions.
    * **Persistence:** The cart state is synchronized with `localStorage` via a `useEffect` hook within the `CartProvider`, ensuring a seamless user experience across sessions.
* **Simple Global State (Filters, Modals): The Context API + `useState` pattern was used.**
    * **Why `useState`?** For simpler, less-interrelated global state like UI filters or modal visibility, `useState` provides a more direct and less boilerplate-heavy solution. This avoids over-engineering and keeps the state logic colocated with its provider.

### 2. Decoupled Logic with Custom Hooks

To adhere to the principle of Separation of Concerns, business logic and data fetching are encapsulated within custom hooks, keeping UI components clean and focused on rendering.

* `useProducts()`: This hook is the single source of truth for product data. It encapsulates the logic for fetching, merging multi-language data, and managing loading/error states. Components simply call this hook to get the processed data they need, without worrying about the underlying implementation.
* `useFilters()`, `useCart()`, etc.: These custom hooks act as clean, readable selectors for their respective contexts, abstracting the `useContext` boilerplate and providing a clear public API for each feature domain.

### 3. Internationalization (i18n) Architecture

The application is fully internationalized to support both English and Thai.

* **Technology:** Implemented using `i18next` with `react-i18next`, `i18next-http-backend` for loading translation files asynchronously, and `i18next-browser-languagedetector` for an intuitive initial language setting.
* **Data Structure:** A strategic decision was made to separate static UI text from dynamic product data.
    * UI text is managed in `translation.json` files (`/public/locales`).
    * Product data is managed in language-specific JSON files (`products_en.json`, `products_th.json`). The `useProducts` hook intelligently merges the base data (from `en`) with the translated text, ensuring data integrity and efficiency.

## ✨ Core Features & Implementation Highlights

* **Dynamic Product Filtering & Sorting:** A real-time, client-side filtering system powered by the `FilterContext`. The `processedProducts` array is derived state, recalculated on-the-fly whenever filter criteria change, ensuring a fast and responsive UI.
* **Component-Driven UI with Tailwind CSS:** A utility-first approach was used for rapid, consistent, and maintainable styling without leaving the component file.
* **Interactive UI:** Fluid and meaningful animations are implemented using `Framer Motion` for the Hero Slider and CSS transitions for micro-interactions, enhancing the user experience.
* **Robust Checkout Flow:** A multi-step checkout process featuring a validated shipping form (`react-hook-form`), order summary, and a functional QR Code payment modal (`promptpay-qr`, `qrcode.react`).
* **Advanced Modals:** The Quick View and QR Code modals are managed through dedicated context, demonstrating a pattern for handling complex, app-wide UI states.

## 🛠️ Tech Stack

A curated selection of modern, industry-standard technologies was chosen for this project.

* **Core:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS, PostCSS
* **State Management:** React Context API (`useState`, `useReducer`)
* **Routing & Forms:** React Router DOM v6, React Hook Form
* **Animation:** Framer Motion
* **Internationalization:** i18next, react-i18next
* **Utilities:** sonner (notifications), react-icons, qrcode.react, promptpay-qr

## 📂 Project Structure

The project follows a scalable and organized structure, making it easy to understand and maintain.

```bash
/src
|-- /components     # Reusable components, organized by type (common, layout, product)
|-- /context        # Centralized state management logic (Cart, Wishlist, Filter, QuickView)
|-- /hooks          # Custom hooks for abstracting logic (e.g., useProducts)
|-- /pages          # Page components for each route
|-- /types          # TypeScript interfaces and types
|-- App.tsx         # Main application routing hub
|-- main.tsx        # The entry point of the application, where all providers are wrapped
|-- i18n.ts         # Configuration file for the internationalization system
```

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
    ```
    *(Remember to replace `https://github.com/your-username/your-repository-name.git` with your actual repository URL, e.g., `https://github.com/Thanabodee-Pond/online-store-vite-react.git`)*
2.  **Navigate to the project directory:**
    ```bash
    cd your-repository-name
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  Open your browser and navigate to `http://localhost:5173`

## 🔮 Future Improvements & Scalability

This architecture provides a solid foundation for future development. Potential next steps include:

* **Backend Integration:** Replace the mock JSON data fetching in `useProducts` with calls to a real backend API (e.g., REST or GraphQL). The component-level implementation would remain unchanged due to the abstraction provided by the hook.
* **Authentication:** Implement a full authentication flow (Login, Register, JWT handling) and protect routes like "My Account".
* **Testing:** Introduce a testing suite with Vitest/Jest and React Testing Library to write unit and integration tests for components, hooks, and context reducers.
* **Performance Optimization:** Implement code-splitting at the route level using `React.lazy` and `<Suspense>` to improve initial load times as the application grows.
