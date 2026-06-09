import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../components/Home';
import IQTest from '../components/IQTest';
import PersonalityTest from '../components/PersonalityTest';
import QuizProgress from '../components/QuizProgress';
import ShareMenu from '../components/ShareMenu';
import QuestionLoader from '../components/QuestionLoader';
import IQResult from '../components/IQResult';
import MBTIResult from '../components/MBTIResult';
import { iqQuestions, mbtiQuestions } from '../data';

describe('QuizProgress', () => {
  test('renders correct progress info', () => {
    render(<QuizProgress current={5} total={15} />);
    expect(screen.getByText('5 of 15')).toBeInTheDocument();
  });

  test('renders 0 of 0 gracefully', () => {
    render(<QuizProgress current={0} total={0} />);
    expect(screen.getByText('0 of 0')).toBeInTheDocument();
  });
});

describe('Home', () => {
  const mockOnStart = jest.fn();

  beforeEach(() => {
    render(<Home onStart={mockOnStart} />);
  });

  test('renders both test cards', () => {
    expect(screen.getByText('IQ Test')).toBeInTheDocument();
    expect(screen.getByText('Personality Type Test')).toBeInTheDocument();
  });

  test('calls onStart when IQ card is clicked', () => {
    const buttons = screen.getAllByText('Start Test →');
    fireEvent.click(buttons[0]);
    expect(mockOnStart).toHaveBeenCalledWith('iq-test');
  });
});

describe('IQTest', () => {
  const mockOnComplete = jest.fn();

  test('renders with questions', () => {
    render(<IQTest questions={iqQuestions} onComplete={mockOnComplete} />);
    expect(screen.getByText('Cognitive Assessment')).toBeInTheDocument();
  });

  test('shows error with no questions', () => {
    render(<IQTest questions={[]} onComplete={mockOnComplete} />);
    expect(screen.getByText(/No questions available/)).toBeInTheDocument();
  });

  test('shows question count in progress', () => {
    render(<IQTest questions={iqQuestions} onComplete={mockOnComplete} />);
    expect(screen.getByText(`0 of ${iqQuestions.length}`)).toBeInTheDocument();
  });

  test('submit button shows remaining count when not all answered', () => {
    render(<IQTest questions={iqQuestions} onComplete={mockOnComplete} />);
    const btn = screen.getByRole('button', { name: new RegExp(`${iqQuestions.length} remaining`) });
    expect(btn).toBeDisabled();
  });
});

describe('PersonalityTest', () => {
  const mockOnComplete = jest.fn();

  test('renders with questions', () => {
    render(<PersonalityTest questions={mbtiQuestions} onComplete={mockOnComplete} />);
    expect(screen.getByText('Psychological Profile')).toBeInTheDocument();
    expect(screen.getByText(mbtiQuestions[0].trait)).toBeInTheDocument();
  });

  test('shows error with no questions', () => {
    render(<PersonalityTest questions={[]} onComplete={mockOnComplete} />);
    expect(screen.getByText(/No questions available/)).toBeInTheDocument();
  });

  test('shows progress', () => {
    render(<PersonalityTest questions={mbtiQuestions} onComplete={mockOnComplete} />);
    expect(screen.getByText(`0 of ${mbtiQuestions.length}`)).toBeInTheDocument();
  });

  test('clicking choice A advances', () => {
    jest.useFakeTimers();
    render(<PersonalityTest questions={mbtiQuestions} onComplete={mockOnComplete} />);
    act(() => {
      fireEvent.click(screen.getByText(mbtiQuestions[0].optionA));
      jest.runAllTimers();
    });
    expect(screen.getByText(mbtiQuestions[1].trait)).toBeInTheDocument();
  });
});

describe('QuestionLoader', () => {
  test('renders IQ loading state', () => {
    render(<QuestionLoader type="iq-test" />);
    expect(screen.getByText(/generating your personalized IQ/i)).toBeInTheDocument();
  });

  test('renders personality loading state', () => {
    render(<QuestionLoader type="personality-test" />);
    expect(screen.getByText(/crafting your personality/i)).toBeInTheDocument();
  });

  test('shows tips', () => {
    render(<QuestionLoader type="iq-test" />);
    expect(screen.getByText(/Logic, Math, Spatial/)).toBeInTheDocument();
  });
});

describe('IQResult', () => {
  const allCorrect = {};
  iqQuestions.forEach((q) => { allCorrect[q.id] = q.correct; });

  test('renders IQ score', () => {
    render(<IQResult answers={allCorrect} questions={iqQuestions} onRestart={() => {}} />);
    expect(screen.getByText('Your Cognitive Assessment')).toBeInTheDocument();
    expect(screen.getByText('IQ Score')).toBeInTheDocument();
  });

  test('renders domain breakdown', () => {
    render(<IQResult answers={allCorrect} questions={iqQuestions} onRestart={() => {}} />);
    expect(screen.getByText('Domain Breakdown')).toBeInTheDocument();
  });

  test('renders answer review', () => {
    render(<IQResult answers={allCorrect} questions={iqQuestions} onRestart={() => {}} />);
    expect(screen.getByText('Answer Review')).toBeInTheDocument();
  });

  test('renders restart button', () => {
    render(<IQResult answers={allCorrect} questions={iqQuestions} onRestart={() => {}} />);
    expect(screen.getByText('Take Test Again')).toBeInTheDocument();
  });
});

describe('MBTIResult', () => {
  const allA = {};
  mbtiQuestions.forEach((q) => { allA[q.id] = 0; });

  test('renders personality type', () => {
    render(<MBTIResult answers={allA} questions={mbtiQuestions} onRestart={() => {}} />);
    expect(screen.getByText('Your Personality Type')).toBeInTheDocument();
  });

  test('renders dimension scores', () => {
    render(<MBTIResult answers={allA} questions={mbtiQuestions} onRestart={() => {}} />);
    expect(screen.getByText('Dimension Scores')).toBeInTheDocument();
  });

  test('renders preferences', () => {
    render(<MBTIResult answers={allA} questions={mbtiQuestions} onRestart={() => {}} />);
    expect(screen.getByText('Your Preferences Explained')).toBeInTheDocument();
  });

  test('renders strengths and growth areas', () => {
    render(<MBTIResult answers={allA} questions={mbtiQuestions} onRestart={() => {}} />);
    expect(screen.getByText('✨ Strengths')).toBeInTheDocument();
    expect(screen.getByText('🌱 Growth Areas')).toBeInTheDocument();
  });
});

describe('ShareMenu', () => {
  test('renders share button', () => {
    render(<ShareMenu type="iq" data={{ score: 100 }} />);
    expect(screen.getByText('Share Results')).toBeInTheDocument();
  });
});
