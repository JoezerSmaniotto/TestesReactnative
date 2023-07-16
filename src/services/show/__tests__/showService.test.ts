import {showMocks} from 'test/mocks/showMocks';
import {showService} from '../showService';
import {api} from 'src/services/api';

describe('showService', () => {
  // Nome do 1º describe para nome do Serviço
  describe('getEpisodes', () => {
    // Nome da função que estou testando
    test('when API return episode list return all season names', async () => {
      // Chamo o serviço que quero testar, aqui showService.getEpisodes, passando o ID.
      const spyFn = jest
        .spyOn(api, 'get')
        .mockResolvedValue({data: showMocks.episodeList});
      /*
      -> USAMOS O mockResolvedValue em ver do mockImplementation
      USAMOS o spyOn para verificar uma função Interna, diferente do jest.fn(); que usamos para
      passar um função interna a um component.
      Dentro do spyOn, digo qual objeto quero monitorar, nesta caso é o API, e o Segundo
      parâmetro o método que estou utilizando
      A partir disso o spyOn retorna uma função, e passa a monitorar tudo que esta acontendo
      neste método, ele não vai deixar de chamar const groupedEpisodes = await showService.getEpisodes('25
      posso se quiser sobrescrever

      Minuto:15:30 sobrescrevendo a chamada a função com o mock no spyOn, assim substituindo
      o método original e retornando a função dentro do mockImplementation,

      mockResolvedValue minuto 24:00. aqui usamos o mockResolveValue, quando não nós importamos
      com a implementação, e sim com o RESULTADO, só queremos simular o retorno desta lista de episódios.
      mockResolveValuem assim não precisamos passar o ()=> Promise.resolve({data: showMocks.episodeList})
      Mas sim apenas o retorno que é o importante*/
      const groupedEpisodes = await showService.getEpisodes('250');

      /* o groupedEpisodes RETORNA o número das temporadas, dentro do seasonNames aqui verifico
      se tem os seguintes valores dentro deste retorno, O groupedEpisodes implementa por baixo dos panos
      o */
      expect(groupedEpisodes.seasonNames.includes('1')).toBeTruthy();
      expect(groupedEpisodes.seasonNames.includes('2')).toBeTruthy();

      /*Verifica se só tem 2 temporadas, que é mockamos*/
      expect(groupedEpisodes.seasonNames.length).toBe(2);

      //Monitora quantas vezes a função foi chamada
      expect(spyFn).toBeCalledTimes(1);
    });
    test('when API return episode list return the episodes grouped by season', async () => {
      jest.spyOn(api, 'get').mockResolvedValue({data: showMocks.episodeList});

      const groupedEpisodes = await showService.getEpisodes('250');
      // Chamo o serviço que quero testar, aqui showService.getEpisodes, passando o ID.

      const temp1 = groupedEpisodes.seasons[1];
      const temp2 = groupedEpisodes.seasons[2];

      expect(temp1[0]).toEqual(showMocks.episode1);
      expect(temp1[1]).toEqual(showMocks.episode2);

      expect(temp2[0]).toEqual(showMocks.episode22);
      expect(temp2[1]).toEqual(showMocks.episode23);
    });
  });
});
