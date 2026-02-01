import React from 'react';

type Step = { intro: string; element?: string; position?: string };

type Props = {
  steps: Step[];
  stepsName: string;
  stepsEnabled: boolean;
  onExit: () => void;
};

export default function IntroGuide({ steps, stepsEnabled }: Props) {
  if (!stepsEnabled || !steps?.length) return null;
  return (
    <div
      id='intro-guide-root'
      className='intro-guide-root'
      data-steps={JSON.stringify(steps)}
      aria-hidden
    />
  );
}
