import { useState, useCallback } from 'react';
import Home from './components/Home';
import IQTest from './components/IQTest';
import PersonalityTest from './components/PersonalityTest';
import IQResult from './components/IQResult';
import MBTIResult from './components/MBTIResult';
import QuestionLoader from './components/QuestionLoader';
import QuickQuiz from './components/QuickQuiz';
import QuizResults from './components/QuizResults';
import Logo from './components/Logo';
import { generateJSON } from './utils/ollama';
import { QUIZ_SYSTEM_PROMPT, buildQuizPrompt, QUIZ_CATEGORIES } from './utils/quizPrompts';
import { IQ_SYSTEM_PROMPT, IQ_USER_PROMPT, MBTI_SYSTEM_PROMPT, MBTI_USER_PROMPT, buildMessages } from './utils/prompts';
import { iqQuestions, mbtiQuestions } from './data';
import './App.css';

const VIEWS = {
  HOME: 'home',
  IQ_TEST: 'iq-test',
  PERSONALITY_TEST: 'personality-test',
  IQ_LOADING: 'iq-loading',
  PERSONALITY_LOADING: 'personality-loading',
  IQ_RESULT: 'iq-result',
  PERSONALITY_RESULT: 'personality-result',
  QUIZ_LOADING: 'quiz-loading',
  QUIZ_TEST: 'quiz-test',
  QUIZ_RESULT: 'quiz-result'
};

async function tryGenerate(fn, fallback) {
  try {
    const result = await fn();
    if (result && result.length > 0) return { questions: result, aiGenerated: true };
  } catch (e) {
    console.warn('MindMetric: AI generation failed:', e.message);
  }
  return { questions: fallback, aiGenerated: false };
}

const quizFallbacks = {
  logic: iqQuestions.filter(q => q.category === 'Logic'),
  math: iqQuestions.filter(q => q.category === 'Math'),
  science: iqQuestions.slice(0, 5),
  history: iqQuestions.slice(5, 10),
  random: iqQuestions
};

const App = () => {
  const [view, setView] = useState(VIEWS.HOME);
  const [answers, setAnswers] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [aiGenerated, setAiGenerated] = useState(null);
  const [quizCategory, setQuizCategory] = useState(null);
  const [quizData, setQuizData] = useState(null);

  const handleStartTest = useCallback(async (testType) => {
    setAnswers(null);
    setQuestions(null);

    if (testType === 'iq-test') {
      setView(VIEWS.IQ_LOADING);
      const { questions: qs, aiGenerated: gen } = await tryGenerate(
        () => generateJSON(buildMessages(IQ_SYSTEM_PROMPT, IQ_USER_PROMPT)).then(d => d.questions?.map((q, i) => ({ ...q, id: i + 1 }))),
        iqQuestions
      );
      setQuestions(qs);
      setAiGenerated(gen);
      setView(VIEWS.IQ_TEST);
    } else {
      setView(VIEWS.PERSONALITY_LOADING);
      const { questions: qs, aiGenerated: gen } = await tryGenerate(
        () => generateJSON(buildMessages(MBTI_SYSTEM_PROMPT, MBTI_USER_PROMPT)).then(d => d.questions?.map((q, i) => ({ ...q, id: i + 1 }))),
        mbtiQuestions
      );
      setQuestions(qs);
      setAiGenerated(gen);
      setView(VIEWS.PERSONALITY_TEST);
    }
  }, []);

  const handleStartQuiz = useCallback(async (category) => {
    setQuizCategory(category);
    setView(VIEWS.QUIZ_LOADING);
    const { questions: qs, aiGenerated: gen } = await tryGenerate(
      () => generateJSON([
        { role: 'system', content: QUIZ_SYSTEM_PROMPT },
        { role: 'user', content: buildQuizPrompt(category) }
      ]).then(d => d.questions?.map((q, i) => ({ ...q, id: i + 1 }))),
      quizFallbacks[category] || iqQuestions.slice(0, 8)
    );
    setQuestions(qs);
    setAiGenerated(gen);
    setView(VIEWS.QUIZ_TEST);
  }, []);

  const handleQuizComplete = useCallback((data) => {
    setQuizData(data);
    setView(VIEWS.QUIZ_RESULT);
  }, []);

  const handleIQComplete = useCallback((testAnswers) => {
    setAnswers(testAnswers);
    setView(VIEWS.IQ_RESULT);
  }, []);

  const handlePersonalityComplete = useCallback((testAnswers) => {
    setAnswers(testAnswers);
    setView(VIEWS.PERSONALITY_RESULT);
  }, []);

  const handleRestart = useCallback(() => {
    setAnswers(null);
    setQuestions(null);
    setAiGenerated(null);
    setQuizCategory(null);
    setQuizData(null);
    setView(VIEWS.HOME);
  }, []);

  const handleBack = useCallback(() => {
    if (view === VIEWS.QUIZ_RESULT || view === VIEWS.QUIZ_TEST) {
      setQuizCategory(null);
      setQuizData(null);
    }
    setView(VIEWS.HOME);
  }, [view]);

  const showFallbackNotice = view !== VIEWS.HOME && aiGenerated === false;

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-left">
          <h1 className="nav-title" onClick={handleRestart}>
            <Logo size={28} />
            MindMetric
          </h1>
        </div>
        <div className="nav-right">
          {view !== VIEWS.HOME && (
            <button onClick={handleBack} className="nav-back">
              ← Back
            </button>
          )}
        </div>
      </nav>

      <main className="main">
        {view === VIEWS.HOME && <Home onStart={handleStartTest} onStartQuiz={handleStartQuiz} aiAvailable={aiGenerated !== false} />}

        {showFallbackNotice && (
          <div className="fallback-notice">
            <span className="fallback-notice-icon">⚠</span>
            <span>AI generation unavailable — using curated questions. Make sure the proxy is running (<strong>node server.js</strong>) and your API key is valid.</span>
          </div>
        )}

        {view === VIEWS.IQ_LOADING && <QuestionLoader type="iq-test" />}
        {view === VIEWS.IQ_TEST && questions && (
          <IQTest questions={questions} onComplete={handleIQComplete} />
        )}

        {view === VIEWS.PERSONALITY_LOADING && <QuestionLoader type="personality-test" />}
        {view === VIEWS.PERSONALITY_TEST && questions && (
          <PersonalityTest questions={questions} onComplete={handlePersonalityComplete} />
        )}

        {view === VIEWS.IQ_RESULT && answers && (
          <IQResult answers={answers} questions={questions} onRestart={handleRestart} />
        )}

        {view === VIEWS.PERSONALITY_RESULT && answers && (
          <MBTIResult answers={answers} questions={questions} onRestart={handleRestart} />
        )}

        {view === VIEWS.QUIZ_LOADING && <QuestionLoader type="quiz" />}
        {view === VIEWS.QUIZ_TEST && questions && (
          <QuickQuiz questions={questions} category={quizCategory} onComplete={handleQuizComplete} onBack={handleBack} />
        )}
        {view === VIEWS.QUIZ_RESULT && quizData && (
          <QuizResults data={quizData} onRestart={() => handleStartQuiz(quizCategory)} onBack={handleBack} />
        )}
      </main>

      <footer className="footer">
        <p>MindMetric — AI-powered psychological assessments for personal growth.</p>
      </footer>
    </div>
  );
};

export default App;
