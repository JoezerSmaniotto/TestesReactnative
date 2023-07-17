import React from 'react';
import {render} from '@testing-library/react-native';
import {showMocks} from 'test/mocks/showMocks';
import {EpisodeList} from '../EpisodeList';
import {QueryClient, QueryClientProvider} from 'react-query';
import {showService} from 'src/services/show/showService';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
});
const wrapper = ({children}: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('EpisodeList', () => {
  test('show all season one episodes at first', async () => {
    jest.spyOn(showService, 'getEpisodes').mockRejectedValueOnce({
      seasonNames: ['1', '2'],
      seasons: {
        1: [showMocks.episode1, showMocks.episode2],
        2: [showMocks.episode22, showMocks.episode23],
      },
    });
    //render(<EpisodeList show={showMocks.show} />, {wrapper});
    //expect(true).toBeTruthy();
    const {getByText, findByText} = render(
      <EpisodeList show={showMocks.show} />,
      {wrapper},
    );

    await findByText(showMocks.episode1.name);

    expect(getByText(showMocks.episode1.name)).toBeTruthy();
    expect(getByText(showMocks.episode2.name)).toBeTruthy();
  });
});
