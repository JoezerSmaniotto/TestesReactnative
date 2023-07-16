/* eslint-disable jest/expect-expect */
import React, {createRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {act, fireEvent, render} from '@testing-library/react-native';

import {SeasonModal} from '../SeasonModal';

describe('SeasonModal', () => {
  test('show all season option', () => {
    // Preciso do useRef para ter referência ao component para simular
    // um clique, porém aqui não é um component para isso uso o createRef
    // nativo do JavaScript, agora aplica isso ao component com a ref modalizeRef
    const modalizeRef = createRef<Modalize>();

    const {getAllByText} = render(
      <SeasonModal
        ref={modalizeRef}
        onSelectSeason={season => console.log(season)}
        selectedSeason="1"
        seasons={['1', '2', '3']}
      />,
    );

    // Quando clicar no botão irá abrir o modal, causando um efeito de rerenderização(Side Effect).
    // Por isso temos que usar o act, para garantir que comportameno sejá de fato igual quando ele esta executando
    // Act recebe uma callback e coloco dentro o modalizeRef.current?.open();
    act(() => {
      modalizeRef.current?.open();
    });

    /*
    **getAllByText** com TextMatch, se rodar o **debug** extraindo do retorno
    do **render** vejo que realmente os dados Session estão sendo apresentados,
    porém Session1, Session2, Sessin3… porém aqui **tem um problema o Session
    pesquisa exatamento pelo test que coloquei** por este motivo não passou no test.

    Consigo resolver o problem acima  de duas formar passando um obj de opção
    informando que não precisa ser exato o valor { exact: false}

    expect(getAllByText('Season', {exact: true}).length).toBe(3);

    Outra forma de fazer isso é atraves

    getAllByText(/season/i)

    Desta forma feita com Regex ele irá pesquisar pela palavra session e não levará em
    consideração se o match se deu por palavra maiscula ou minuscula.
    */
    expect(getAllByText(/season/i).length).toBe(3); // Poderia sr toBe || toEquals
  });

  test('call onSelectSeason with correct season when season option was pressed', () => {
    const modalizeRef = createRef<Modalize>();

    /*
      Aqui estamos aplicando o conceito de mock, de simular algumas coisas no app.
      O Jest tem uma função bastante interessante que é fn que é uma função para criar
      uma função Mockada. que posso interragir, verificar ela depois.
    */
    const onSelectSeasonMock = jest.fn();

    const {getByText} = render(
      <SeasonModal
        ref={modalizeRef}
        onSelectSeason={onSelectSeasonMock}
        selectedSeason="1"
        seasons={['1', '2', '3']}
      />,
    );

    act(() => {
      modalizeRef.current?.open();
    });

    /*
    Tenho que selecionar um item que será clicado, no caso umas sessions
    uso o FiveEvent para disparar eventos usando o press(), se analisar o que ele espera
    receber vemos que é **element** do tipo **ReactTestInstance** notaremos que o
    **getAllByText** retorna exatamento isso, só que de um array, neste caso quero a
    penas um por isso irei usar o  getByText em ver do All.
    */
    const season2Element = getByText(/season 2/i);
    // Busca o elemento que passei "season2" e retorna o elemento

    fireEvent.press(season2Element);
    /*
     * Com fireEvent posso disparar eventos para o component, aqui posso Aqui aplico
     * o clique no elemento.
     *
     * A partir do momento que crie o Mock e passei para ele onSelectSeasonMock = jest.fn();
     * ele vai ficar monitorando  o que esta acontecendo com esta função onSelectSeasonMock
     * e irá registrar isso para que possamos apos a nossa interação possamos vertificar o
     * que aconteceu com ela, se é exatamento o queremos.
     *
     * No caso é se ela foi chamada com a temporada que selecionamos "2", e então estamos
     * verificando se tem o valor 2, Pq atraves do season2Element chamei a "season 2" a apliquei
     * a chamda com o fireEvent.press
     */
    expect(onSelectSeasonMock).toBeCalledWith('2');
  });
});
