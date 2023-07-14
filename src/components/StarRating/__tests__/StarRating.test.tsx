import React from 'react';
//import {render} from 'test-utils';
import {render} from '@testing-library/react-native';
import {StarRating} from '../StarRating';

describe('StarRating', () => {
  // describe Agrupa os testes do component relacioandos
  describe('rating was passed', () => {
    //No describe colocamos  a situação no nome
    it('show the average', () => {
      // No test ou no it colocamos como nome o que esperamos
      // Test ou it é o aplido
      const {getByText} = render(<StarRating rating={{average: 7}} />);
      //getByText pega elementos de texto.
      expect(getByText('7')).toBeTruthy();
      //expect usamos toda a ver que queremos testar um valor
      //toBeTruthyn Verifica se é o valor esta na tela
    });
    it('show the star icon', () => {
      const {getByTestId} = render(<StarRating rating={{average: 7}} />);
      //getByTestId  que não tem como pegar por texto, desta forma preciso adicionar no component
      // uma este propriedade e atribuir um valor que tenho que verifcar se existe
      expect(getByTestId('starIcon')).toBeTruthy();
    });
  });

  describe('rating was NOT passed', () => {
    it('return nothing', () => {
      //container é pai do component que estou renderizando
      const {container} = render(<StarRating />);

      //expect(container.children.length).toEqual([]);
      // No caso se não renderizar nada, não terá filhos, então terá um array vazio || O.
      expect(container.children.length).toEqual(0);
    });
  });
});
