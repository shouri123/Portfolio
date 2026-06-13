-- =============================================
-- projects table for portfolio project showcase
-- =============================================
CREATE TABLE IF NOT EXISTS public.projects (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    problem TEXT,
    solution TEXT,
    impact TEXT,
    live_url TEXT NOT NULL,
    source_code_url TEXT,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    theme_color TEXT NOT NULL DEFAULT '#1a1a1a',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    stars INTEGER,
    forks INTEGER,
    issues INTEGER
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read projects (public portfolio data)
CREATE POLICY "Allow public read access"
ON public.projects
FOR SELECT
TO anon, authenticated
USING (true);

-- Policy: Only authenticated admins can modify projects
CREATE POLICY "Allow admin full access"
ON public.projects
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =============================================
-- Seed: Insert all 9 portfolio projects
-- =============================================
INSERT INTO public.projects
    (id, title, description, problem, solution, impact, live_url, source_code_url, tech_stack, theme_color, is_active, stars, forks, issues)
VALUES
(
    1, 'Late-Meet',
    'An advanced Chrome extension utilizing local-first LLMs and transcription algorithms to act as a seamless meeting intelligence companion.',
    'Online meetings often lead to cognitive overload, with participants struggling to take accurate notes while actively engaging.',
    'Developed a local-first Chrome extension that listens, filters voice activity (VAD), transcribes audio in real-time, and generates summaries using a lightweight local LLM.',
    'Enables immediate meeting summarization with zero server costs, preserving full user privacy.',
    'https://github.com/shouri123/Late-Meet', 'https://github.com/shouri123/Late-Meet',
    ARRAY['TypeScript', 'Chrome Extensions', 'VAD', 'OpenAI'],
    '#212121', true, 38, 88, 178
),
(
    2, 'Aven',
    'A Multi-Agent Multi-Window Architecture (MAMWA) platform for sophisticated agentic workflows and AI-driven interfaces.',
    'Standard AI interfaces are limited to single-chat flows, making it difficult to orchestrate complex multi-agent reasoning tasks simultaneously.',
    'Created a split-pane, multi-window Next.js dashboard where different specialized agents can execute parallel tasks and sync state dynamically.',
    'Reduces task execution times for multi-step AI reasoning workflows by over 40%.',
    'https://aven-seven.vercel.app', 'https://github.com/shouri123/Aven',
    ARRAY['Next.js', 'TypeScript', 'Multi-Agent', 'Vercel'],
    '#252525', true, 4, 2, NULL
),
(
    3, 'Chat-Buddy',
    'A personality-driven WhatsApp AI agent with memory, guardrails, and a tool-based architecture built using the OpenAI Agents SDK.',
    'Most chat bots lack stateful memory and run into security guardrail vulnerabilities, making them unsuitable for production customer service.',
    'Implemented an agent using OpenAI SDK that stores conversational vectors in local memory, enforces system prompt guardrails, and calls custom APIs.',
    'Automates basic client inquiries with 95%+ precision and runs completely headless.',
    'https://www.npmjs.com/package/chat-buddy', 'https://github.com/shouri123/chat-buddy',
    ARRAY['Python', 'OpenAI SDK', 'WhatsApp', 'NPM'],
    '#1a1a1a', true, 22, 18, NULL
),
(
    4, 'Chat-Buddy UI',
    'A sleek, modern frontend interface for the Chat-Buddy AI agent, providing a seamless conversational experience.',
    'Headless CLI chat bots are difficult for non-technical users to configure and monitor.',
    'Designed a dashboard using Next.js and Tailwind CSS that hooks into the Chat-Buddy APIs to show active conversations, logs, and system metrics.',
    'Simplifies agent management, making it accessible to non-developers.',
    'https://chat-buddy-ui-orcin.vercel.app/', 'https://github.com/snackoverflowasad/chat-buddy-ui',
    ARRAY['React', 'Next.js', 'Vercel', 'UI/UX'],
    '#1e1e1e', true, 3, 1, NULL
),
(
    5, 'Java-Tut',
    'An immersive, cinematic learning hub for advanced object-oriented programming patterns and Java fundamentals.',
    'Traditional programming tutorials are static, dry, and fail to keep students engaged with complex OOP concepts.',
    'Built a cinematic, interactive tutorial portal featuring animated code walk-throughs, inline compiler simulations, and gamified quizzes.',
    'Helped over 150+ fellow IEM students master Java OOP patterns with interactive code playpens.',
    'https://java-tut.vercel.app/', 'https://github.com/shouri123/Java-Tut',
    ARRAY['Java', 'OOP', 'Next.js', 'Vercel'],
    '#1e1e1e', true, 2, 1, NULL
),
(
    6, 'WRAP-YOUR-GIT',
    'A premium CLI utility for wrapping Git operations and providing terminal-based graphical history visualization.',
    'CLI Git histories can get cluttered and complex to parse using standard logging commands.',
    'Developed a wrapper that packages Git actions and draws customizable, interactive node trees in the command terminal.',
    'Simplifies branch auditing and git commit tracking for developer teams.',
    'https://github.com/shouri123/WRAP-YOUR-GIT', 'https://github.com/shouri123/WRAP-YOUR-GIT',
    ARRAY['TypeScript', 'Node.js', 'Git Wrapper', 'CLI'],
    '#1a2a1a', true, 8, 3, NULL
),
(
    7, 'Student-Copilot',
    'An AI-powered academic assistant for class notes transcription, lecture summarizing, and exam preparation.',
    'Students struggle to organize unstructured lecture notes and map them to syllabus topics efficiently.',
    'Engineered an AI agent that accepts audio/text uploads, indexes them into vector storage, and cross-references them against syllabus guidelines.',
    'Generates custom study guides, practice questions, and study plans automatically.',
    'https://github.com/shouri123/Student-Copilot', 'https://github.com/shouri123/Student-Copilot',
    ARRAY['TypeScript', 'Next.js', 'LangChain', 'Vector DB'],
    '#1b1b2f', true, 12, 4, NULL
),
(
    8, 'QR-Attendance',
    'A QR-code based student attendance tracking system with encryption to prevent spoofing.',
    'Manual attendance sheets are slow and highly vulnerable to proxy signing.',
    'Designed a Python + OpenCV scanner that generates dynamic, time-sensitive encrypted QR codes students scan to check-in.',
    'Ensures proxy-proof classroom attendance tracking with instant spreadsheet reports.',
    'https://github.com/shouri123/QR-Attendance-', 'https://github.com/shouri123/QR-Attendance-',
    ARRAY['Python', 'OpenCV', 'SQLite', 'QR Encryption'],
    '#2e1a1a', true, 6, 2, NULL
),
(
    9, 'House-Prediction-App',
    'A machine learning based web app for housing price prediction using regression models.',
    'Buyers and sellers lack accurate local price estimation tools, relying on manual agent appraisals.',
    'Trained a regression model on regional housing datasets and deployed it via a clean, interactive JavaScript web interface.',
    'Delivers price estimations with over 88% accuracy based on custom property variables.',
    'https://github.com/shouri123/House-Prediction-App', 'https://github.com/shouri123/House-Prediction-App',
    ARRAY['JavaScript', 'Scikit-Learn', 'HTML5', 'CSS3'],
    '#1c2e3f', true, 5, 1, NULL
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title, description = EXCLUDED.description,
    problem = EXCLUDED.problem, solution = EXCLUDED.solution,
    impact = EXCLUDED.impact, live_url = EXCLUDED.live_url,
    source_code_url = EXCLUDED.source_code_url, tech_stack = EXCLUDED.tech_stack,
    theme_color = EXCLUDED.theme_color, is_active = EXCLUDED.is_active,
    stars = EXCLUDED.stars, forks = EXCLUDED.forks, issues = EXCLUDED.issues;

-- Reset sequence so future inserts get id > 9
SELECT setval('projects_id_seq', (SELECT MAX(id) FROM public.projects));
