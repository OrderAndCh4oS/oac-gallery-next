import {useContext} from 'react';
import {TezosContext} from '../contexts/tezos-context';

const useTezos = () => useContext(TezosContext);

export default useTezos;
