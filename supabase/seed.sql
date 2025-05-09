INSERT INTO tags (name, color) VALUES
  ('Web', 'bg-blue-500'),
  ('Mobile', 'bg-green-500'),
  ('AI', 'bg-purple-500'),
  ('API', 'bg-yellow-500'),
  ('Game', 'bg-red-500'),
  ('Productivity', 'bg-pink-500'),
  ('Education', 'bg-indigo-500'),
  ('Social', 'bg-orange-500');

INSERT INTO tech_stacks (name) VALUES
  ('React'),
  ('Next.js'),
  ('Node.js'),
  ('Python'),
  ('TensorFlow'),
  ('Django'),
  ('Firebase'),
  ('MongoDB'),
  ('Express'),
  ('React Native'),
  ('Docker'),
  ('GitHub API'),
  ('Redux'),
  ('WebSockets'),
  ('Unity'),
  ('ARKit/ARCore'),
  ('TensorFlow Lite'),
  ('Swift/Kotlin'),
  ('Tailwind CSS'),
  ('Vercel'),
  ('MQTT'),
  ('TensorFlow.js'),
  ('Chart.js');

INSERT INTO ideas (title, short_description, full_description, difficulty, status, user_id)
VALUES
  ('Personal Portfolio Website', 'Showcase your skills and projects.', 'A website to showcase your skills, projects, and resume.', 'beginner', 'published', NULL),
  ('Blog Website', 'Write and share blog posts.', 'A platform to write and share blog posts with categories and comments.', 'beginner', 'published', NULL),
  ('To-Do List App', 'Manage daily tasks.', 'A simple app to manage daily tasks with add, edit, and delete functionality.', 'beginner', 'published', NULL),
  ('Weather App', 'Display current weather information.', 'An app to display current weather information using a weather API.', 'beginner', 'published', NULL),
  ('E-commerce Website', 'Online store with cart and checkout.', 'A basic online store with product listings, cart, and checkout functionality.', 'intermediate', 'published', NULL),
  ('Chat Application', 'Real-time chat app.', 'A real-time chat app using WebSocket or similar technologies.', 'intermediate', 'published', NULL),
  ('Quiz App', 'Interactive quiz with scoring.', 'An interactive quiz application with multiple-choice questions and scoring.', 'beginner', 'published', NULL),
  ('Expense Tracker', 'Track income and expenses.', 'An app to track income and expenses with visual charts.', 'intermediate', 'published', NULL),
  ('Social Media Dashboard', 'Monitor social media metrics.', 'A dashboard to monitor and analyze social media metrics.', 'advanced', 'published', NULL),
  ('Online Code Editor', 'Web-based code editor.', 'A web-based code editor with syntax highlighting and live preview.', 'advanced', 'published', NULL);