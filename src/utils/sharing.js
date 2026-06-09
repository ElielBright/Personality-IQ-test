async function shareResults(type, data) {
  let title, text;

  if (type === 'iq') {
    title = 'My MindMetric IQ Result';
    text = [
      `🧠 I scored ${data.score} (${data.interpretation.label}) on MindMetric's IQ assessment!`,
      `📊 Percentile: ${data.percentile}%`,
      `📈 Category: ${data.interpretation.label}`,
      ``,
      `Take the free test at: ${window.location.origin}`
    ].join('\n');
  } else if (type === 'personality') {
    const lines = Object.values(data).map((t) =>
      `${t.label}: ${t.level.charAt(0).toUpperCase() + t.level.slice(1)} (${t.percentage}%)`
    );
    title = 'My MindMetric Personality Profile';
    text = [
      `👤 My Big Five Personality Profile:`,
      ...lines,
      ``,
      `Discover your profile at: ${window.location.origin}`
    ].join('\n');
  }

  if (navigator.share) {
    try {
      await navigator.share({ title, text });
      return 'shared';
    } catch {
      return 'cancelled';
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return 'copied';
  } catch {
    return 'unsupported';
  }
}

export { shareResults };
