# BookLeaf

BookLeaf is a web-based e-library application that allows users to manage and read their digital book collection.

## Project Structure

```
bookleaf/
├── docs/                    # Project documentation
├── pa/                     # Project assignment submissions
└── src/                    # Source code
    ├── Backend/           # Node.js/Express backend
    │   ├── src/          # TypeScript source files
    │   ├── package.json
    │   └── tsconfig.json
    └── Frontend/          # React/Vite frontend
        ├── public/       # Static assets
        ├── src/         # React components and pages
        │   ├── assets/  # Images and other assets
        │   ├── pages/   # Page components
        │   └── App.tsx  # Root component
        ├── package.jsonv
        └── vite.config.ts
```

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Git

## Getting Started

### Backend Setup

1. Navigate to the backend directory:

```bash
cd src/Backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The backend server will start at http://localhost:3000

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd src/Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend development server will start at http://localhost:5173

## Development Guide

### Adding New Pages

1. Create a new page component in `src/Frontend/src/pages/`:

```typescript
// src/Frontend/src/pages/NewPage.tsx
import React from "react";

const NewPage = () => {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  );
};

export default NewPage;
```

2. Add the route in `App.tsx`:

```typescript
import NewPage from "./pages/NewPage";

const router = createBrowserRouter([
  // ... existing routes
  {
    path: "/new-page",
    element: <NewPage />,
  },
]);
```

### Adding Backend API Endpoints

1. Create a new route handler in `src/Backend/src/server.ts`:

```typescript
// Add new endpoint
app.get("/api/new-endpoint", (req: Request, res: Response) => {
  res.json({ message: "New endpoint response" });
});

// Add POST endpoint with body
app.post("/api/data", (req: Request, res: Response) => {
  const data = req.body;
  // Process data
  res.json({ success: true, data });
});
```

### Connecting Frontend to Backend

1. Create an API service in the frontend:

```typescript
// src/Frontend/src/services/api.ts
const API_BASE_URL = "http://localhost:3000/api";

export const fetchData = async () => {
  const response = await fetch(`${API_BASE_URL}/endpoint`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const postData = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
```

2. Use the API service in your components:

```typescript
import { fetchData } from "../services/api";

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadData();
  }, []);

  return <div>{/* Render data */}</div>;
};
```

### Adding Styling

1. Global styles can be added to `src/Frontend/src/index.css`

2. Component-specific styles using Tailwind CSS:

```typescript
const StyledComponent = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Title</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Click Me
      </button>
    </div>
  );
};
```

## Building for Production

### Backend

```bash
cd src/Backend
npm run build
```

### Frontend

```bash
cd src/Frontend
npm run build
```

The built files will be in the `dist` directory of each project.

## Project Scripts

### Backend

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request
