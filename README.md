# Career Advisor - AI-Powered Career Roadmap Generator

![Career Roadmap Generator](https://img.shields.io/badge/Status-Prototype-orange)
![Next.js](https://img.shields.io/badge/Next.js-Framework-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-blueviolet)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI_Integration-brightgreen)

A web application that helps users define their desired career paths and provides AI-generated learning roadmaps, beautifully visualized with ReactFlow. Built with Next.js, Tailwind CSS, and integrated with OpenRouter API for dynamic roadmap generation. The application generates detailed, interactive career roadmaps with hierarchical skill structures, color-coded by importance levels, allowing users to explore the skills, technologies, and knowledge areas required for their target roles.

> **⚠️ Note:** This is a prototype project currently in development. It was developed with assistance from [Cursor](https://cursor.com/). The application does not include usage/error logging or rate limiting features at this stage. As this is an early version, some features may be incomplete or subject to change.

---

## ✨ Features

- 🧠 AI-powered career roadmap generation for any job title
- 🔄 Interactive visualization of career paths
- 📊 Hierarchical display of skills and technologies needed
- 🎨 Color-coded nodes based on importance (primary, secondary, tertiary)
- 📱 Responsive design for all devices

---

## 🛠️ Technology Stack

| Category | Technology | Description |
|----------|------------|-------------|
| **Frontend** | [Next.js](https://nextjs.org/) | React framework |
| **Styling** | TailwindCSS | Utility-first CSS framework for rapid UI development |
| **AI Integration** | OpenRouter API | Powers the roadmap generation engine |
| **Visualization** | [ReactFlow](https://reactflow.dev/) | Interactive career path diagrams |
| **Validation** | [Zod](https://zod.dev/) | Robust schema validation and type safety |

---

## 🚦 Getting Started

### Prerequisites
- Node.js (22.14.0, earlier versions were not included in the testing)
- npm or yarn

### Installation

First, clone the repository and install dependencies:

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

Create your environment configuration by copying the example file:

```bash
cp .env.example .env.local
```

Update the environment variables in the `.env.local` file.

```bash
OPENROUTER_API_KEY=<your-openrouter-api-key>
OPENROUTER_MODEL=<your-openrouter-model>
```

Run the development server:

```bash
npm run dev
```

Navigate to `http://localhost:3000` to view the application.

---

## 📋 Usage

1. Open the application in your browser
2. Enter a job title in the input field
3. Click "Generate Roadmap"
4. View your interactive career path in the visualization panel
5. Explore the different skills and technologies required

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

For any questions or suggestions, please open an issue in this repository.

---

> **⚠️ Warning:** This application is developed as a prototype, and the responsibility of using it in a production environment lies entirely with the user. Security, optimization, and performance improvements are still in progress. It is recommended to perform necessary security and performance tests before using it in a production environment.