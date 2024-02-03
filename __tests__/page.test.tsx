import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

/**
 * @param {function} Component
 * @param {*} props
 * @returns {Promise<()=>JSX.Element>}
 */
async function resolvedComponent(Component: any, props: unknown) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

describe('Page', () => {
  it('renders a heading', async () => {
    const HomeResolved = await resolvedComponent(Home, {});
    render(<HomeResolved />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
