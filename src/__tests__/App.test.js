import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

const clickIQCard = () => {
  const cards = screen.getAllByText('Start Test →');
  fireEvent.click(cards[0]);
};

beforeEach(() => {
  render(<App />);
});

describe('App - Navigation', () => {
  test('renders home page with title', () => {
    expect(screen.getByText('MindMetric')).toBeInTheDocument();
    expect(screen.getByText('Discover Your')).toBeInTheDocument();
    expect(screen.getByText('Potential')).toBeInTheDocument();
  });

  test('renders both test cards on home page', () => {
    expect(screen.getByText('IQ Test')).toBeInTheDocument();
    expect(screen.getByText('Personality Type Test')).toBeInTheDocument();
  });

  test('back button is not visible on home', () => {
    expect(screen.queryByText('← Back')).not.toBeInTheDocument();
  });

  test('nav title click stays on home', () => {
    fireEvent.click(screen.getByText('MindMetric'));
    expect(screen.getByText('Discover Your')).toBeInTheDocument();
  });

  test('renders test description with AI mention', () => {
    expect(screen.getAllByText(/AI-generated/).length).toBeGreaterThan(0);
  });
});

describe('App - Footer', () => {
  test('renders footer', () => {
    expect(screen.getByText(/AI-powered psychological assessments/)).toBeInTheDocument();
  });
});
