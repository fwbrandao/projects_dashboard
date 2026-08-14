// ============================================================
// Content model (ADR-002). Adding a project = add one entry here
// + drop a thumbnail in src/assets. One template renders it.
// Fabricated metrics from the old site were removed; only honest,
// verifiable metadata is kept.
// ============================================================

import selfDriving from '../assets/self-driving-cars.jpg'
import resNets from '../assets/resNets.png'
import tensorflow from '../assets/tensorflow.png'
import accuracy from '../assets/accuracy.jpg'
import faceEmotion from '../assets/face-emotion-detection.png'
import textSummary from '../assets/text-Summarization.jpg'
import label from '../assets/label.jpg'
import fakeNews from '../assets/fake_print_head.jpg'
import covid from '../assets/covid.png'
import ticTacToe from '../assets/tic-tac-toe.png'
import citySearch from '../assets/citySearch.png'
import drum from '../assets/drum.png'
import clock from '../assets/clock.png'
import ragFaceOff from '../assets/rag-grokipedia-vs-wikipedia.png'

export type CategoryId =
  | 'cnn'
  | 'nlp'
  | 'data'
  | 'games'
  | 'mini-js'
  | 'react'

/** Top-level home grouping: AI/ML first, everything else below. */
export type ProjectSection = 'ai' | 'other'

export interface Category {
  id: CategoryId
  title: string
  short: string
  blurb: string
  icon: string
  section: ProjectSection
}

export interface Project {
  id: string
  title: string
  subtitle: string
  summary: string
  /** Longer overview shown on the detail page. */
  overview: string
  category: CategoryId
  tags: string[]
  thumbnail: string
  year: number
  stack: string[]
  /** External source link (GitHub etc.). */
  repo?: string
  /** External live demo (Streamlit, etc.). */
  liveUrl?: string
  /** Highlights for the detail page (what was actually built/learned). */
  highlights: string[]
}

export const categories: Category[] = [
  { id: 'cnn', title: 'Computer Vision', short: 'Vision', blurb: 'Convolutional networks for detection, recognition, and classification.', icon: 'visibility', section: 'ai' },
  { id: 'nlp', title: 'Natural Language', short: 'NLP', blurb: 'Models for understanding, classifying, and generating text.', icon: 'translate', section: 'ai' },
  { id: 'data', title: 'Data & Prediction', short: 'Data', blurb: 'Exploratory analysis, visualization, and predictive modeling.', icon: 'analytics', section: 'ai' },
  { id: 'games', title: 'Games', short: 'Games', blurb: 'Interactive projects exercising state and real-time logic.', icon: 'sports_esports', section: 'other' },
  { id: 'mini-js', title: 'Mini JS', short: 'JS', blurb: 'Small vanilla-JavaScript builds — DOM, events, and the Web APIs.', icon: 'code', section: 'other' },
  { id: 'react', title: 'Web & React', short: 'Web', blurb: 'Front-end engineering and modular web architecture.', icon: 'web', section: 'other' },
]

const categorySection = Object.fromEntries(
  categories.map((c) => [c.id, c.section]),
) as Record<CategoryId, ProjectSection>

export const getCategorySection = (id: CategoryId): ProjectSection =>
  categorySection[id]

export const projects: Project[] = [
  {
    id: 'rag-grokipedia-vs-wikipedia',
    title: 'RAG Face-Off: Grokipedia vs Wikipedia',
    subtitle: 'Dual-corpus retrieval',
    summary:
      'Two RAG pipelines, one generator. The same model answers the same question from Grokipedia and Wikipedia side by side.',
    overview:
      'A fair A/B of retrieval-augmented generation: identical Groq model, prompt, temperature, and top-k on both sides. The only variable is the knowledge base. Articles are ingested from Grokipedia and Wikipedia, chunked under MiniLM’s 256-token limit, embedded locally, and stored in two Chroma collections. Divergence is a signal about coverage and framing — not a verdict on which encyclopedia is true.',
    category: 'nlp',
    tags: ['RAG', 'embeddings', 'retrieval', 'Grokipedia', 'Wikipedia'],
    thumbnail: ragFaceOff,
    year: 2026,
    stack: ['Python', 'Groq', 'ChromaDB', 'Streamlit', 'Jupyter'],
    repo: 'https://github.com/fwbrandao/RAG-grokipedia-vs-wikipedia',
    liveUrl: 'https://rag-grokipedia-vs-wikipedia-ejglykwi6qnbvunielbn3e.streamlit.app',
    highlights: [
      'Same model, prompt, and top-k; only the corpus changes.',
      'Free stack: Groq llama-3.3-70b plus local MiniLM embeddings.',
      'Paragraph-aware 220-token chunks so MiniLM does not silently truncate.',
      'Cached ingest with Wikipedia 429 backoff and a COVID title override.',
    ],
  },
  {
    id: 'autonomous-driving',
    title: 'Autonomous Driving — Car Detection',
    subtitle: 'YOLO object detection',
    summary: 'Real-time car detection for self-driving scenarios using the YOLO architecture.',
    overview:
      'An implementation of the YOLO (You Only Look Once) object-detection pipeline applied to driving footage. The model frames detection as a single regression problem, predicting bounding boxes and class probabilities in one pass, with non-max suppression to clean up overlapping boxes.',
    category: 'cnn',
    tags: ['object detection', 'YOLO', 'real-time'],
    thumbnail: selfDriving,
    year: 2021,
    stack: ['Python', 'TensorFlow / Keras', 'NumPy'],
    repo: 'https://github.com/fwbrandao/Deep_Learning/blob/master/Convolutional_Neural_Networks/Week_3/Autonomous_driving_application_Car_detection.ipynb',
    highlights: [
      'Single-pass detection with anchor boxes and a grid output tensor.',
      'Score-thresholding and non-max suppression to filter predictions.',
      'Applied a pre-trained YOLO model to road-scene images.',
    ],
  },
  {
    id: 'residual-networks',
    title: 'Residual Networks (ResNet)',
    subtitle: 'Deep nets with skip connections',
    summary: 'Building ResNets from scratch to train very deep networks without degradation.',
    overview:
      'A from-scratch ResNet built around identity and convolutional residual blocks. Skip connections let gradients flow through dozens of layers, sidestepping the vanishing-gradient problem that limits plain deep stacks.',
    category: 'cnn',
    tags: ['ResNet', 'architecture', 'image classification'],
    thumbnail: resNets,
    year: 2021,
    stack: ['Python', 'TensorFlow / Keras'],
    highlights: [
      'Implemented identity and convolutional residual blocks.',
      'Stacked blocks into a deep classifier with batch normalization.',
      'Demonstrated why skip connections enable depth.',
    ],
  },
  {
    id: 'convnet-tensorflow',
    title: 'ConvNet with TensorFlow',
    subtitle: 'CNN fundamentals',
    summary: 'A convolutional network for image classification, built directly in TensorFlow.',
    overview:
      'A convolutional classifier implemented with the TensorFlow low-level API — convolution, pooling, and dense layers wired together and trained end-to-end on an image dataset.',
    category: 'cnn',
    tags: ['CNN', 'TensorFlow', 'classification'],
    thumbnail: tensorflow,
    year: 2020,
    stack: ['Python', 'TensorFlow'],
    highlights: [
      'Conv → ReLU → pool blocks feeding a fully connected head.',
      'Manual forward pass and loss/optimizer setup.',
    ],
  },
  {
    id: 'keras-introduction',
    title: 'Keras Introduction',
    subtitle: 'Neural network foundations',
    summary: 'Foundational classification and regression models using the Keras API.',
    overview:
      'A primer project covering the Keras workflow: defining a model, compiling with a loss and optimizer, fitting, and evaluating. A clean baseline before moving to more complex architectures.',
    category: 'cnn',
    tags: ['Keras', 'fundamentals'],
    thumbnail: accuracy,
    year: 2020,
    stack: ['Python', 'Keras'],
    highlights: ['Sequential and functional model definitions.', 'Train / evaluate loop with metric tracking.'],
  },
  {
    id: 'face-recognition',
    title: 'Face Recognition',
    subtitle: 'Encoding & verification',
    summary: 'Face verification and recognition using embeddings and triplet loss.',
    overview:
      'A face-recognition system that maps faces to a 128-dimensional embedding and compares distances for verification (is this the claimed person?) and recognition (who is this?). Trained with a triplet loss that pulls matching faces together and pushes mismatches apart.',
    category: 'cnn',
    tags: ['embeddings', 'triplet loss', 'biometrics'],
    thumbnail: faceEmotion,
    year: 2021,
    stack: ['Python', 'TensorFlow / Keras'],
    highlights: [
      'Encoded faces into a fixed-length embedding vector.',
      'Triplet loss for discriminative embeddings.',
      'Distance-threshold verification and nearest-neighbor recognition.',
    ],
  },
  {
    id: 'abstractive-summarisation',
    title: 'Abstractive Summarisation',
    subtitle: 'Sequence-to-sequence generation',
    summary: 'A seq2seq model with attention that generates summaries rather than extracting them.',
    overview:
      'An encoder–decoder model with an attention mechanism that produces novel summary sentences instead of copying spans from the source. Attention lets the decoder focus on the relevant parts of the input at each generation step.',
    category: 'nlp',
    tags: ['seq2seq', 'attention', 'generation'],
    thumbnail: textSummary,
    year: 2021,
    stack: ['Python', 'TensorFlow / Keras'],
    highlights: ['Encoder–decoder with attention.', 'Teacher forcing during training.', 'Generates abstractive (not extractive) summaries.'],
  },
  {
    id: 'document-analysis-nlp',
    title: 'Document Analysis',
    subtitle: 'NLP pipeline',
    summary: 'An end-to-end pipeline for document understanding and entity extraction.',
    overview:
      'A pipeline that ingests documents, cleans and tokenizes text, and extracts structure — entities and key fields — to turn unstructured documents into queryable data.',
    category: 'nlp',
    tags: ['NER', 'pipeline', 'text processing'],
    thumbnail: label,
    year: 2021,
    stack: ['Python', 'spaCy / NLTK'],
    highlights: ['Tokenization and normalization.', 'Named-entity extraction.', 'Structured output from raw documents.'],
  },
  {
    id: 'fake-news-detector',
    title: 'Fake News Detector',
    subtitle: 'Text classification',
    summary: 'A classifier that flags potentially fabricated news articles.',
    overview:
      'A supervised text classifier trained on a labeled news corpus. Text is vectorized and fed to a model that predicts a real/fake label — a practical look at the full classification workflow on messy real-world text.',
    category: 'nlp',
    tags: ['classification', 'TF-IDF', 'supervised'],
    thumbnail: fakeNews,
    year: 2021,
    stack: ['Python', 'scikit-learn', 'pandas'],
    highlights: ['Text vectorization (TF-IDF).', 'Trained and evaluated a classifier.', 'Worked from a real labeled dataset.'],
  },
  {
    id: 'covid',
    title: 'Covid-19 Data Exploration',
    subtitle: 'Analysis & visualization',
    summary: 'Exploratory analysis and visualization of global Covid-19 datasets.',
    overview:
      'A data-exploration project on global Covid-19 time series — cleaning, aggregating, and visualizing case and trend data to surface patterns across regions and time.',
    category: 'data',
    tags: ['EDA', 'visualization', 'time series'],
    thumbnail: covid,
    year: 2020,
    stack: ['Python', 'pandas', 'Matplotlib'],
    highlights: ['Cleaned and merged multi-source time series.', 'Trend and comparative visualizations.'],
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    subtitle: 'Interactive game',
    summary: 'The classic game with win-detection and move history.',
    overview:
      'A React implementation of Tic Tac Toe with full game-state management, win detection, and the ability to step back through move history.',
    category: 'games',
    tags: ['React', 'state', 'game logic'],
    thumbnail: ticTacToe,
    year: 2022,
    stack: ['React', 'TypeScript'],
    highlights: ['Immutable board state and history.', 'Win-condition detection.', 'Time-travel between moves.'],
  },
  {
    id: 'js30-city-search',
    title: 'City Search',
    subtitle: 'Live filtering',
    summary: 'Type-ahead city search with regex matching and highlighting.',
    overview:
      'A vanilla-JS type-ahead that filters a city dataset in real time as you type, using regular expressions to match and highlight the matched substring.',
    category: 'mini-js',
    tags: ['DOM', 'regex', 'fetch'],
    thumbnail: citySearch,
    year: 2020,
    stack: ['JavaScript', 'HTML', 'CSS'],
    highlights: ['Debounced live filtering.', 'Regex match highlighting.'],
  },
  {
    id: 'js30-drum-kit',
    title: 'Drum Kit',
    subtitle: 'Web Audio + events',
    summary: 'A keyboard-driven drum machine using the Web Audio API.',
    overview:
      'An interactive drum kit that maps keyboard events to audio samples and animates the corresponding pads, built with the Web Audio API and event listeners.',
    category: 'mini-js',
    tags: ['Web Audio', 'events', 'DOM'],
    thumbnail: drum,
    year: 2020,
    stack: ['JavaScript', 'Web Audio API'],
    highlights: ['Keydown-to-sample mapping.', 'Visual feedback on play.'],
  },
  {
    id: 'js30-clock',
    title: 'CSS Analog Clock',
    subtitle: 'Transforms + time',
    summary: 'An analog clock driven by CSS transforms and JavaScript time.',
    overview:
      'An analog clock whose hands are rotated with CSS transforms updated each second from the current time — a small study in mapping data to visual rotation.',
    category: 'mini-js',
    tags: ['CSS', 'transforms', 'animation'],
    thumbnail: clock,
    year: 2020,
    stack: ['JavaScript', 'CSS'],
    highlights: ['Time-to-rotation mapping.', 'Pure CSS hand styling.'],
  },
]

export const getProjectsByCategory = (id: CategoryId) =>
  projects.filter((p) => p.category === id)

export const getProjectsBySection = (section: ProjectSection) =>
  projects.filter((p) => categorySection[p.category] === section)

export const getProjectById = (id: string) =>
  projects.find((p) => p.id === id)

export const getCategoryById = (id: CategoryId) =>
  categories.find((c) => c.id === id)

export const allTags = Array.from(
  new Set(projects.flatMap((p) => p.tags)),
).sort()
